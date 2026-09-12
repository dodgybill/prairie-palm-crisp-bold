import { getSql, type Sql } from "@/lib/db";
import { seedIfNeeded } from "./seed";
import { isCommand, isStaff, slugify } from "./roles";
import type { Profile, Role } from "./types";

export async function withDb(): Promise<Sql> {
  const sql = await getSql();
  await seedIfNeeded(sql);
  return sql;
}

function asProfile(row: Record<string, unknown>): Profile {
  return {
    user_id: String(row.user_id),
    username: String(row.username),
    display_name: String(row.display_name),
    role: row.role as Role,
    status: row.status as Profile["status"],
    region: String(row.region ?? ""),
    bio: String(row.bio ?? ""),
    contact: String(row.contact ?? ""),
    social_x: String(row.social_x ?? ""),
    social_telegram: String(row.social_telegram ?? ""),
    avatar: row.avatar == null ? null : String(row.avatar),
    warnings: Number(row.warnings ?? 0),
    created_at: String(row.created_at),
  };
}

export async function loadProfile(
  sql: Sql,
  userId: string,
): Promise<Profile | null> {
  const rows = await sql<Record<string, unknown>>`
    select user_id, username, display_name, role, status, region, bio, contact,
           social_x, social_telegram, avatar, warnings, created_at::text as created_at
    from profiles where user_id = ${userId} limit 1
  `;
  return rows[0] ? asProfile(rows[0]) : null;
}

async function uniqueUsername(sql: Sql, base: string): Promise<string> {
  let name = slugify(base);
  for (let i = 0; i < 20; i++) {
    const hit = await sql<{ n: number }>`
      select count(*)::int as n from profiles where username = ${name}
    `;
    if ((hit[0]?.n ?? 0) === 0) return name;
    name = `${slugify(base)}_${i + 2}`.slice(0, 28);
  }
  return `${slugify(base)}_${Date.now().toString(36).slice(-4)}`;
}

export async function bootstrapProfile(
  sql: Sql,
  userId: string,
  displayName: string | null,
  email: string | null,
): Promise<Profile | null> {
  const existing = await loadProfile(sql, userId);
  if (existing) return existing;

  const count = await sql<{ n: number }>`select count(*)::int as n from profiles`;
  const isFirst = (count[0]?.n ?? 0) === 0;
  if (!isFirst) return null;

  const username = await uniqueUsername(
    sql,
    displayName || email?.split("@")[0] || "owner",
  );
  await sql`
    insert into profiles (user_id, username, display_name, role, status, region)
    values (
      ${userId},
      ${username},
      ${displayName || "Network owner"},
      'owner',
      'active',
      ''
    )
  `;
  return loadProfile(sql, userId);
}

export async function requireProfile(userId: string): Promise<Profile> {
  const sql = await withDb();
  const profile = await loadProfile(sql, userId);
  if (!profile) throw new Error("No profile");
  return profile;
}

export async function requireActive(userId: string): Promise<Profile> {
  const profile = await requireProfile(userId);
  if (profile.status !== "active" && profile.status !== "muted") {
    throw new Error("Forbidden");
  }
  return profile;
}

export async function requireStaff(userId: string): Promise<Profile> {
  const profile = await requireActive(userId);
  if (!isStaff(profile.role)) throw new Error("Forbidden");
  return profile;
}

export async function requireCommand(userId: string): Promise<Profile> {
  const profile = await requireActive(userId);
  if (!isCommand(profile.role)) throw new Error("Forbidden");
  return profile;
}

export { asProfile, uniqueUsername };
