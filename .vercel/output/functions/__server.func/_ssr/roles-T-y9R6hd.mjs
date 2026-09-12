import { n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/roles-T-y9R6hd.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-Cj7Fo7BK.mjs");
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-CGTYBVHf.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
var UK_REGIONS = [
	"Scotland",
	"Wales",
	"Northern Ireland",
	"North East",
	"North West",
	"Yorkshire",
	"East Midlands",
	"West Midlands",
	"East of England",
	"London",
	"South East",
	"South West"
];
var REGION_ROOMS = [
	{
		title: "GENERAL",
		region: ""
	},
	{
		title: "LONDON",
		region: "London"
	},
	{
		title: "SOUTH EAST",
		region: "South East"
	},
	{
		title: "SOUTH WEST",
		region: "South West"
	},
	{
		title: "MIDLANDS",
		region: "West Midlands"
	},
	{
		title: "NORTH",
		region: "North West"
	},
	{
		title: "SCOTLAND",
		region: "Scotland"
	},
	{
		title: "WALES",
		region: "Wales"
	}
];
var RANK = {
	member: 1,
	moderator: 2,
	admin: 3,
	senior_admin: 4,
	owner: 5
};
var ROLE_LABEL = {
	owner: "OWNER",
	senior_admin: "SENIOR ADMIN",
	admin: "ADMIN",
	moderator: "MODERATOR",
	member: "MEMBER"
};
function rank(role) {
	return RANK[role] ?? 0;
}
function isStaff(role) {
	return rank(role) >= 3;
}
function isCommand(role) {
	return rank(role) >= 4;
}
function canAccessDesk(status) {
	return status === "active" || status === "muted";
}
function roleChipClass(role) {
	switch (role) {
		case "owner": return "bg-accent text-paper";
		case "senior_admin": return "bg-accent/20 text-accent border border-accent/30";
		case "admin": return "bg-elevated text-fg border border-strong";
		case "moderator": return "bg-surface text-muted border border-line";
		default: return "bg-bg text-subtle border border-line";
	}
}
function slugify(input) {
	return input.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 24) || "operator";
}
//#endregion
export { canAccessDesk as a, rank as c, authMiddleware as i, roleChipClass as l, ROLE_LABEL as n, isCommand as o, UK_REGIONS as r, isStaff as s, REGION_ROOMS as t, slugify as u };
