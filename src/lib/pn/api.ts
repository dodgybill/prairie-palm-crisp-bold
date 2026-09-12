import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import {
  asProfile,
  bootstrapProfile,
  loadProfile,
  requireActive,
  requireCommand,
  requireProfile,
  requireStaff,
  uniqueUsername,
  withDb,
} from "./guard";
import { isStaff, rank } from "./roles";
import type {
  Application,
  CaseItem,
  CaseLogEntry,
  CaseStatus,
  ChatMessage,
  FeedItem,
  NewsItem,
  OpEvent,
  Profile,
  Role,
  Room,
} from "./types";

function iso(value: unknown): string {
  return String(value ?? "");
}

function asNews(row: Record<string, unknown>): NewsItem {
  return {
    id: Number(row.id),
    title: String(row.title),
    category: String(row.category),
    source: String(row.source),
    summary: String(row.summary),
    published_at: iso(row.published_at),
    author_id: row.author_id == null ? null : String(row.author_id),
  };
}

function asRoom(row: Record<string, unknown>): Room {
  return {
    id: Number(row.id),
    title: String(row.title),
    region: String(row.region ?? ""),
    created_at: iso(row.created_at),
  };
}

function asMessage(row: Record<string, unknown>): ChatMessage {
  return {
    id: Number(row.id),
    room_id: Number(row.room_id),
    user_id: String(row.user_id),
    username: String(row.username),
    content_enc: String(row.content_enc),
    created_at: iso(row.created_at),
  };
}

function asEvent(row: Record<string, unknown>): OpEvent {
  return {
    id: Number(row.id),
    event_date: iso(row.event_date),
    type: String(row.type),
    location: String(row.location),
    description: String(row.description),
    status: String(row.status),
    created_at: iso(row.created_at),
  };
}

function asFeed(row: Record<string, unknown>): FeedItem {
  return {
    id: Number(row.id),
    source: String(row.source),
    title: String(row.title),
    excerpt: String(row.excerpt),
    url: String(row.url),
    published_at: iso(row.published_at),
  };
}

function asCase(row: Record<string, unknown>): CaseItem {
  return {
    id: Number(row.id),
    title: String(row.title),
    details: String(row.details),
    contact: String(row.contact ?? ""),
    file_name: String(row.file_name ?? ""),
    file_data: row.file_data == null ? null : String(row.file_data),
    status: row.status as CaseStatus,
    assigned_to: row.assigned_to == null ? null : String(row.assigned_to),
    submitter_id: row.submitter_id == null ? null : String(row.submitter_id),
    created_at: iso(row.created_at),
  };
}

function asLog(row: Record<string, unknown>): CaseLogEntry {
  return {
    id: Number(row.id),
    case_id: Number(row.case_id),
    actor_id: String(row.actor_id),
    actor_name: String(row.actor_name),
    action: String(row.action),
    note: String(row.note ?? ""),
    created_at: iso(row.created_at),
  };
}

function asApplication(row: Record<string, unknown>): Application {
  return {
    id: Number(row.id),
    user_id: String(row.user_id),
    name: String(row.name),
    contact: String(row.contact),
    location: String(row.location),
    reason: String(row.reason),
    status: row.status as Application["status"],
    created_at: iso(row.created_at),
  };
}

const sessionHint = z.object({
  displayName: z.string().nullable(),
  email: z.string().nullable(),
});

export const getMyProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(sessionHint)
  .handler(async ({ context, data }) => {
    const sql = await withDb();
    const profile = await bootstrapProfile(
      sql,
      context.userId,
      data.displayName,
      data.email,
    );
    return profile;
  });

export const submitApplication = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      name: z.string().min(2).max(80),
      contact: z.string().min(3).max(120),
      location: z.string().min(2).max(80),
      reason: z.string().min(8).max(2000),
    }),
  )
  .handler(async ({ context, data }) => {
    const sql = await withDb();
    const existing = await loadProfile(sql, context.userId);
    if (existing && existing.status === "active") {
      throw new Error("Already a member");
    }
    const username = await uniqueUsername(sql, data.name);
    if (existing) {
      await sql`
        update profiles
        set display_name = ${data.name},
            username = ${existing.username},
            region = ${data.location},
            contact = ${data.contact},
            status = 'pending'
        where user_id = ${context.userId}
      `;
    } else {
      await sql`
        insert into profiles (user_id, username, display_name, role, status, region, contact)
        values (
          ${context.userId},
          ${username},
          ${data.name},
          'member',
          'pending',
          ${data.location},
          ${data.contact}
        )
      `;
    }
    await sql`
      insert into applications (user_id, name, contact, location, reason, status)
      values (${context.userId}, ${data.name}, ${data.contact}, ${data.location}, ${data.reason}, 'pending')
    `;
    return loadProfile(sql, context.userId);
  });

export const updateMyProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      display_name: z.string().min(2).max(80),
      bio: z.string().max(500),
      contact: z.string().max(120),
      region: z.string().max(80),
      social_x: z.string().max(80),
      social_telegram: z.string().max(80),
      avatar: z.string().max(400_000).nullable(),
    }),
  )
  .handler(async ({ context, data }) => {
    await requireActive(context.userId);
    const sql = await withDb();
    await sql`
      update profiles set
        display_name = ${data.display_name},
        bio = ${data.bio},
        contact = ${data.contact},
        region = ${data.region},
        social_x = ${data.social_x},
        social_telegram = ${data.social_telegram},
        avatar = ${data.avatar}
      where user_id = ${context.userId}
    `;
    return loadProfile(sql, context.userId);
  });

export const listMembers = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireActive(context.userId);
    const sql = await withDb();
    const rows = await sql<Record<string, unknown>>`
      select user_id, username, display_name, role, status, region, bio, contact,
             social_x, social_telegram, avatar, warnings, created_at::text as created_at
      from profiles
      where status in ('active', 'muted')
      order by display_name asc
    `;
    return rows.map(asProfile);
  });

export const listNews = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireActive(context.userId);
    const sql = await withDb();
    const rows = await sql<Record<string, unknown>>`
      select id, title, category, source, summary, published_at::text as published_at, author_id
      from news
      order by published_at desc
      limit 80
    `;
    return rows.map(asNews);
  });

export const addNews = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      title: z.string().min(4).max(200),
      category: z.string().min(2).max(40),
      source: z.string().min(2).max(80),
      summary: z.string().min(8).max(2000),
    }),
  )
  .handler(async ({ context, data }) => {
    await requireStaff(context.userId);
    const sql = await withDb();
    const rows = await sql<Record<string, unknown>>`
      insert into news (title, category, source, summary, author_id)
      values (${data.title}, ${data.category}, ${data.source}, ${data.summary}, ${context.userId})
      returning id, title, category, source, summary, published_at::text as published_at, author_id
    `;
    return asNews(rows[0]!);
  });

export const listRooms = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireActive(context.userId);
    const sql = await withDb();
    const rows = await sql<Record<string, unknown>>`
      select id, title, region, created_at::text as created_at from rooms order by id asc
    `;
    return rows.map(asRoom);
  });

export const listMessages = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ roomId: z.number() }))
  .handler(async ({ context, data }) => {
    await requireActive(context.userId);
    const sql = await withDb();
    const rows = await sql<Record<string, unknown>>`
      select id, room_id, user_id, username, content_enc, created_at::text as created_at
      from messages where room_id = ${data.roomId}
      order by created_at asc
      limit 200
    `;
    return rows.map(asMessage);
  });

export const sendMessage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      roomId: z.number(),
      contentEnc: z.string().min(1).max(8000),
    }),
  )
  .handler(async ({ context, data }) => {
    const profile = await requireProfile(context.userId);
    if (profile.status !== "active") throw new Error("Muted or inactive");
    const sql = await withDb();
    const rows = await sql<Record<string, unknown>>`
      insert into messages (room_id, user_id, username, content_enc)
      values (${data.roomId}, ${context.userId}, ${profile.username}, ${data.contentEnc})
      returning id, room_id, user_id, username, content_enc, created_at::text as created_at
    `;
    return asMessage(rows[0]!);
  });

export const createRoom = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      title: z.string().min(2).max(40),
      region: z.string().max(80).optional(),
    }),
  )
  .handler(async ({ context, data }) => {
    await requireStaff(context.userId);
    const sql = await withDb();
    const title = data.title.trim().toUpperCase();
    const rows = await sql<Record<string, unknown>>`
      insert into rooms (title, region)
      values (${title}, ${data.region ?? ""})
      returning id, title, region, created_at::text as created_at
    `;
    return asRoom(rows[0]!);
  });

export const renameRoom = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number(), title: z.string().min(2).max(40) }))
  .handler(async ({ context, data }) => {
    await requireStaff(context.userId);
    const sql = await withDb();
    await sql`update rooms set title = ${data.title.trim().toUpperCase()} where id = ${data.id}`;
    return { ok: true };
  });

export const deleteRoom = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ id: z.number() }))
  .handler(async ({ context, data }) => {
    await requireStaff(context.userId);
    const sql = await withDb();
    await sql`delete from rooms where id = ${data.id}`;
    return { ok: true };
  });

export const listEvents = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireActive(context.userId);
    const sql = await withDb();
    const rows = await sql<Record<string, unknown>>`
      select id, event_date::text as event_date, type, location, description, status,
             created_at::text as created_at
      from events
      order by event_date asc
    `;
    return rows.map(asEvent);
  });

export const addEvent = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      event_date: z.string().min(4),
      type: z.string().min(2).max(80),
      location: z.string().min(2).max(160),
      description: z.string().min(8).max(2000),
      status: z.string().min(2).max(40),
    }),
  )
  .handler(async ({ context, data }) => {
    await requireStaff(context.userId);
    const sql = await withDb();
    const rows = await sql<Record<string, unknown>>`
      insert into events (event_date, type, location, description, status)
      values (${data.event_date}::timestamptz, ${data.type}, ${data.location}, ${data.description}, ${data.status})
      returning id, event_date::text as event_date, type, location, description, status, created_at::text as created_at
    `;
    return asEvent(rows[0]!);
  });

export const listFeeds = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireActive(context.userId);
    const sql = await withDb();
    const rows = await sql<Record<string, unknown>>`
      select id, source, title, excerpt, url, published_at::text as published_at
      from feeds order by published_at desc limit 60
    `;
    return rows.map(asFeed);
  });

export const addFeed = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      source: z.string().min(2).max(40),
      title: z.string().min(4).max(200),
      excerpt: z.string().min(8).max(800),
      url: z.string().max(300),
    }),
  )
  .handler(async ({ context, data }) => {
    await requireStaff(context.userId);
    const sql = await withDb();
    const rows = await sql<Record<string, unknown>>`
      insert into feeds (source, title, excerpt, url)
      values (${data.source}, ${data.title}, ${data.excerpt}, ${data.url || "#"})
      returning id, source, title, excerpt, url, published_at::text as published_at
    `;
    return asFeed(rows[0]!);
  });

export const submitCase = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string().min(4).max(160),
      details: z.string().min(8).max(8000),
      contact: z.string().max(160),
      file_name: z.string().max(160),
      file_data: z.string().max(550_000).nullable(),
      submitter_id: z.string().max(80).nullable(),
    }),
  )
  .handler(async ({ data }) => {
    const sql = await withDb();
    const rows = await sql<{ id: number }>`
      insert into cases (title, details, contact, file_name, file_data, status, submitter_id)
      values (
        ${data.title},
        ${data.details},
        ${data.contact},
        ${data.file_name},
        ${data.file_data},
        'new',
        ${data.submitter_id}
      )
      returning id
    `;
    const id = rows[0]!.id;
    await sql`
      insert into case_log (case_id, actor_id, actor_name, action, note)
      values (${id}, ${data.submitter_id ?? "anonymous"}, 'source', 'submitted', 'Intake received. Source protection in force.')
    `;
    return { id };
  });

export const listCases = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireStaff(context.userId);
    const sql = await withDb();
    const rows = await sql<Record<string, unknown>>`
      select id, title, details, contact, file_name, file_data, status, assigned_to, submitter_id,
             created_at::text as created_at
      from cases
      order by created_at desc
    `;
    return rows.map(asCase);
  });

export const listCaseLog = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(z.object({ caseId: z.number() }))
  .handler(async ({ context, data }) => {
    await requireStaff(context.userId);
    const sql = await withDb();
    const rows = await sql<Record<string, unknown>>`
      select id, case_id, actor_id, actor_name, action, note, created_at::text as created_at
      from case_log where case_id = ${data.caseId}
      order by created_at asc
    `;
    return rows.map(asLog);
  });

export const updateCase = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      id: z.number(),
      status: z.enum(["new", "under_investigation", "assigned", "closed"]).optional(),
      assigned_to: z.string().nullable().optional(),
      note: z.string().max(2000).optional(),
    }),
  )
  .handler(async ({ context, data }) => {
    const staff = await requireStaff(context.userId);
    const sql = await withDb();
    const current = await sql<Record<string, unknown>>`
      select id, title, details, contact, file_name, file_data, status, assigned_to, submitter_id,
             created_at::text as created_at
      from cases where id = ${data.id} limit 1
    `;
    if (!current[0]) throw new Error("Case not found");
    const nextStatus = data.status ?? String(current[0].status);
    const nextAssigned =
      data.assigned_to === undefined
        ? (current[0].assigned_to as string | null)
        : data.assigned_to;
    await sql`
      update cases set status = ${nextStatus}, assigned_to = ${nextAssigned}
      where id = ${data.id}
    `;
    const bits: string[] = [];
    if (data.status && data.status !== current[0].status) {
      bits.push(`status → ${data.status}`);
    }
    if (data.assigned_to !== undefined) {
      bits.push(data.assigned_to ? `assigned → ${data.assigned_to}` : "unassigned");
    }
    const action = data.note
      ? "note"
      : data.status === "closed"
        ? "closed"
        : data.status === "under_investigation"
          ? "opened"
          : data.assigned_to
            ? "assigned"
            : "updated";
    await sql`
      insert into case_log (case_id, actor_id, actor_name, action, note)
      values (
        ${data.id},
        ${staff.user_id},
        ${staff.username},
        ${action},
        ${data.note || bits.join("; ") || "Updated"}
      )
    `;
    return { ok: true };
  });

export const listApplications = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireCommand(context.userId);
    const sql = await withDb();
    const rows = await sql<Record<string, unknown>>`
      select id, user_id, name, contact, location, reason, status, created_at::text as created_at
      from applications
      order by created_at desc
    `;
    return rows.map(asApplication);
  });

export const decideApplication = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      id: z.number(),
      status: z.enum(["approved", "rejected"]),
    }),
  )
  .handler(async ({ context, data }) => {
    await requireCommand(context.userId);
    const sql = await withDb();
    const rows = await sql<Record<string, unknown>>`
      select id, user_id, name, contact, location, reason, status, created_at::text as created_at
      from applications where id = ${data.id} limit 1
    `;
    const app = rows[0];
    if (!app) throw new Error("Not found");
    await sql`update applications set status = ${data.status} where id = ${data.id}`;
    const profileStatus = data.status === "approved" ? "active" : "rejected";
    await sql`
      update profiles set status = ${profileStatus}, region = ${String(app.location)}
      where user_id = ${String(app.user_id)}
    `;
    return { ok: true };
  });

export const commandUser = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(
    z.object({
      userId: z.string().min(1),
      action: z.enum(["role", "ban", "warn", "mute", "unmute"]),
      value: z.string().optional(),
    }),
  )
  .handler(async ({ context, data }) => {
    const actor = await requireCommand(context.userId);
    const sql = await withDb();
    const target = await loadProfile(sql, data.userId);
    if (!target) throw new Error("User not found");
    if (rank(target.role) >= rank(actor.role) && actor.role !== "owner") {
      throw new Error("Cannot act on equal or higher rank");
    }
    if (data.action === "role") {
      const next = data.value as Role;
      if (next === "owner" && actor.role !== "owner") {
        throw new Error("Only owner can assign owner");
      }
      await sql`update profiles set role = ${next} where user_id = ${data.userId}`;
    } else if (data.action === "ban") {
      const next = target.status === "banned" ? "active" : "banned";
      await sql`update profiles set status = ${next} where user_id = ${data.userId}`;
    } else if (data.action === "warn") {
      await sql`update profiles set warnings = warnings + 1 where user_id = ${data.userId}`;
    } else if (data.action === "mute") {
      await sql`update profiles set status = 'muted' where user_id = ${data.userId}`;
    } else if (data.action === "unmute") {
      await sql`update profiles set status = 'active' where user_id = ${data.userId}`;
    }
    return loadProfile(sql, data.userId);
  });

export const listAllProfiles = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    await requireCommand(context.userId);
    const sql = await withDb();
    const rows = await sql<Record<string, unknown>>`
      select user_id, username, display_name, role, status, region, bio, contact,
             social_x, social_telegram, avatar, warnings, created_at::text as created_at
      from profiles
      order by created_at asc
    `;
    return rows.map(asProfile);
  });

export const networkStats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const profile = await requireActive(context.userId);
    const sql = await withDb();
    const members = await sql<{ n: number }>`select count(*)::int as n from profiles where status in ('active','muted')`;
    const rooms = await sql<{ n: number }>`select count(*)::int as n from rooms`;
    const intel = await sql<{ n: number }>`select count(*)::int as n from cases where status = 'new'`;
    return {
      members: members[0]?.n ?? 0,
      rooms: rooms[0]?.n ?? 0,
      intelNew: isStaff(profile.role) ? (intel[0]?.n ?? 0) : 0,
    };
  });
