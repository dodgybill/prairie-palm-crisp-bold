import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-BNKRwXAf.mjs";
import { c as rank, i as authMiddleware, o as isCommand, s as isStaff, t as REGION_ROOMS, u as slugify } from "./roles-T-y9R6hd.mjs";
import { cn as _enum, gn as object, hn as number, yn as string } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-VdfeU6Gh.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
async function seedIfNeeded(sql) {
	if (((await sql`select count(*)::int as n from news`)[0]?.n ?? 0) > 0) return;
	await sql`
    insert into news (title, category, source, summary, published_at) values
    (
      'Channel crossings — weekend total 312 across 6 vessels',
      'Crossings',
      'Home Office',
      'Official weekend release: 312 arrivals in 6 small boats. French authorities intercepted 3 vessels. Figures taken from the Home Office daily statistical notice; not seasonally adjusted.',
      now() - interval '5 hours'
    ),
    (
      'FOI: 14 councils spent over £8m on hotel contracts in Q1',
      'Accommodation',
      'FOI / local authorities',
      'Compiled FOI returns show fourteen English local authorities spent a combined £8.1m on contracted hotel rooms in Q1. Highest spenders: Kent, Essex, Lincolnshire. Independent verification against published budgets recommended.',
      now() - interval '11 hours'
    ),
    (
      'ONS: net migration 685,000 in year to December',
      'Statistics',
      'ONS',
      'Office for National Statistics long-term international migration estimate: +685,000. Humanitarian routes and work visas remain the largest inflows. Asylum grants were 68% of Q1 initial decisions per Home Office tables.',
      now() - interval '18 hours'
    ),
    (
      'Wethersfield — variation of conditions lodged on planning portal',
      'Accommodation',
      'Planning portal',
      'A variation of conditions has been submitted for the former RAF Wethersfield site. Public footpath around the perimeter remains open. No decision notice at time of writing.',
      now() - interval '26 hours'
    ),
    (
      'Police.uk extract: incidents within 1 mile of three contracted hotels',
      'Crime',
      'Police.uk',
      'Rolling 90-day open-data extract for three postcodes matching contracted hotels. Category mix is predominantly anti-social behaviour and public order. This is recorded crime, not charged crime. Cross-check against force dashboards before citing.',
      now() - interval '32 hours'
    ),
    (
      'Asylum decision backlog: 89,000 cases awaiting initial decision',
      'Government',
      'Home Office',
      'Latest transparency data: 89,000 cases in the initial-decision queue. Mean wait 61 weeks. The National Audit Office previously flagged cost overruns on accommodation contracts tied to the backlog.',
      now() - interval '40 hours'
    ),
    (
      'Birmingham — police-facilitated counter-demonstration registered',
      'Extremism',
      'West Midlands Police',
      'A counter-demonstration has been registered against a booked speakers event. S14 conditions are expected. Lawful observation only; do not enter private venues. Confirm the force statement before travel.',
      now() - interval '48 hours'
    ),
    (
      'Scampton parish council — public gallery for site handover',
      'Accommodation',
      'Parish council',
      'RAF Scampton handover remains on the parish agenda. Public gallery. Documents on the council site suggest a Q3 window; MOD statement still pending.',
      now() - interval '56 hours'
    ),
    (
      'NAO: asylum accommodation contracts flagged for cost overrun',
      'Government',
      'National Audit Office',
      'Value-for-money briefing notes material cost variance on hotel and large-site contracts. Full report on NAO publications. Treat contractor names as unconfirmed until the published PDF is checked.',
      now() - interval '70 hours'
    ),
    (
      'Dover — RNLI callouts logged against weekend Channel attempts',
      'Crossings',
      'MCA / RNLI',
      'Maritime and Coastguard Agency logs show multiple RNLI launches over the weekend window. Vessel counts should be reconciled to the Home Office statistical notice, not social media tallies.',
      now() - interval '84 hours'
    )
  `;
	for (const room of REGION_ROOMS) await sql`insert into rooms (title, region) values (${room.title}, ${room.region})`;
	const general = await sql`select id from rooms where title = 'GENERAL' limit 1`;
	const se = await sql`select id from rooms where title = 'SOUTH EAST' limit 1`;
	const gId = general[0]?.id ?? 1;
	await sql`
    insert into messages (room_id, user_id, username, content_enc, created_at) values
    (${gId}, 'system', 'net_ops', 'Channel is live. Factual, source-attributed posts only. UK law applies in this room.', now() - interval '6 hours'),
    (${gId}, 'system', 'south_desk', 'Reminder: public assembly is subject to S12/S14 conditions. Document, do not disrupt.', now() - interval '4 hours'),
    (${se[0]?.id ?? gId}, 'system', 'essex_observer', 'Essex — no activity reported today. Wethersfield planning portal is being watched.', now() - interval '2 hours')
  `;
	await sql`
    insert into events (event_date, type, location, description, status) values
    (
      now() + interval '4 days',
      'Community meeting',
      'Rotherham — Town Hall annex',
      'Public meeting on local accommodation use. Council Q&A. Peaceful attendance only. Check the council site for conditions.',
      'confirmed'
    ),
    (
      now() + interval '26 days',
      'Lawful protest',
      'Dover — seafront (TBC)',
      'Planned lawful protest. Police liaison confirmed. Remain inside the designated area. No face coverings where S14 prohibits them.',
      'reported'
    ),
    (
      now() + interval '50 days',
      'Counter SUTR',
      'London — Whitehall',
      'Counter demonstration opposite a SUTR march. Police facilitation expected. Maintain distance. No engagement.',
      'confirmed'
    ),
    (
      now() + interval '78 days',
      'Counter Islamist extremism',
      'Birmingham — city centre',
      'Response to a booked extremist speakers event. Lawful observation. Do not enter the private venue.',
      'monitoring'
    ),
    (
      now() + interval '120 days',
      'Community meeting',
      'Scampton — village hall',
      'RAF Scampton closure discussion. Parish council. Public gallery.',
      'confirmed'
    ),
    (
      now() - interval '10 days',
      'Community meeting',
      'Essex — closed',
      'Past event retained for audit only. Filtered from the live board.',
      'closed'
    )
  `;
	await sql`
    insert into feeds (source, title, excerpt, url, published_at) values
    (
      'Urban Scoop',
      'Urban Scoop: FOI reveals hotel costs by region',
      'Analysis of FOI data shows regional variation in accommodation contracting. Full breakdown requires ONS cross-reference.',
      '#',
      now() - interval '6 hours'
    ),
    (
      'Urban Scoop',
      'Urban Scoop: crossing data — weekend summary',
      'Weekend total 312 across 6 vessels. French interceptions: 3 vessels. Drawn from official releases, not eyewitness tallies.',
      '#',
      now() - interval '22 hours'
    ),
    (
      'Urban Scoop',
      'Urban Scoop: council tax impact analysis',
      'Local authority spending review identifies accommodation pressure in 12 districts. Source: published council budgets.',
      '#',
      now() - interval '3 days'
    ),
    (
      'UTK',
      'UTK: independent report on Wethersfield site conditions',
      'Footage and notes from the public footpath on the perimeter. Planning conditions reviewed against the portal.',
      '#',
      now() - interval '14 hours'
    ),
    (
      'UTK',
      'UTK: Scampton handover timeline',
      'Documents suggest a Q3 handover. MOD statement still pending confirmation.',
      '#',
      now() - interval '4 days'
    ),
    (
      'Independent',
      'Home Office stats — Q1 asylum decisions',
      'Q1: 12,400 decisions, 68% grant rate. Appeal-rate tables still pending.',
      '#',
      now() - interval '35 hours'
    )
  `;
	await sql`
    insert into cases (title, details, contact, file_name, status, created_at) values
    (
      'Hotel contract — staff accommodation block',
      'Source at a former hotel near Ashford reports the staff block is still in overflow use. Has delivery-log photos. Wants to remain anonymous. Contact via Proton only.',
      'ashford.source@proton.me',
      'delivery-log.jpg',
      'new',
      now() - interval '3 hours'
    ),
    (
      'RAF base — security contractor note',
      'Contractor states perimeter patrols reduced at Wethersfield. No internal documents. Concerned about public safety on the footpath.',
      '',
      '',
      'under_investigation',
      now() - interval '18 hours'
    )
  `;
	const c1 = await sql`select id from cases order by id asc limit 1`;
	if (c1[0]) await sql`
      insert into case_log (case_id, actor_id, actor_name, action, note, created_at) values
      (${c1[0].id}, 'system', 'intake', 'submitted', 'Anonymous intake received.', now() - interval '3 hours')
    `;
}
async function withDb() {
	const sql = await getSql();
	await seedIfNeeded(sql);
	return sql;
}
function asProfile(row) {
	return {
		user_id: String(row.user_id),
		username: String(row.username),
		display_name: String(row.display_name),
		role: row.role,
		status: row.status,
		region: String(row.region ?? ""),
		bio: String(row.bio ?? ""),
		contact: String(row.contact ?? ""),
		social_x: String(row.social_x ?? ""),
		social_telegram: String(row.social_telegram ?? ""),
		avatar: row.avatar == null ? null : String(row.avatar),
		warnings: Number(row.warnings ?? 0),
		created_at: String(row.created_at)
	};
}
async function loadProfile(sql, userId) {
	const rows = await sql`
    select user_id, username, display_name, role, status, region, bio, contact,
           social_x, social_telegram, avatar, warnings, created_at::text as created_at
    from profiles where user_id = ${userId} limit 1
  `;
	return rows[0] ? asProfile(rows[0]) : null;
}
async function uniqueUsername(sql, base) {
	let name = slugify(base);
	for (let i = 0; i < 20; i++) {
		if (((await sql`
      select count(*)::int as n from profiles where username = ${name}
    `)[0]?.n ?? 0) === 0) return name;
		name = `${slugify(base)}_${i + 2}`.slice(0, 28);
	}
	return `${slugify(base)}_${Date.now().toString(36).slice(-4)}`;
}
async function bootstrapProfile(sql, userId, displayName, email) {
	const existing = await loadProfile(sql, userId);
	if (existing) return existing;
	if (!(((await sql`select count(*)::int as n from profiles`)[0]?.n ?? 0) === 0)) return null;
	await sql`
    insert into profiles (user_id, username, display_name, role, status, region)
    values (
      ${userId},
      ${await uniqueUsername(sql, displayName || email?.split("@")[0] || "owner")},
      ${displayName || "Network owner"},
      'owner',
      'active',
      ''
    )
  `;
	return loadProfile(sql, userId);
}
async function requireProfile(userId) {
	const profile = await loadProfile(await withDb(), userId);
	if (!profile) throw new Error("No profile");
	return profile;
}
async function requireActive(userId) {
	const profile = await requireProfile(userId);
	if (profile.status !== "active" && profile.status !== "muted") throw new Error("Forbidden");
	return profile;
}
async function requireStaff(userId) {
	const profile = await requireActive(userId);
	if (!isStaff(profile.role)) throw new Error("Forbidden");
	return profile;
}
async function requireCommand(userId) {
	const profile = await requireActive(userId);
	if (!isCommand(profile.role)) throw new Error("Forbidden");
	return profile;
}
function iso(value) {
	return String(value ?? "");
}
function asNews(row) {
	return {
		id: Number(row.id),
		title: String(row.title),
		category: String(row.category),
		source: String(row.source),
		summary: String(row.summary),
		published_at: iso(row.published_at),
		author_id: row.author_id == null ? null : String(row.author_id)
	};
}
function asRoom(row) {
	return {
		id: Number(row.id),
		title: String(row.title),
		region: String(row.region ?? ""),
		created_at: iso(row.created_at)
	};
}
function asMessage(row) {
	return {
		id: Number(row.id),
		room_id: Number(row.room_id),
		user_id: String(row.user_id),
		username: String(row.username),
		content_enc: String(row.content_enc),
		created_at: iso(row.created_at)
	};
}
function asEvent(row) {
	return {
		id: Number(row.id),
		event_date: iso(row.event_date),
		type: String(row.type),
		location: String(row.location),
		description: String(row.description),
		status: String(row.status),
		created_at: iso(row.created_at)
	};
}
function asFeed(row) {
	return {
		id: Number(row.id),
		source: String(row.source),
		title: String(row.title),
		excerpt: String(row.excerpt),
		url: String(row.url),
		published_at: iso(row.published_at)
	};
}
function asCase(row) {
	return {
		id: Number(row.id),
		title: String(row.title),
		details: String(row.details),
		contact: String(row.contact ?? ""),
		file_name: String(row.file_name ?? ""),
		file_data: row.file_data == null ? null : String(row.file_data),
		status: row.status,
		assigned_to: row.assigned_to == null ? null : String(row.assigned_to),
		submitter_id: row.submitter_id == null ? null : String(row.submitter_id),
		created_at: iso(row.created_at)
	};
}
function asLog(row) {
	return {
		id: Number(row.id),
		case_id: Number(row.case_id),
		actor_id: String(row.actor_id),
		actor_name: String(row.actor_name),
		action: String(row.action),
		note: String(row.note ?? ""),
		created_at: iso(row.created_at)
	};
}
function asApplication(row) {
	return {
		id: Number(row.id),
		user_id: String(row.user_id),
		name: String(row.name),
		contact: String(row.contact),
		location: String(row.location),
		reason: String(row.reason),
		status: row.status,
		created_at: iso(row.created_at)
	};
}
var sessionHint = object({
	displayName: string().nullable(),
	email: string().nullable()
});
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "3c24a69be45f73ae76556528cc55f0fb4e16499dd4a27a1fcabc23e85c7daf10",
	name: "getMyProfile",
	filename: "src/lib/pn/api.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(sessionHint).handler(getMyProfile_createServerFn_handler, async ({ context, data }) => {
	return await bootstrapProfile(await withDb(), context.userId, data.displayName, data.email);
});
var submitApplication_createServerFn_handler = createServerRpc({
	id: "aa37995836350dc3c91ab5d93e5a5ed7127d2b344f5b5a31e253236788d98c54",
	name: "submitApplication",
	filename: "src/lib/pn/api.ts"
}, (opts) => submitApplication.__executeServer(opts));
var submitApplication = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	name: string().min(2).max(80),
	contact: string().min(3).max(120),
	location: string().min(2).max(80),
	reason: string().min(8).max(2e3)
})).handler(submitApplication_createServerFn_handler, async ({ context, data }) => {
	const sql = await withDb();
	const existing = await loadProfile(sql, context.userId);
	if (existing && existing.status === "active") throw new Error("Already a member");
	const username = await uniqueUsername(sql, data.name);
	if (existing) await sql`
        update profiles
        set display_name = ${data.name},
            username = ${existing.username},
            region = ${data.location},
            contact = ${data.contact},
            status = 'pending'
        where user_id = ${context.userId}
      `;
	else await sql`
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
	await sql`
      insert into applications (user_id, name, contact, location, reason, status)
      values (${context.userId}, ${data.name}, ${data.contact}, ${data.location}, ${data.reason}, 'pending')
    `;
	return loadProfile(sql, context.userId);
});
var updateMyProfile_createServerFn_handler = createServerRpc({
	id: "5a5420b5d4c28025566d5de23f53302cfb942a3eaa35c4816aecb8ad9a89d551",
	name: "updateMyProfile",
	filename: "src/lib/pn/api.ts"
}, (opts) => updateMyProfile.__executeServer(opts));
var updateMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	display_name: string().min(2).max(80),
	bio: string().max(500),
	contact: string().max(120),
	region: string().max(80),
	social_x: string().max(80),
	social_telegram: string().max(80),
	avatar: string().max(4e5).nullable()
})).handler(updateMyProfile_createServerFn_handler, async ({ context, data }) => {
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
var listMembers_createServerFn_handler = createServerRpc({
	id: "4851c62a737e250b024abaaa49f0ec838cd55325687ed99463b6494566aa0217",
	name: "listMembers",
	filename: "src/lib/pn/api.ts"
}, (opts) => listMembers.__executeServer(opts));
var listMembers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMembers_createServerFn_handler, async ({ context }) => {
	await requireActive(context.userId);
	return (await (await withDb())`
      select user_id, username, display_name, role, status, region, bio, contact,
             social_x, social_telegram, avatar, warnings, created_at::text as created_at
      from profiles
      where status in ('active', 'muted')
      order by display_name asc
    `).map(asProfile);
});
var listNews_createServerFn_handler = createServerRpc({
	id: "fe2d9add69a0f66bb8ad790b4436a7019245bed11c2c8a828151a20838aa05e2",
	name: "listNews",
	filename: "src/lib/pn/api.ts"
}, (opts) => listNews.__executeServer(opts));
var listNews = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listNews_createServerFn_handler, async ({ context }) => {
	await requireActive(context.userId);
	return (await (await withDb())`
      select id, title, category, source, summary, published_at::text as published_at, author_id
      from news
      order by published_at desc
      limit 80
    `).map(asNews);
});
var addNews_createServerFn_handler = createServerRpc({
	id: "428ff66c036c7e59f3a630a266d8189aa060b669af91a0e76828f21d4259e859",
	name: "addNews",
	filename: "src/lib/pn/api.ts"
}, (opts) => addNews.__executeServer(opts));
var addNews = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	title: string().min(4).max(200),
	category: string().min(2).max(40),
	source: string().min(2).max(80),
	summary: string().min(8).max(2e3)
})).handler(addNews_createServerFn_handler, async ({ context, data }) => {
	await requireStaff(context.userId);
	return asNews((await (await withDb())`
      insert into news (title, category, source, summary, author_id)
      values (${data.title}, ${data.category}, ${data.source}, ${data.summary}, ${context.userId})
      returning id, title, category, source, summary, published_at::text as published_at, author_id
    `)[0]);
});
var listRooms_createServerFn_handler = createServerRpc({
	id: "f40766ef23076d0211a834e3f873bfcf7128ad4f442aa666eb41b2eae9296928",
	name: "listRooms",
	filename: "src/lib/pn/api.ts"
}, (opts) => listRooms.__executeServer(opts));
var listRooms = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listRooms_createServerFn_handler, async ({ context }) => {
	await requireActive(context.userId);
	return (await (await withDb())`
      select id, title, region, created_at::text as created_at from rooms order by id asc
    `).map(asRoom);
});
var listMessages_createServerFn_handler = createServerRpc({
	id: "d792ced97bccd5cd9e8727647b3d9390ad9accf77bdce5530d517bf1964004d8",
	name: "listMessages",
	filename: "src/lib/pn/api.ts"
}, (opts) => listMessages.__executeServer(opts));
var listMessages = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ roomId: number() })).handler(listMessages_createServerFn_handler, async ({ context, data }) => {
	await requireActive(context.userId);
	return (await (await withDb())`
      select id, room_id, user_id, username, content_enc, created_at::text as created_at
      from messages where room_id = ${data.roomId}
      order by created_at asc
      limit 200
    `).map(asMessage);
});
var sendMessage_createServerFn_handler = createServerRpc({
	id: "8593ffbb16c6c08f2271f8a46d7a4f6c4c7e233b113a26243254f1726d15c467",
	name: "sendMessage",
	filename: "src/lib/pn/api.ts"
}, (opts) => sendMessage.__executeServer(opts));
var sendMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	roomId: number(),
	contentEnc: string().min(1).max(8e3)
})).handler(sendMessage_createServerFn_handler, async ({ context, data }) => {
	const profile = await requireProfile(context.userId);
	if (profile.status !== "active") throw new Error("Muted or inactive");
	return asMessage((await (await withDb())`
      insert into messages (room_id, user_id, username, content_enc)
      values (${data.roomId}, ${context.userId}, ${profile.username}, ${data.contentEnc})
      returning id, room_id, user_id, username, content_enc, created_at::text as created_at
    `)[0]);
});
var createRoom_createServerFn_handler = createServerRpc({
	id: "d9ea632e7f0081a61cd2920d6fca449993d4b29a287167103ce55bb7689e6bcc",
	name: "createRoom",
	filename: "src/lib/pn/api.ts"
}, (opts) => createRoom.__executeServer(opts));
var createRoom = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	title: string().min(2).max(40),
	region: string().max(80).optional()
})).handler(createRoom_createServerFn_handler, async ({ context, data }) => {
	await requireStaff(context.userId);
	return asRoom((await (await withDb())`
      insert into rooms (title, region)
      values (${data.title.trim().toUpperCase()}, ${data.region ?? ""})
      returning id, title, region, created_at::text as created_at
    `)[0]);
});
var renameRoom_createServerFn_handler = createServerRpc({
	id: "3fb43b7fc1badc468ffcd215ce4abc75f998af3ac351c89657ef3ce0057e0b17",
	name: "renameRoom",
	filename: "src/lib/pn/api.ts"
}, (opts) => renameRoom.__executeServer(opts));
var renameRoom = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number(),
	title: string().min(2).max(40)
})).handler(renameRoom_createServerFn_handler, async ({ context, data }) => {
	await requireStaff(context.userId);
	await (await withDb())`update rooms set title = ${data.title.trim().toUpperCase()} where id = ${data.id}`;
	return { ok: true };
});
var deleteRoom_createServerFn_handler = createServerRpc({
	id: "35939b020f47653092ba4d05414d3e5c235c5e40297f6c9b86f34d4c87a7a7eb",
	name: "deleteRoom",
	filename: "src/lib/pn/api.ts"
}, (opts) => deleteRoom.__executeServer(opts));
var deleteRoom = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number() })).handler(deleteRoom_createServerFn_handler, async ({ context, data }) => {
	await requireStaff(context.userId);
	await (await withDb())`delete from rooms where id = ${data.id}`;
	return { ok: true };
});
var listEvents_createServerFn_handler = createServerRpc({
	id: "d2114c416d394d461c73cddcdcc26602bc42488f28df6b140d2b5f7ebee9a380",
	name: "listEvents",
	filename: "src/lib/pn/api.ts"
}, (opts) => listEvents.__executeServer(opts));
var listEvents = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listEvents_createServerFn_handler, async ({ context }) => {
	await requireActive(context.userId);
	return (await (await withDb())`
      select id, event_date::text as event_date, type, location, description, status,
             created_at::text as created_at
      from events
      order by event_date asc
    `).map(asEvent);
});
var addEvent_createServerFn_handler = createServerRpc({
	id: "b3e93c2abeb9ed730b57c352bb0bde29431290bd4d1a23671b617cb0d418648d",
	name: "addEvent",
	filename: "src/lib/pn/api.ts"
}, (opts) => addEvent.__executeServer(opts));
var addEvent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	event_date: string().min(4),
	type: string().min(2).max(80),
	location: string().min(2).max(160),
	description: string().min(8).max(2e3),
	status: string().min(2).max(40)
})).handler(addEvent_createServerFn_handler, async ({ context, data }) => {
	await requireStaff(context.userId);
	return asEvent((await (await withDb())`
      insert into events (event_date, type, location, description, status)
      values (${data.event_date}::timestamptz, ${data.type}, ${data.location}, ${data.description}, ${data.status})
      returning id, event_date::text as event_date, type, location, description, status, created_at::text as created_at
    `)[0]);
});
var listFeeds_createServerFn_handler = createServerRpc({
	id: "760c5f33b397ef8539db3ae4f73c684e96eaef68625ca11dc63e19e31fbc7835",
	name: "listFeeds",
	filename: "src/lib/pn/api.ts"
}, (opts) => listFeeds.__executeServer(opts));
var listFeeds = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listFeeds_createServerFn_handler, async ({ context }) => {
	await requireActive(context.userId);
	return (await (await withDb())`
      select id, source, title, excerpt, url, published_at::text as published_at
      from feeds order by published_at desc limit 60
    `).map(asFeed);
});
var addFeed_createServerFn_handler = createServerRpc({
	id: "c82f19a198e80571c6b554290d1f6939cbfcd5e60f4c05500bc1165aa02b469c",
	name: "addFeed",
	filename: "src/lib/pn/api.ts"
}, (opts) => addFeed.__executeServer(opts));
var addFeed = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	source: string().min(2).max(40),
	title: string().min(4).max(200),
	excerpt: string().min(8).max(800),
	url: string().max(300)
})).handler(addFeed_createServerFn_handler, async ({ context, data }) => {
	await requireStaff(context.userId);
	return asFeed((await (await withDb())`
      insert into feeds (source, title, excerpt, url)
      values (${data.source}, ${data.title}, ${data.excerpt}, ${data.url || "#"})
      returning id, source, title, excerpt, url, published_at::text as published_at
    `)[0]);
});
var submitCase_createServerFn_handler = createServerRpc({
	id: "969801249098ae3be4260d2d9ba94d2949d6c5844f48049378e090de4684ca44",
	name: "submitCase",
	filename: "src/lib/pn/api.ts"
}, (opts) => submitCase.__executeServer(opts));
var submitCase = createServerFn({ method: "POST" }).validator(object({
	title: string().min(4).max(160),
	details: string().min(8).max(8e3),
	contact: string().max(160),
	file_name: string().max(160),
	file_data: string().max(55e4).nullable(),
	submitter_id: string().max(80).nullable()
})).handler(submitCase_createServerFn_handler, async ({ data }) => {
	const sql = await withDb();
	const id = (await sql`
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
    `)[0].id;
	await sql`
      insert into case_log (case_id, actor_id, actor_name, action, note)
      values (${id}, ${data.submitter_id ?? "anonymous"}, 'source', 'submitted', 'Intake received. Source protection in force.')
    `;
	return { id };
});
var listCases_createServerFn_handler = createServerRpc({
	id: "8af599547854a7deb4039363643e4ce59d54cfd36b1041bbcad3fa731c17f1ab",
	name: "listCases",
	filename: "src/lib/pn/api.ts"
}, (opts) => listCases.__executeServer(opts));
var listCases = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listCases_createServerFn_handler, async ({ context }) => {
	await requireStaff(context.userId);
	return (await (await withDb())`
      select id, title, details, contact, file_name, file_data, status, assigned_to, submitter_id,
             created_at::text as created_at
      from cases
      order by created_at desc
    `).map(asCase);
});
var listCaseLog_createServerFn_handler = createServerRpc({
	id: "910009e08bc25baa2c72feebe996e405470b86329609d28d0e4626efc3d01ed2",
	name: "listCaseLog",
	filename: "src/lib/pn/api.ts"
}, (opts) => listCaseLog.__executeServer(opts));
var listCaseLog = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ caseId: number() })).handler(listCaseLog_createServerFn_handler, async ({ context, data }) => {
	await requireStaff(context.userId);
	return (await (await withDb())`
      select id, case_id, actor_id, actor_name, action, note, created_at::text as created_at
      from case_log where case_id = ${data.caseId}
      order by created_at asc
    `).map(asLog);
});
var updateCase_createServerFn_handler = createServerRpc({
	id: "e9f50c8cd230afc13f87f2b7a9295529916a71cd7173da2f3fefc908834a81f2",
	name: "updateCase",
	filename: "src/lib/pn/api.ts"
}, (opts) => updateCase.__executeServer(opts));
var updateCase = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number(),
	status: _enum([
		"new",
		"under_investigation",
		"assigned",
		"closed"
	]).optional(),
	assigned_to: string().nullable().optional(),
	note: string().max(2e3).optional()
})).handler(updateCase_createServerFn_handler, async ({ context, data }) => {
	const staff = await requireStaff(context.userId);
	const sql = await withDb();
	const current = await sql`
      select id, title, details, contact, file_name, file_data, status, assigned_to, submitter_id,
             created_at::text as created_at
      from cases where id = ${data.id} limit 1
    `;
	if (!current[0]) throw new Error("Case not found");
	await sql`
      update cases set status = ${data.status ?? String(current[0].status)}, assigned_to = ${data.assigned_to === void 0 ? current[0].assigned_to : data.assigned_to}
      where id = ${data.id}
    `;
	const bits = [];
	if (data.status && data.status !== current[0].status) bits.push(`status → ${data.status}`);
	if (data.assigned_to !== void 0) bits.push(data.assigned_to ? `assigned → ${data.assigned_to}` : "unassigned");
	const action = data.note ? "note" : data.status === "closed" ? "closed" : data.status === "under_investigation" ? "opened" : data.assigned_to ? "assigned" : "updated";
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
var listApplications_createServerFn_handler = createServerRpc({
	id: "2ae778bc50253a11865ec92fa438bfb534bbb5c75fde4e1ff32111adb8f9a115",
	name: "listApplications",
	filename: "src/lib/pn/api.ts"
}, (opts) => listApplications.__executeServer(opts));
var listApplications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listApplications_createServerFn_handler, async ({ context }) => {
	await requireCommand(context.userId);
	return (await (await withDb())`
      select id, user_id, name, contact, location, reason, status, created_at::text as created_at
      from applications
      order by created_at desc
    `).map(asApplication);
});
var decideApplication_createServerFn_handler = createServerRpc({
	id: "b8c8b22a991dcce2437f66b8fe339a9cbecb56f795658cd1b4baaf0a6bba1375",
	name: "decideApplication",
	filename: "src/lib/pn/api.ts"
}, (opts) => decideApplication.__executeServer(opts));
var decideApplication = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number(),
	status: _enum(["approved", "rejected"])
})).handler(decideApplication_createServerFn_handler, async ({ context, data }) => {
	await requireCommand(context.userId);
	const sql = await withDb();
	const app = (await sql`
      select id, user_id, name, contact, location, reason, status, created_at::text as created_at
      from applications where id = ${data.id} limit 1
    `)[0];
	if (!app) throw new Error("Not found");
	await sql`update applications set status = ${data.status} where id = ${data.id}`;
	await sql`
      update profiles set status = ${data.status === "approved" ? "active" : "rejected"}, region = ${String(app.location)}
      where user_id = ${String(app.user_id)}
    `;
	return { ok: true };
});
var commandUser_createServerFn_handler = createServerRpc({
	id: "427601381b8e8fde854f73bfcd8a7b7266c1612eba7df8e0958df56d254c0fba",
	name: "commandUser",
	filename: "src/lib/pn/api.ts"
}, (opts) => commandUser.__executeServer(opts));
var commandUser = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	userId: string().min(1),
	action: _enum([
		"role",
		"ban",
		"warn",
		"mute",
		"unmute"
	]),
	value: string().optional()
})).handler(commandUser_createServerFn_handler, async ({ context, data }) => {
	const actor = await requireCommand(context.userId);
	const sql = await withDb();
	const target = await loadProfile(sql, data.userId);
	if (!target) throw new Error("User not found");
	if (rank(target.role) >= rank(actor.role) && actor.role !== "owner") throw new Error("Cannot act on equal or higher rank");
	if (data.action === "role") {
		const next = data.value;
		if (next === "owner" && actor.role !== "owner") throw new Error("Only owner can assign owner");
		await sql`update profiles set role = ${next} where user_id = ${data.userId}`;
	} else if (data.action === "ban") await sql`update profiles set status = ${target.status === "banned" ? "active" : "banned"} where user_id = ${data.userId}`;
	else if (data.action === "warn") await sql`update profiles set warnings = warnings + 1 where user_id = ${data.userId}`;
	else if (data.action === "mute") await sql`update profiles set status = 'muted' where user_id = ${data.userId}`;
	else if (data.action === "unmute") await sql`update profiles set status = 'active' where user_id = ${data.userId}`;
	return loadProfile(sql, data.userId);
});
var listAllProfiles_createServerFn_handler = createServerRpc({
	id: "1e79a4e8914c8b7486b43b7d086ac620bcbffa7e3a887ea62970d7aeb322a8f7",
	name: "listAllProfiles",
	filename: "src/lib/pn/api.ts"
}, (opts) => listAllProfiles.__executeServer(opts));
var listAllProfiles = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAllProfiles_createServerFn_handler, async ({ context }) => {
	await requireCommand(context.userId);
	return (await (await withDb())`
      select user_id, username, display_name, role, status, region, bio, contact,
             social_x, social_telegram, avatar, warnings, created_at::text as created_at
      from profiles
      order by created_at asc
    `).map(asProfile);
});
var networkStats_createServerFn_handler = createServerRpc({
	id: "8190f6b30eeb16334c7d8e05d65a94c2d1acc123884a462e2f973f6577c28b52",
	name: "networkStats",
	filename: "src/lib/pn/api.ts"
}, (opts) => networkStats.__executeServer(opts));
var networkStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(networkStats_createServerFn_handler, async ({ context }) => {
	const profile = await requireActive(context.userId);
	const sql = await withDb();
	const members = await sql`select count(*)::int as n from profiles where status in ('active','muted')`;
	const rooms = await sql`select count(*)::int as n from rooms`;
	const intel = await sql`select count(*)::int as n from cases where status = 'new'`;
	return {
		members: members[0]?.n ?? 0,
		rooms: rooms[0]?.n ?? 0,
		intelNew: isStaff(profile.role) ? intel[0]?.n ?? 0 : 0
	};
});
//#endregion
export { addEvent_createServerFn_handler, addFeed_createServerFn_handler, addNews_createServerFn_handler, commandUser_createServerFn_handler, createRoom_createServerFn_handler, decideApplication_createServerFn_handler, deleteRoom_createServerFn_handler, getMyProfile_createServerFn_handler, listAllProfiles_createServerFn_handler, listApplications_createServerFn_handler, listCaseLog_createServerFn_handler, listCases_createServerFn_handler, listEvents_createServerFn_handler, listFeeds_createServerFn_handler, listMembers_createServerFn_handler, listMessages_createServerFn_handler, listNews_createServerFn_handler, listRooms_createServerFn_handler, networkStats_createServerFn_handler, renameRoom_createServerFn_handler, sendMessage_createServerFn_handler, submitApplication_createServerFn_handler, submitCase_createServerFn_handler, updateCase_createServerFn_handler, updateMyProfile_createServerFn_handler };
