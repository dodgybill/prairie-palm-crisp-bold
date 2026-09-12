import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, o as require_react, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { a as canAccessDesk, i as authMiddleware, l as roleChipClass, n as ROLE_LABEL, o as isCommand, r as UK_REGIONS, s as isStaff } from "./roles-T-y9R6hd.mjs";
import { cn as _enum, gn as object, hn as number, yn as string } from "../_libs/@better-auth/core+[...].mjs";
import { a as hasGateSessionMarker } from "./server-By8W_hUb.mjs";
import { signOut } from "./client-Cj7Fo7BK.mjs";
import { a as Lock, i as Scale, r as Shield } from "../_libs/lucide-react.mjs";
import { a as Mark, c as Screen, i as Label, l as useCurrentUserState, n as Btn, o as Modal, r as Chip, s as Pulse, t as Avatar } from "./ui-CYJNqk8f.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BTQbbL9b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var sessionHint = object({
	displayName: string().nullable(),
	email: string().nullable()
});
var getMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(sessionHint).handler(createSsrRpc("3c24a69be45f73ae76556528cc55f0fb4e16499dd4a27a1fcabc23e85c7daf10"));
var submitApplication = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	name: string().min(2).max(80),
	contact: string().min(3).max(120),
	location: string().min(2).max(80),
	reason: string().min(8).max(2e3)
})).handler(createSsrRpc("aa37995836350dc3c91ab5d93e5a5ed7127d2b344f5b5a31e253236788d98c54"));
var updateMyProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	display_name: string().min(2).max(80),
	bio: string().max(500),
	contact: string().max(120),
	region: string().max(80),
	social_x: string().max(80),
	social_telegram: string().max(80),
	avatar: string().max(4e5).nullable()
})).handler(createSsrRpc("5a5420b5d4c28025566d5de23f53302cfb942a3eaa35c4816aecb8ad9a89d551"));
var listMembers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("4851c62a737e250b024abaaa49f0ec838cd55325687ed99463b6494566aa0217"));
var listNews = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("fe2d9add69a0f66bb8ad790b4436a7019245bed11c2c8a828151a20838aa05e2"));
var addNews = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	title: string().min(4).max(200),
	category: string().min(2).max(40),
	source: string().min(2).max(80),
	summary: string().min(8).max(2e3)
})).handler(createSsrRpc("428ff66c036c7e59f3a630a266d8189aa060b669af91a0e76828f21d4259e859"));
var listRooms = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("f40766ef23076d0211a834e3f873bfcf7128ad4f442aa666eb41b2eae9296928"));
var listMessages = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ roomId: number() })).handler(createSsrRpc("d792ced97bccd5cd9e8727647b3d9390ad9accf77bdce5530d517bf1964004d8"));
var sendMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	roomId: number(),
	contentEnc: string().min(1).max(8e3)
})).handler(createSsrRpc("8593ffbb16c6c08f2271f8a46d7a4f6c4c7e233b113a26243254f1726d15c467"));
var createRoom = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	title: string().min(2).max(40),
	region: string().max(80).optional()
})).handler(createSsrRpc("d9ea632e7f0081a61cd2920d6fca449993d4b29a287167103ce55bb7689e6bcc"));
var renameRoom = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number(),
	title: string().min(2).max(40)
})).handler(createSsrRpc("3fb43b7fc1badc468ffcd215ce4abc75f998af3ac351c89657ef3ce0057e0b17"));
var deleteRoom = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ id: number() })).handler(createSsrRpc("35939b020f47653092ba4d05414d3e5c235c5e40297f6c9b86f34d4c87a7a7eb"));
var listEvents = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("d2114c416d394d461c73cddcdcc26602bc42488f28df6b140d2b5f7ebee9a380"));
var addEvent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	event_date: string().min(4),
	type: string().min(2).max(80),
	location: string().min(2).max(160),
	description: string().min(8).max(2e3),
	status: string().min(2).max(40)
})).handler(createSsrRpc("b3e93c2abeb9ed730b57c352bb0bde29431290bd4d1a23671b617cb0d418648d"));
var listFeeds = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("760c5f33b397ef8539db3ae4f73c684e96eaef68625ca11dc63e19e31fbc7835"));
var addFeed = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	source: string().min(2).max(40),
	title: string().min(4).max(200),
	excerpt: string().min(8).max(800),
	url: string().max(300)
})).handler(createSsrRpc("c82f19a198e80571c6b554290d1f6939cbfcd5e60f4c05500bc1165aa02b469c"));
var submitCase = createServerFn({ method: "POST" }).validator(object({
	title: string().min(4).max(160),
	details: string().min(8).max(8e3),
	contact: string().max(160),
	file_name: string().max(160),
	file_data: string().max(55e4).nullable(),
	submitter_id: string().max(80).nullable()
})).handler(createSsrRpc("969801249098ae3be4260d2d9ba94d2949d6c5844f48049378e090de4684ca44"));
var listCases = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("8af599547854a7deb4039363643e4ce59d54cfd36b1041bbcad3fa731c17f1ab"));
var listCaseLog = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({ caseId: number() })).handler(createSsrRpc("910009e08bc25baa2c72feebe996e405470b86329609d28d0e4626efc3d01ed2"));
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
})).handler(createSsrRpc("e9f50c8cd230afc13f87f2b7a9295529916a71cd7173da2f3fefc908834a81f2"));
var listApplications = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("2ae778bc50253a11865ec92fa438bfb534bbb5c75fde4e1ff32111adb8f9a115"));
var decideApplication = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(object({
	id: number(),
	status: _enum(["approved", "rejected"])
})).handler(createSsrRpc("b8c8b22a991dcce2437f66b8fe339a9cbecb56f795658cd1b4baaf0a6bba1375"));
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
})).handler(createSsrRpc("427601381b8e8fde854f73bfcd8a7b7266c1612eba7df8e0958df56d254c0fba"));
var listAllProfiles = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("1e79a4e8914c8b7486b43b7d086ac620bcbffa7e3a887ea62970d7aeb322a8f7"));
var networkStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("8190f6b30eeb16334c7d8e05d65a94c2d1acc123884a462e2f973f6577c28b52"));
function ApplyForm({ onDone }) {
	const [name, setName] = (0, import_react.useState)("");
	const [contact, setContact] = (0, import_react.useState)("");
	const [location, setLocation] = (0, import_react.useState)("South East");
	const [reason, setReason] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			const profile = await submitApplication({ data: {
				name,
				contact,
				location,
				reason
			} });
			toast.success("Application received. Vetting within 24–48h.");
			onDone(profile);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Submit failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-4 max-w-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted leading-relaxed",
				children: "Alias permitted. Data is handled confidentially. Senior staff review every application. No automatic approval."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Name / alias" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				required: true,
				value: name,
				onChange: (e) => setName(e.target.value),
				className: "field",
				placeholder: "e.g. Essex Observer"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Contact — mobile / Signal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				required: true,
				value: contact,
				onChange: (e) => setContact(e.target.value),
				className: "field",
				placeholder: "Number or handle"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Region" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: location,
				onChange: (e) => setLocation(e.target.value),
				className: "field",
				children: UK_REGIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: r,
					children: r
				}, r))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Reason for joining" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				required: true,
				value: reason,
				onChange: (e) => setReason(e.target.value),
				className: "area",
				placeholder: "What you can contribute — local knowledge, research, logistics…"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				type: "submit",
				variant: "paper",
				disabled: busy,
				children: busy ? "Submitting…" : "Submit application"
			})
		]
	});
}
function relativeTime(iso) {
	const then = new Date(iso).getTime();
	if (Number.isNaN(then)) return "";
	const delta = Date.now() - then;
	const abs = Math.abs(delta);
	const minute = 6e4;
	const hour = 60 * minute;
	const day = 24 * hour;
	const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
	if (abs < hour) return rtf.format(-Math.round(delta / minute), "minute");
	if (abs < day) return rtf.format(-Math.round(delta / hour), "hour");
	if (abs < 14 * day) return rtf.format(-Math.round(delta / day), "day");
	return new Date(iso).toLocaleString("en-GB", {
		day: "2-digit",
		month: "short",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function gbDate(iso) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleString("en-GB", {
		weekday: "short",
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
var ROLES = [
	"owner",
	"senior_admin",
	"admin",
	"moderator",
	"member"
];
var NEWS_CATEGORIES = [
	"Crossings",
	"Accommodation",
	"Crime",
	"Statistics",
	"Government",
	"Extremism"
];
var EVENT_TYPES = [
	"Community meeting",
	"Lawful protest",
	"Counter SUTR",
	"Counter Islamist extremism"
];
var FEED_SOURCES = [
	"Urban Scoop",
	"UTK",
	"Independent"
];
var CASE_STATUSES = [
	"new",
	"under_investigation",
	"assigned",
	"closed"
];
var WINDOW_MS = 4608e5;
function HomeView({ me }) {
	const qc = useQueryClient();
	const news = useQuery({
		queryKey: ["news"],
		queryFn: () => listNews()
	});
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [title, setTitle] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("Crossings");
	const [source, setSource] = (0, import_react.useState)("");
	const [summary, setSummary] = (0, import_react.useState)("");
	const items = (0, import_react.useMemo)(() => {
		const now = Date.now();
		return (news.data ?? []).filter((n) => {
			const t = new Date(n.published_at).getTime();
			const inWindow = t >= now - WINDOW_MS && t <= now + WINDOW_MS;
			const cat = filter === "All" || n.category === filter;
			return inWindow && cat;
		});
	}, [news.data, filter]);
	const publish = useMutation({
		mutationFn: () => addNews({ data: {
			title,
			category,
			source: source || "PatriotNet OSINT",
			summary
		} }),
		onSuccess: () => {
			setTitle("");
			setSource("");
			setSummary("");
			qc.invalidateQueries({ queryKey: ["news"] });
			toast.success("Item published");
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid lg:grid-cols-[1.6fr_0.6fr] gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-surface border border-line p-4 md:p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mark text-xs",
					children: "Home — news desk — 128h window"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-2xs font-mono text-subtle mt-1",
					children: [
						gbDate((/* @__PURE__ */ new Date()).toISOString()),
						" — ",
						items.length,
						" items"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 flex-wrap",
					children: ["All", ...NEWS_CATEGORIES].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: filter === c,
						onClick: () => setFilter(c),
						children: c
					}, c))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-px bg-line border border-line",
				children: [items.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "bg-bg p-4 hover:bg-panel transition-colors",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-micro font-mono px-2 py-0.5 bg-elevated border border-strong text-muted tracking-widest",
									children: n.category.toUpperCase()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-micro font-mono text-faint",
									children: [
										relativeTime(n.published_at),
										" — ",
										n.source
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-micro font-mono text-dim",
								children: gbDate(n.published_at)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-sm font-semibold leading-snug text-fg",
							children: n.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs leading-relaxed text-muted",
							children: n.summary
						})
					]
				}, n.id)), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-bg p-8 text-center mark text-2xs text-faint",
					children: "No items in the 128h window for this filter"
				}) : null]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-surface border border-line p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mark text-2xs text-subtle mb-3",
					children: "Operational notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 text-2xs leading-relaxed text-muted font-mono",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "All items factual, source-attributed. No editorialising." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "FOI / planning data needs independent verification." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Window: now ±128h. Refresh re-evaluates the cut." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Rooms: AES-GCM on device. Ciphertext on the desk." })
					]
				})]
			}), isStaff(me.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-bg border border-accent/30 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mark text-2xs text-accent mb-3",
					children: "Add news — admin+"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: category,
							onChange: (e) => setCategory(e.target.value),
							className: "field h-8 text-2xs font-mono",
							children: NEWS_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "Title — factual, neutral",
							className: "field h-8"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: source,
							onChange: (e) => setSource(e.target.value),
							placeholder: "Source — e.g. Home Office",
							className: "field h-8"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: summary,
							onChange: (e) => setSummary(e.target.value),
							placeholder: "Summary — factual only",
							className: "area min-h-16"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							variant: "paper",
							className: "w-full",
							disabled: publish.isPending || !title || !summary,
							onClick: () => publish.mutate(),
							children: "Publish item"
						})
					]
				})]
			}) : null]
		})]
	});
}
var PREFIX = "pn1.";
function bytesToB64(bytes) {
	let s = "";
	for (const b of bytes) s += String.fromCharCode(b);
	return btoa(s);
}
function b64ToBytes(b64) {
	const bin = atob(b64);
	const out = new Uint8Array(bin.length);
	for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
	return out;
}
async function roomKey(roomId) {
	const material = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`patriotnet.v10.room.${roomId}`));
	return crypto.subtle.importKey("raw", material, "AES-GCM", false, ["encrypt", "decrypt"]);
}
async function encryptText(roomId, plain) {
	if (typeof crypto === "undefined" || !crypto.subtle) return PREFIX + btoa(unescape(encodeURIComponent(plain)));
	const iv = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(12));
	const key = await roomKey(roomId);
	const cipher = await crypto.subtle.encrypt({
		name: "AES-GCM",
		iv
	}, key, new TextEncoder().encode(plain));
	const packed = new Uint8Array(iv.length + cipher.byteLength);
	packed.set(iv, 0);
	packed.set(new Uint8Array(cipher), iv.length);
	return PREFIX + bytesToB64(packed);
}
async function decryptText(roomId, payload) {
	if (!payload.startsWith(PREFIX)) return payload;
	const raw = payload.slice(4);
	try {
		if (typeof crypto === "undefined" || !crypto.subtle) return decodeURIComponent(escape(atob(raw)));
		const packed = b64ToBytes(raw);
		const iv = packed.slice(0, 12);
		const data = packed.slice(12);
		const key = await roomKey(roomId);
		const plain = await crypto.subtle.decrypt({
			name: "AES-GCM",
			iv
		}, key, data);
		return new TextDecoder().decode(plain);
	} catch {
		try {
			return atob(raw);
		} catch {
			return payload;
		}
	}
}
function CommsView({ me, initialRegion }) {
	const qc = useQueryClient();
	const rooms = useQuery({
		queryKey: ["rooms"],
		queryFn: () => listRooms()
	});
	const [roomId, setRoomId] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [showEnc, setShowEnc] = (0, import_react.useState)(false);
	const [renameId, setRenameId] = (0, import_react.useState)(null);
	const [renameVal, setRenameVal] = (0, import_react.useState)("");
	const bottom = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!rooms.data?.length) return;
		if (roomId && rooms.data.some((r) => r.id === roomId)) return;
		const match = initialRegion ? rooms.data.find((r) => r.region === initialRegion) : null;
		setRoomId(match?.id ?? rooms.data[0].id);
	}, [
		rooms.data,
		roomId,
		initialRegion
	]);
	const msgs = useQuery({
		queryKey: ["messages", roomId],
		queryFn: () => listMessages({ data: { roomId } }),
		enabled: roomId != null,
		refetchInterval: 4e3
	});
	const [plain, setPlain] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		async function run() {
			const next = {};
			for (const m of msgs.data ?? []) next[m.id] = await decryptText(m.room_id, m.content_enc);
			if (!cancelled) setPlain(next);
		}
		run();
		return () => {
			cancelled = true;
		};
	}, [msgs.data]);
	(0, import_react.useEffect)(() => {
		bottom.current?.scrollIntoView({ behavior: "smooth" });
	}, [plain]);
	const active = (0, import_react.useMemo)(() => rooms.data?.find((r) => r.id === roomId), [rooms.data, roomId]);
	const send = useMutation({
		mutationFn: async () => {
			if (!roomId || !draft.trim()) return;
			const contentEnc = await encryptText(roomId, draft.trim());
			return sendMessage({ data: {
				roomId,
				contentEnc
			} });
		},
		onSuccess: () => {
			setDraft("");
			qc.invalidateQueries({ queryKey: ["messages", roomId] });
		},
		onError: (e) => toast.error(e.message)
	});
	async function onNewRoom() {
		const title = window.prompt("New room title");
		if (!title) return;
		try {
			const room = await createRoom({ data: { title } });
			qc.invalidateQueries({ queryKey: ["rooms"] });
			setRoomId(room.id);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid lg:grid-cols-[280px_1fr] gap-px bg-line border border-line min-h-[70vh]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-surface flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 border-b border-line flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mark text-2xs",
						children: "Rooms — encrypted"
					}), isStaff(me.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => void onNewRoom(),
						className: "mark text-micro text-subtle hover:text-fg h-11 px-2",
						children: "+ New"
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-2 space-y-1 flex-1 overflow-auto",
					children: (rooms.data ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `group flex items-center justify-between p-2.5 border cursor-pointer min-h-11 ${roomId === r.id ? "bg-paper text-ink border-paper" : "bg-bg border-line hover:border-strong text-muted"}`,
						onClick: () => setRoomId(r.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mark text-2xs truncate",
								children: r.title
							})]
						}), isStaff(me.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden group-hover:flex items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-micro px-2 h-8",
								onClick: (e) => {
									e.stopPropagation();
									setRenameId(r.id);
									setRenameVal(r.title);
								},
								children: "Edit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-micro px-2 h-8",
								onClick: (e) => {
									e.stopPropagation();
									if (!window.confirm("Delete room?")) return;
									deleteRoom({ data: { id: r.id } }).then(() => qc.invalidateQueries({ queryKey: ["rooms"] }));
								},
								children: "×"
							})]
						}) : null]
					}, r.id))
				}),
				renameId != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-2 border-t border-line bg-bg flex gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: renameVal,
						onChange: (e) => setRenameVal(e.target.value),
						className: "field h-8 flex-1 font-mono text-2xs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-8 px-2 bg-paper text-ink mark text-micro",
						onClick: () => {
							renameRoom({ data: {
								id: renameId,
								title: renameVal
							} }).then(() => {
								setRenameId(null);
								qc.invalidateQueries({ queryKey: ["rooms"] });
							});
						},
						children: "Save"
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 border-t border-line bg-bg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-micro font-mono text-faint leading-relaxed",
						children: "Encrypted on device with AES-GCM. Server stores ciphertext only."
					}), isStaff(me.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 mt-2 cursor-pointer min-h-11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: showEnc,
							onChange: (e) => setShowEnc(e.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mark text-micro text-subtle",
							children: "Show ciphertext"
						})]
					}) : null]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-bg flex flex-col min-h-[60vh]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 border-b border-line bg-surface flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mark text-xs truncate",
							children: active?.title ?? "—"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-micro font-mono px-2 py-0.5 bg-accent/20 border border-accent/30 text-accent tracking-widest",
							children: "E2E"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mark text-micro text-faint",
						children: [(msgs.data ?? []).length, " messages"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-auto p-3 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-surface border border-line p-2.5 text-micro font-mono text-subtle leading-relaxed",
							children: "Encrypted channel. UK lawful conduct required. Factual, source-attributed posts only."
						}),
						(msgs.data ?? []).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								name: m.username,
								size: "sm"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-2xs font-mono font-semibold text-fg",
											children: m.username
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-micro font-mono text-faint",
											children: relativeTime(m.created_at)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-sm leading-relaxed text-muted bg-surface border border-line p-2.5",
										children: plain[m.id] ?? "…"
									}),
									showEnc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-micro font-mono text-dim break-all",
										children: ["ENC: ", m.content_enc]
									}) : null
								]
							})]
						}, m.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: bottom })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 border-t border-line bg-surface flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: draft,
						onChange: (e) => setDraft(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") send.mutate();
						},
						disabled: me.status !== "active",
						placeholder: me.status === "active" ? "Type message — encrypted on send…" : "Muted — cannot send",
						className: "field flex-1 h-11"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "paper",
						disabled: me.status !== "active" || send.isPending,
						onClick: () => send.mutate(),
						children: "Send"
					})]
				})
			]
		})]
	});
}
function MembersView({ onOpenRegion }) {
	const members = useQuery({
		queryKey: ["members"],
		queryFn: () => listMembers()
	});
	const [q, setQ] = (0, import_react.useState)("");
	const filtered = (0, import_react.useMemo)(() => {
		const s = q.toLowerCase();
		return (members.data ?? []).filter((m) => !s || m.username.toLowerCase().includes(s) || m.display_name.toLowerCase().includes(s) || m.region.toLowerCase().includes(s));
	}, [members.data, q]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-surface border border-line p-4 flex flex-wrap gap-3 items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mark text-xs",
			children: "Member list — enrolled"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-2xs font-mono text-subtle mt-1",
			children: [filtered.length, " members — role colour coded"]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value: q,
			onChange: (e) => setQ(e.target.value),
			placeholder: "Search username / region…",
			className: "field h-11 w-full md:w-72"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-line border border-line border-t-0",
		children: filtered.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberCard, {
			m,
			onRegion: onOpenRegion
		}, m.user_id))
	})] });
}
function MemberCard({ m, onRegion }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-bg p-4 hover:bg-panel transition-colors",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
					src: m.avatar,
					name: m.display_name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold leading-tight text-fg truncate",
							children: m.display_name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-2xs font-mono text-subtle",
							children: ["@", m.username]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "text-micro font-mono text-faint mt-1 hover:text-fg",
							onClick: () => m.region && onRegion?.(m.region),
							children: [
								m.region || "Unassigned",
								" · ",
								m.status
							]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `text-micro px-2 py-1 font-mono tracking-widest shrink-0 ${roleChipClass(m.role)}`,
				children: ROLE_LABEL[m.role]
			})]
		}), m.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-2xs leading-relaxed text-muted line-clamp-3",
			children: m.bio
		}) : null]
	});
}
function GroupsView({ onOpenRoom }) {
	const members = useQuery({
		queryKey: ["members"],
		queryFn: () => listMembers()
	});
	const rooms = useQuery({
		queryKey: ["rooms"],
		queryFn: () => listRooms()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-surface border border-line p-4 mb-px",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mark text-xs",
			children: "Regional groups — UK"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-2xs font-mono text-subtle mt-1",
			children: "Members clustered by region. Open the matching encrypted room."
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line",
		children: UK_REGIONS.map((region) => {
			const count = (members.data ?? []).filter((m) => m.region === region).length;
			const room = (rooms.data ?? []).find((r) => r.region === region);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-bg p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-semibold text-fg",
						children: region
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mark text-micro text-subtle mt-1 tabular-nums",
						children: [count, " members"]
					})] }), room ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onOpenRoom(region),
						className: "h-11 px-3 bg-elevated border border-strong mark text-micro hover:bg-strong",
						children: "Open room"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mark text-micro text-faint",
						children: "No room"
					})]
				})
			}, region);
		})
	})] });
}
function OperationsView({ me }) {
	const qc = useQueryClient();
	const events = useQuery({
		queryKey: ["events"],
		queryFn: () => listEvents()
	});
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [type, setType] = (0, import_react.useState)("Community meeting");
	const [location, setLocation] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("reported");
	const upcoming = (0, import_react.useMemo)(() => {
		const now = Date.now();
		return (events.data ?? []).filter((e) => {
			const future = new Date(e.event_date).getTime() >= now;
			const match = filter === "All" || e.type === filter;
			return future && match;
		});
	}, [events.data, filter]);
	const add = useMutation({
		mutationFn: () => addEvent({ data: {
			event_date: date ? new Date(date).toISOString() : new Date(Date.now() + 864e5).toISOString(),
			type,
			location,
			description,
			status
		} }),
		onSuccess: () => {
			setLocation("");
			setDescription("");
			qc.invalidateQueries({ queryKey: ["events"] });
			toast.success("Operation added");
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid lg:grid-cols-[1.6fr_0.6fr] gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-surface border border-line p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mark text-xs",
						children: "Known operations — lawful & peaceful"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-2xs font-mono text-subtle mt-1",
						children: [
							"Future only from current time. ",
							upcoming.length,
							" events"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1 flex-wrap",
						children: ["All", ...EVENT_TYPES].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: filter === t,
							onClick: () => setFilter(t),
							children: t
						}, t))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-accent-10 border border-accent/20 p-3 mb-4 text-2xs font-mono leading-relaxed text-warn-fg",
					children: "All activity must remain within UK law. No incitement. Public assemblies are subject to police conditions under S12/S14 Public Order Act. Maintain peaceful conduct. Document, do not disrupt."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-px bg-line border border-line",
					children: [upcoming.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-bg p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-micro font-mono px-2 py-0.5 bg-elevated border border-strong text-muted tracking-widest",
										children: e.type.toUpperCase()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-micro font-mono px-2 py-0.5 border tracking-widest ${e.status === "confirmed" ? "bg-accent/20 border-accent/30 text-accent" : "bg-elevated border-strong text-muted"}`,
										children: e.status.toUpperCase()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-micro font-mono text-faint",
										children: [
											gbDate(e.event_date),
											" — ",
											relativeTime(e.event_date)
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-sm font-semibold text-fg",
								children: e.location
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs leading-relaxed text-muted",
								children: e.description
							})
						]
					}, e.id)), upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-bg p-8 text-center mark text-2xs text-faint",
						children: "No future events"
					}) : null]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [isStaff(me.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-bg border border-line p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mark text-2xs text-subtle mb-3",
					children: "Add event — admin+"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: type,
							onChange: (e) => setType(e.target.value),
							className: "field h-8 text-2xs font-mono",
							children: EVENT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: location,
							onChange: (e) => setLocation(e.target.value),
							placeholder: "Location",
							className: "field h-8"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "datetime-local",
							value: date,
							onChange: (e) => setDate(e.target.value),
							className: "field h-8"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: description,
							onChange: (e) => setDescription(e.target.value),
							placeholder: "Description — lawful, factual",
							className: "area min-h-16"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: status,
							onChange: (e) => setStatus(e.target.value),
							className: "field h-8 text-2xs font-mono",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "reported",
									children: "reported"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "confirmed",
									children: "confirmed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "monitoring",
									children: "monitoring"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							variant: "paper",
							className: "w-full",
							disabled: !location || !description || add.isPending,
							onClick: () => add.mutate(),
							children: "Add operation"
						})
					]
				})]
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-surface border border-line p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mark text-2xs text-subtle mb-2",
					children: "Lawful conduct protocol"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-2xs leading-relaxed text-muted font-mono",
					children: [
						"Peaceful assembly only",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"No face coverings where S14 prohibits",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Liaise with police where applicable",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"No entry to private property",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Document, do not confront",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Source protection applies to intel"
					]
				})]
			})]
		})]
	});
}
function UtkView({ me }) {
	const qc = useQueryClient();
	const feeds = useQuery({
		queryKey: ["feeds"],
		queryFn: () => listFeeds()
	});
	const [source, setSource] = (0, import_react.useState)("Urban Scoop");
	const [title, setTitle] = (0, import_react.useState)("");
	const [excerpt, setExcerpt] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	const add = useMutation({
		mutationFn: () => addFeed({ data: {
			source,
			title,
			excerpt,
			url
		} }),
		onSuccess: () => {
			setTitle("");
			setExcerpt("");
			setUrl("");
			qc.invalidateQueries({ queryKey: ["feeds"] });
			toast.success("Feed item added");
		},
		onError: (e) => toast.error(e.message)
	});
	const urban = (feeds.data ?? []).filter((f) => f.source === "Urban Scoop");
	const utk = (feeds.data ?? []).filter((f) => f.source !== "Urban Scoop");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-surface border border-line p-4 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mark text-xs",
				children: "UTK / Urban Scoop — external feeds"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-2xs font-mono text-subtle mt-1",
				children: "External sources — verify independently. Not endorsed."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mark text-micro text-faint",
				children: "External — verify"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid md:grid-cols-2 gap-px bg-line border border-line border-t-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedCol, {
				title: "Urban Scoop feed",
				items: urban
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedCol, {
				title: "UTK / independent journalism",
				items: utk
			})]
		}),
		isStaff(me.role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 bg-bg border border-line p-4 grid md:grid-cols-[1fr_1fr_auto] gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: title,
					onChange: (e) => setTitle(e.target.value),
					placeholder: "Title",
					className: "field h-11"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: excerpt,
					onChange: (e) => setExcerpt(e.target.value),
					placeholder: "Excerpt",
					className: "field h-11"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: source,
						onChange: (e) => setSource(e.target.value),
						className: "field h-11 font-mono text-2xs",
						children: FEED_SOURCES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "paper",
						disabled: !title || !excerpt || add.isPending,
						onClick: () => add.mutate(),
						children: "Add"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: url,
					onChange: (e) => setUrl(e.target.value),
					placeholder: "URL (optional)",
					className: "field h-11 md:col-span-3"
				})
			]
		}) : null
	] });
}
function FeedCol({ title, items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-bg p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mark text-2xs text-subtle mb-3",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: items.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "border border-line bg-surface p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-micro font-mono text-faint",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: relativeTime(o.published_at) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: o.source })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 text-sm font-semibold text-fg leading-snug",
						children: o.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs leading-relaxed text-muted",
						children: o.excerpt
					}),
					o.url && o.url !== "#" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: o.url,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "mt-2 inline-block text-micro font-mono text-subtle hover:text-fg underline",
						children: "External link"
					}) : null
				]
			}, o.id))
		})]
	});
}
function ProfileView({ me, onUpdated }) {
	const [display, setDisplay] = (0, import_react.useState)(me.display_name);
	const [bio, setBio] = (0, import_react.useState)(me.bio);
	const [contact, setContact] = (0, import_react.useState)(me.contact);
	const [region, setRegion] = (0, import_react.useState)(me.region);
	const [x, setX] = (0, import_react.useState)(me.social_x);
	const [tg, setTg] = (0, import_react.useState)(me.social_telegram);
	const [avatar, setAvatar] = (0, import_react.useState)(me.avatar);
	const [busy, setBusy] = (0, import_react.useState)(false);
	function onFile(file) {
		if (!file) return;
		if (file.size > 35e4) {
			toast.error("Image must be under 350KB");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement("canvas");
				const size = 256;
				canvas.width = size;
				canvas.height = size;
				const ctx = canvas.getContext("2d");
				if (!ctx) return;
				const min = Math.min(img.width, img.height);
				const sx = (img.width - min) / 2;
				const sy = (img.height - min) / 2;
				ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);
				setAvatar(canvas.toDataURL("image/jpeg", .85));
			};
			img.src = String(reader.result);
		};
		reader.readAsDataURL(file);
	}
	async function save() {
		setBusy(true);
		try {
			const next = await updateMyProfile({ data: {
				display_name: display,
				bio,
				contact,
				region,
				social_x: x,
				social_telegram: tg,
				avatar
			} });
			if (next) {
				onUpdated(next);
				toast.success("Profile saved");
			}
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Save failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid lg:grid-cols-[380px_1fr] gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-surface border border-line p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mark text-2xs mb-4",
					children: "Profile — stored on the desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							src: avatar,
							name: display || me.display_name,
							size: "lg"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-sm font-semibold",
							children: display
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-2xs font-mono text-subtle",
							children: [
								"@",
								me.username,
								" — ",
								ROLE_LABEL[me.role]
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Avatar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/*",
								onChange: (e) => onFile(e.target.files?.[0]),
								className: "mt-1 w-full text-micro font-mono text-subtle"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Display name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: display,
							onChange: (e) => setDisplay(e.target.value),
							className: "field h-9"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Region" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: region,
							onChange: (e) => setRegion(e.target.value),
							className: "field h-9",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Unassigned"
							}), UK_REGIONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: r }, r))]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Bio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: bio,
							onChange: (e) => setBio(e.target.value),
							className: "area min-h-20"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Contact" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: contact,
							onChange: (e) => setContact(e.target.value),
							className: "field h-9"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "X / Twitter" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: x,
								onChange: (e) => setX(e.target.value),
								className: "field h-9",
								placeholder: "@handle"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Telegram" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: tg,
								onChange: (e) => setTg(e.target.value),
								className: "field h-9",
								placeholder: "@handle"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							variant: "paper",
							className: "w-full mt-2",
							disabled: busy,
							onClick: () => void save(),
							children: busy ? "Saving…" : "Save profile"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-bg border border-line p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mark text-2xs text-subtle mb-3",
					children: "Account details"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 text-xs font-mono",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Username",
							v: me.username
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-b border-surface py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-faint",
								children: "Role"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `px-2 py-0.5 text-micro ${roleChipClass(me.role)}`,
								children: ROLE_LABEL[me.role]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Region",
							v: me.region || "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Status",
							v: me.status
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Warnings",
							v: String(me.warnings)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Rooms",
							v: "AES-256-GCM on device"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 p-3 bg-surface border border-line text-2xs leading-relaxed text-muted font-mono",
					children: "Profile data is scoped to your signed-in identity. Avatar is stored as a compressed JPEG on the desk. Contact info is visible to enrolled members."
				})
			]
		})]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between border-b border-surface py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-faint",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-fg",
			children: v
		})]
	});
}
function IntelView({ me }) {
	const qc = useQueryClient();
	const cases = useQuery({
		queryKey: ["cases"],
		queryFn: () => listCases(),
		enabled: isStaff(me.role)
	});
	const members = useQuery({
		queryKey: ["members"],
		queryFn: () => listMembers(),
		enabled: isStaff(me.role)
	});
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const [note, setNote] = (0, import_react.useState)("");
	const log = useQuery({
		queryKey: ["case-log", openId],
		queryFn: () => listCaseLog({ data: { caseId: openId } }),
		enabled: openId != null
	});
	const patch = useMutation({
		mutationFn: (payload) => updateCase({ data: payload }),
		onSuccess: () => {
			setNote("");
			qc.invalidateQueries({ queryKey: ["cases"] });
			qc.invalidateQueries({ queryKey: ["case-log"] });
			qc.invalidateQueries({ queryKey: ["stats"] });
		},
		onError: (e) => toast.error(e.message)
	});
	if (!isStaff(me.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-bg border border-accent/30 p-8 text-center mark text-2xs text-accent",
		children: "Restricted — admin+ only"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-accent-10 border border-accent/30 p-4 mb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mark text-xs text-accent",
			children: "Intelligence — restricted — admin+ — handle with sensitivity"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-2xs font-mono leading-relaxed text-warn-fg",
			children: "Do not disclose a source without explicit consent. Assign only to trusted handlers. Verify independently. Investigation log is timestamped."
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-px bg-line border border-line",
		children: [(cases.data ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseRow, {
			c,
			members: members.data ?? [],
			open: openId === c.id,
			onToggle: () => setOpenId(openId === c.id ? null : c.id),
			log: openId === c.id ? log.data ?? [] : [],
			note: openId === c.id ? note : "",
			setNote,
			busy: patch.isPending,
			onPatch: (p) => patch.mutate({
				id: c.id,
				...p
			})
		}, c.id)), (cases.data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-bg p-8 text-center mark text-2xs text-faint",
			children: "No intake"
		}) : null]
	})] });
}
function CaseRow({ c, members, open, onToggle, log, note, setNote, busy, onPatch }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-bg p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 flex-wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xs font-mono font-semibold text-fg",
									children: c.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusChip, { status: c.status }),
								c.file_name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-micro font-mono px-1.5 py-0.5 bg-elevated border border-strong text-subtle",
									children: "File"
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-micro font-mono text-faint",
									children: relativeTime(c.created_at)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs leading-relaxed text-muted",
							children: c.details
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 text-micro font-mono text-faint",
							children: [
								"Contact: ",
								c.contact || "ANONYMOUS",
								" — ID: ",
								c.id
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-stretch gap-2 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: c.assigned_to || "",
							onChange: (e) => onPatch({
								assigned_to: e.target.value || null,
								status: e.target.value ? "assigned" : c.status
							}),
							className: "field h-11 text-micro font-mono w-44",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Assign to…"
							}), members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: m.user_id,
								children: [
									m.username,
									" — ",
									m.role
								]
							}, m.user_id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: c.status,
							onChange: (e) => onPatch({ status: e.target.value }),
							className: "field h-11 text-micro font-mono w-44",
							children: CASE_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s.replaceAll("_", " ")
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							variant: "ink",
							onClick: onToggle,
							children: open ? "Hide log" : "Investigation log"
						})
					]
				})]
			}),
			c.file_name && c.file_data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: c.file_data,
				download: c.file_name,
				className: "mt-2 inline-block text-micro font-mono text-subtle underline hover:text-fg",
				children: ["Download ", c.file_name]
			}) : null,
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 border border-line bg-surface p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mark text-micro text-subtle mb-3",
						children: "Timestamped log"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [log.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-2xs font-mono text-muted border-b border-line pb-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-faint",
									children: gbDate(e.created_at)
								}),
								"  ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-accent",
									children: e.action
								}),
								"  ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: e.actor_name }),
								e.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-subtle",
									children: e.note
								}) : null
							]
						}, e.id)), log.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-micro font-mono text-faint",
							children: "No entries"
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Add log note" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: note,
								onChange: (e) => setNote(e.target.value),
								className: "area min-h-16",
								placeholder: "Action taken…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
								variant: "paper",
								className: "mt-2",
								disabled: !note.trim() || busy,
								onClick: () => onPatch({ note: note.trim() }),
								children: "Append to log"
							})
						]
					})
				]
			}) : null
		]
	});
}
function StatusChip({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `text-micro font-mono px-2 py-0.5 border tracking-widest ${status === "new" ? "bg-accent text-paper border-accent" : status === "under_investigation" ? "bg-elevated text-fg border-strong" : status === "assigned" ? "bg-surface text-muted border-strong" : "bg-bg text-faint border-line"}`,
		children: status.replaceAll("_", " ").toUpperCase()
	});
}
function CommandView({ me }) {
	const qc = useQueryClient();
	const apps = useQuery({
		queryKey: ["applications"],
		queryFn: () => listApplications(),
		enabled: isCommand(me.role)
	});
	const profiles = useQuery({
		queryKey: ["all-profiles"],
		queryFn: () => listAllProfiles(),
		enabled: isCommand(me.role)
	});
	const rooms = useQuery({
		queryKey: ["rooms"],
		queryFn: () => listRooms()
	});
	const stats = useQuery({
		queryKey: ["stats"],
		queryFn: () => networkStats()
	});
	const [history, setHistory] = (0, import_react.useState)(false);
	const [newRoom, setNewRoom] = (0, import_react.useState)("");
	const decide = useMutation({
		mutationFn: (p) => decideApplication({ data: p }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["applications"] });
			qc.invalidateQueries({ queryKey: ["all-profiles"] });
			qc.invalidateQueries({ queryKey: ["members"] });
			qc.invalidateQueries({ queryKey: ["stats"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const act = useMutation({
		mutationFn: (p) => commandUser({ data: p }),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["all-profiles"] });
			qc.invalidateQueries({ queryKey: ["members"] });
		},
		onError: (e) => toast.error(e.message)
	});
	if (!isCommand(me.role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-bg border border-accent/30 p-8 text-center mark text-2xs text-accent",
		children: "Restricted — senior admin+ / owner only"
	});
	const pending = (apps.data ?? []).filter((a) => a.status === "pending");
	const done = (apps.data ?? []).filter((a) => a.status !== "pending");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-surface border border-line p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mark text-xs",
					children: "Command panel — senior admin+"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-2xs font-mono text-subtle mt-1",
					children: "Join requests, roles, sanctions, room management."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-bg border border-accent/30",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 border-b border-line flex flex-wrap items-center justify-between gap-3 bg-surface",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-accent animate-pulse" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mark text-xs",
									children: "Join requests — pending approval"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-micro font-mono px-2 py-0.5 bg-accent text-paper tracking-widest",
									children: [pending.length, " pending"]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							variant: "ghost",
							className: "h-8 px-3",
							onClick: () => void apps.refetch(),
							children: "Refresh"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-3",
						children: pending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-6 text-center border border-dashed border-line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mark text-2xs text-faint",
								children: "No pending applications"
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-px bg-line border border-line",
							children: pending.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppRow, {
								a,
								busy: decide.isPending,
								onDecide: (status) => decide.mutate({
									id: a.id,
									status
								})
							}, a.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setHistory((h) => !h),
							className: "w-full p-3 flex items-center justify-between hover:bg-surface min-h-11",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mark text-micro text-subtle",
								children: [
									"History — ",
									done.length,
									" items"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mark text-micro text-faint",
								children: history ? "Collapse" : "Expand"
							})]
						}), history ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 pt-0",
							children: done.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2 bg-surface p-3 border border-line mb-px",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-micro font-mono px-2 py-0.5 tracking-widest border ${a.status === "approved" ? "bg-ok-bg border-ok-border text-ok-fg" : "bg-warn-bg border-warn-border text-warn-fg"}`,
											children: a.status.toUpperCase()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-2xs font-mono text-fg truncate",
											children: a.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-micro font-mono text-faint",
											children: a.location
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-micro font-mono text-faint",
									children: gbDate(a.created_at)
								})]
							}, a.id))
						}) : null]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-3 gap-px bg-line border border-line",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Total members",
						value: stats.data?.members ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Active rooms",
						value: stats.data?.rooms ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Intel new",
						value: stats.data?.intelNew ?? 0,
						accent: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-bg border border-line overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-[900px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-[160px_140px_100px_80px_1fr] gap-px bg-line border-b border-line p-px",
						children: [
							"Username",
							"Role",
							"Status",
							"Warn",
							"Actions"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-surface p-2.5 mark text-micro text-subtle",
							children: h
						}, h))
					}), (profiles.data ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[160px_140px_100px_80px_1fr] gap-px bg-line p-px",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-bg p-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xs font-mono text-fg",
									children: p.username
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-micro font-mono text-faint truncate",
									children: p.display_name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-bg p-2.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: p.role,
									onChange: (e) => act.mutate({
										userId: p.user_id,
										action: "role",
										value: e.target.value
									}),
									className: "field h-8 text-micro font-mono",
									children: ROLES.filter((r) => r !== "owner" || me.role === "owner").map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: r,
										children: ROLE_LABEL[r]
									}, r))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-bg p-2.5 text-micro font-mono text-muted",
								children: p.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-bg p-2.5 text-micro font-mono text-muted tabular-nums",
								children: p.warnings
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-bg p-2.5 flex flex-wrap gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
										onClick: () => act.mutate({
											userId: p.user_id,
											action: "ban"
										}),
										children: p.status === "banned" ? "Unban" : "Ban"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
										onClick: () => act.mutate({
											userId: p.user_id,
											action: "warn"
										}),
										children: "Warn"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
										onClick: () => act.mutate({
											userId: p.user_id,
											action: p.status === "muted" ? "unmute" : "mute"
										}),
										children: p.status === "muted" ? "Unmute" : "Mute"
									})
								]
							})
						]
					}, p.user_id))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-bg border border-line p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mark text-2xs text-subtle mb-3",
						children: "Room management"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: newRoom,
							onChange: (e) => setNewRoom(e.target.value),
							placeholder: "NEW ROOM TITLE",
							className: "field h-11 flex-1 font-mono"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
							variant: "paper",
							disabled: !newRoom.trim(),
							onClick: () => {
								createRoom({ data: { title: newRoom } }).then(() => {
									setNewRoom("");
									qc.invalidateQueries({ queryKey: ["rooms"] });
									qc.invalidateQueries({ queryKey: ["stats"] });
								});
							},
							children: "Create"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-1 max-h-40 overflow-auto",
						children: (rooms.data ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between bg-surface border border-line p-2 min-h-11",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-2xs font-mono text-muted",
								children: [r.title, r.region ? ` — ${r.region}` : ""]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mark text-micro text-faint hover:text-accent px-3 h-11",
								onClick: () => {
									if (!window.confirm("Delete room?")) return;
									deleteRoom({ data: { id: r.id } }).then(() => {
										qc.invalidateQueries({ queryKey: ["rooms"] });
										qc.invalidateQueries({ queryKey: ["stats"] });
									});
								},
								children: "Delete"
							})]
						}, r.id))
					})
				]
			})
		]
	});
}
function AppRow({ a, busy, onDecide }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-surface p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col lg:flex-row lg:items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-mono font-semibold text-fg",
							children: a.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-micro font-mono px-2 py-0.5 bg-accent/20 border border-accent/30 text-warn-fg tracking-widest",
							children: "Pending"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-micro font-mono text-faint",
							children: [
								gbDate(a.created_at),
								" — ",
								relativeTime(a.created_at)
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid md:grid-cols-2 gap-3 text-2xs font-mono",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-20 text-faint",
								children: "Contact"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted break-all",
								children: a.contact
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-20 text-faint",
								children: "Location"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: a.location
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-bg border border-line p-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mark text-micro text-faint mb-1",
							children: "Reason"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xs leading-relaxed text-muted",
							children: a.reason
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex lg:flex-col gap-2 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "paper",
					disabled: busy,
					onClick: () => onDecide("approved"),
					children: "Approve"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					variant: "ghost",
					disabled: busy,
					onClick: () => onDecide("rejected"),
					children: "Reject"
				})]
			})]
		})
	});
}
function Stat({ label, value, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-bg p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mark text-micro text-faint",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `mt-1 text-xl font-mono font-semibold tabular-nums ${accent ? "text-accent" : "text-fg"}`,
			children: value
		})]
	});
}
function Mini({ children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: "h-8 px-2 bg-elevated border border-strong mark text-micro hover:bg-strong",
		children
	});
}
function Desk({ me, onProfile, onWhistle }) {
	const [tab, setTab] = (0, import_react.useState)("home");
	const [roomRegion, setRoomRegion] = (0, import_react.useState)();
	const stats = useQuery({
		queryKey: ["stats"],
		queryFn: () => networkStats()
	});
	const gate = (0, import_react.useMemo)(() => typeof window !== "undefined" ? hasGateSessionMarker() : false, []);
	const tabs = [
		{
			id: "home",
			label: "Home"
		},
		{
			id: "comms",
			label: "Comms"
		},
		{
			id: "groups",
			label: "Groups"
		},
		{
			id: "members",
			label: "Members"
		},
		{
			id: "operations",
			label: "Operations"
		},
		{
			id: "utk",
			label: "UTK"
		},
		{
			id: "profile",
			label: "Profile"
		}
	];
	if (isStaff(me.role)) tabs.push({
		id: "intel",
		label: "Intelligence",
		badge: stats.data?.intelNew
	});
	if (isCommand(me.role)) tabs.push({
		id: "command",
		label: "Command"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "h-14 border-b border-line bg-bg sticky top-0 z-30 flex items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-[1600px] mx-auto px-3 md:px-5 flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 md:gap-8 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-black tracking-[0.18em] text-sm font-mono shrink-0",
								children: "PATRIOTNET"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden lg:flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pulse, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mark text-micro text-subtle",
									children: "Encrypted & confidential"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden md:flex items-center gap-1.5 px-2 py-1 bg-surface border border-line",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1 rounded-full bg-ok" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mark text-micro text-muted",
									children: "Secure session"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden md:flex items-center gap-2 bg-surface border border-line px-3 h-11",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
										src: me.avatar,
										name: me.display_name,
										size: "sm"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xs font-mono",
										children: me.username
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-micro px-1.5 py-0.5 font-mono ${roleChipClass(me.role)}`,
										children: ROLE_LABEL[me.role]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onWhistle,
								className: "h-11 px-3 bg-accent text-paper mark text-micro hover:bg-accent-dim",
								children: "Whistleblow"
							}),
							!gate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void signOut(),
								className: "h-11 px-3 bg-elevated border border-strong mark text-micro hover:bg-strong",
								children: "Logout"
							}) : null
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "border-b border-line bg-bg sticky top-14 z-20 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-[1600px] mx-auto px-3 md:px-5 flex items-center gap-1 h-12",
					children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTab(t.id),
						className: `h-11 px-3 mark text-2xs border whitespace-nowrap ${tab === t.id ? "bg-paper text-ink border-paper" : "bg-surface text-muted border-line hover:border-strong hover:text-fg"}`,
						children: [t.label, t.badge ? ` (${t.badge})` : ""]
					}, t.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "max-w-[1600px] mx-auto px-3 md:px-5 py-4 md:py-6",
				children: [
					tab === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeView, { me }) : null,
					tab === "comms" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommsView, {
						me,
						initialRegion: roomRegion
					}) : null,
					tab === "groups" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupsView, { onOpenRoom: (region) => {
						setRoomRegion(region);
						setTab("comms");
					} }) : null,
					tab === "members" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MembersView, { onOpenRegion: (region) => {
						setRoomRegion(region);
						setTab("groups");
					} }) : null,
					tab === "operations" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperationsView, { me }) : null,
					tab === "utk" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtkView, { me }) : null,
					tab === "profile" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileView, {
						me,
						onUpdated: onProfile
					}) : null,
					tab === "intel" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntelView, { me }) : null,
					tab === "command" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandView, { me }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "mt-10 border-t border-line py-6 flex flex-wrap gap-4 justify-between mark text-micro text-faint",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PatriotNet — encrypted — confidential handling — UK law applies" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Secure" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Lawful" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Confidential" })
							]
						})]
					})
				]
			})
		]
	});
}
var TRACK = [
	"Small boat crossings — Home Office / maritime data",
	"Accommodation use — FOI-verified hotel lists",
	"Crime and incident logs — Police.uk / ONS",
	"RAF base conversions — planning portal",
	"Statistics — ONS migration releases"
];
var PROTOCOLS = [
	{
		t: "End-to-end encrypted rooms",
		d: "Messages are encrypted on the device before they hit the desk. Room keys never leave the client cipher. Server stores ciphertext.",
		icon: Lock,
		code: "E2E-01"
	},
	{
		t: "Confidential handling",
		d: "Whistleblower intake is visible only to vetted intelligence handlers. Source protection is enforced. No disclosure without consent.",
		icon: Shield,
		code: "CONF-03"
	},
	{
		t: "Lawful and accountable",
		d: "UK law only. No incitement, no harassment. Public assembly is subject to S12/S14 conditions. Evidence-led reporting.",
		icon: Scale,
		code: "LAW-UK"
	}
];
function Landing({ onApply, onWhistle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-line bg-bg sticky top-0 z-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-[1280px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4 min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-black tracking-[0.18em] text-lg font-mono shrink-0",
							children: "PATRIOTNET"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden md:flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pulse, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {
								className: "text-micro text-muted",
								children: "Secure network"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden md:block ml-2 px-2.5 py-1 bg-surface border border-line text-micro font-mono tracking-widest text-muted",
							children: "Encrypted & confidential"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "h-11 px-4 bg-elevated border border-strong mark text-2xs hover:bg-strong inline-flex items-center",
					children: "Operator login"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "max-w-[1280px] mx-auto px-4 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-10 md:py-16 border-b border-line",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-3xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "inline-flex items-center gap-2 px-3 py-1 bg-accent-10 border border-accent/30 text-accent mark text-micro mb-6",
								children: "Restricted — vetted access only"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-hero font-bold tracking-tight text-paper",
								children: [
									"UK patriot",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"information",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"network"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-base leading-relaxed text-muted max-w-[58ch]",
								children: "Lawful information sharing for concerned British citizens. Documenting crossings, accommodation use, public expenditure and community impacts through verified sources, FOIs and official data."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-2xs font-mono text-subtle border-l-2 border-line pl-3",
								children: "All communications encrypted. Confidential sources protected. Lawful conduct required. No incitement, no harassment."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										variant: "paper",
										onClick: onApply,
										children: "Apply to join"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
										variant: "accent",
										onClick: onWhistle,
										children: "Secure whistleblow"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/login",
										className: "h-11 px-5 bg-surface border border-line mark text-2xs font-semibold inline-flex items-center hover:bg-elevated md:hidden",
										children: "Operator login"
									})
								]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid md:grid-cols-3 gap-px bg-line border border-line mt-8",
					children: PROTOCOLS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-surface p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, {
								className: "size-4 text-fg mb-4",
								strokeWidth: 1.5
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mark text-2xs text-paper mb-3",
								children: p.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm leading-relaxed text-muted",
								children: p.d
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 text-micro font-mono text-faint",
								children: ["Protocol: ", p.code]
							})
						]
					}, p.code))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 grid md:grid-cols-[1.2fr_0.8fr] gap-8 pb-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-surface border border-line p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mark text-2xs text-subtle mb-4",
							children: "What we track — 128h window"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: TRACK.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 text-sm text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-dim",
									children: "—"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
							}, item))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-bg border border-line p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mark text-2xs text-subtle mb-4",
								children: "Vetting process"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed text-muted",
								children: "Applications require alias, contact, region and reason. Senior admin review within 24–48h. No automatic approval. Sources may be contacted for verification."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 h-px bg-line" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 text-micro font-mono text-faint leading-relaxed",
								children: [
									"Encryption: AES-256-GCM on device",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Session: signed Better Auth"
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
					className: "border-t border-line py-6 mark text-micro text-faint",
					children: "PatriotNet — encrypted — all communications confidential — UK law applies"
				})
			]
		})]
	});
}
function WhistleForm({ open, onClose, submitterId }) {
	const [title, setTitle] = (0, import_react.useState)("");
	const [details, setDetails] = (0, import_react.useState)("");
	const [contact, setContact] = (0, import_react.useState)("");
	const [fileName, setFileName] = (0, import_react.useState)("");
	const [fileData, setFileData] = (0, import_react.useState)(null);
	const [consent, setConsent] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	function reset() {
		setTitle("");
		setDetails("");
		setContact("");
		setFileName("");
		setFileData(null);
		setConsent(false);
	}
	async function onFile(file) {
		if (!file) {
			setFileName("");
			setFileData(null);
			return;
		}
		if (file.size > 4e5) {
			toast.error("Attachment must be under 400KB");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setFileName(file.name);
			setFileData(String(reader.result));
		};
		reader.readAsDataURL(file);
	}
	async function onSubmit(e) {
		e.preventDefault();
		if (!consent) {
			toast.error("Confirm confidentiality understanding");
			return;
		}
		setBusy(true);
		try {
			await submitCase({ data: {
				title,
				details,
				contact,
				file_name: fileName,
				file_data: fileData,
				submitter_id: submitterId ?? null
			} });
			toast.success("Submission received. Source protection in force.");
			reset();
			onClose();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Submit failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		open,
		onClose,
		title: "Secure whistleblow — confidential",
		accent: true,
		wide: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-bg border border-accent/20 p-4 mb-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mark text-2xs text-accent mb-2",
				children: "Confidentiality assurance"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-fg",
				children: "Treated in the strictest confidence. Visible only to vetted intelligence handlers (admin+). Source identity is protected. No disclosure without explicit consent. You may remain anonymous."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Title / subject" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					required: true,
					value: title,
					onChange: (e) => setTitle(e.target.value),
					className: "field",
					placeholder: "Brief title"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Details" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					required: true,
					value: details,
					onChange: (e) => setDetails(e.target.value),
					className: "area min-h-28",
					placeholder: "What you have observed — dates, locations, evidence…"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Contact (optional — Proton / Signal preferred)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: contact,
					onChange: (e) => setContact(e.target.value),
					className: "field",
					placeholder: "Leave blank to remain anonymous"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Attach file (optional, under 400KB)" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						onChange: (e) => void onFile(e.target.files?.[0]),
						className: "mt-1 text-2xs font-mono text-subtle w-full"
					}),
					fileName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-micro font-mono text-muted",
						children: fileName
					}) : null
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex gap-3 items-start bg-bg border border-line p-3 cursor-pointer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: consent,
						onChange: (e) => setConsent(e.target.checked),
						className: "mt-1"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-2xs leading-relaxed text-muted",
						children: "I understand this is treated in strictest confidence and only visible to vetted intelligence handlers. Source protection applies."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						type: "submit",
						variant: "accent",
						disabled: busy,
						children: busy ? "Submitting…" : "Submit securely"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						variant: "ghost",
						onClick: onClose,
						children: "Cancel"
					})]
				})
			]
		})]
	});
}
function Home() {
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const [profile, setProfile] = (0, import_react.useState)(void 0);
	const [whistle, setWhistle] = (0, import_react.useState)(false);
	const [applyIntent, setApplyIntent] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		if (!user) {
			setProfile(void 0);
			return;
		}
		let cancelled = false;
		getMyProfile({ data: {
			displayName: user.displayName,
			email: user.primaryEmail
		} }).then((p) => {
			if (!cancelled) setProfile(p);
		}).catch(() => {
			if (!cancelled) setProfile(null);
		});
		return () => {
			cancelled = true;
		};
	}, [user, isPending]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, { children: "Initialising secure session…" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landing, {
		onApply: () => {
			navigate({ to: "/login" });
		},
		onWhistle: () => setWhistle(true)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhistleForm, {
		open: whistle,
		onClose: () => setWhistle(false)
	})] });
	if (profile === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, { children: "Loading desk…" });
	if (profile && profile.status === "banned") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateCard, {
		title: "Access revoked",
		body: "This account is banned. Contact a senior admin if you believe this is an error."
	});
	if (profile && profile.status === "rejected") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-lg mx-auto px-4 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-display font-bold",
					children: "Application declined"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted leading-relaxed",
					children: "Senior staff declined this application. You may submit a new statement below."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplyForm, { onDone: setProfile })
				})
			]
		})]
	});
	if (profile && profile.status === "pending") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-lg mx-auto px-4 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-flex items-center gap-2 px-3 py-1 bg-accent-10 border border-accent/30 text-accent mark text-micro mb-6",
					children: "Vetting in progress"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-display font-bold",
					children: "Application received"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-sm text-muted leading-relaxed",
					children: [
						"Alias ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-fg font-mono",
							children: ["@", profile.username]
						}),
						" is in the queue. Senior admin review is 24–48h. You will enter the desk once approved."
					]
				})
			]
		})]
	});
	if (!profile || applyIntent) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-lg mx-auto px-4 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-flex items-center gap-2 px-3 py-1 bg-accent-10 border border-accent/30 text-accent mark text-micro mb-6",
					children: "Apply to join"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-display font-bold",
					children: "Vetting form"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApplyForm, { onDone: (p) => {
						setProfile(p);
						setApplyIntent(false);
					} })
				})
			]
		})]
	});
	if (profile && canAccessDesk(profile.status)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Desk, {
		me: profile,
		onProfile: setProfile,
		onWhistle: () => setWhistle(true)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhistleForm, {
		open: whistle,
		onClose: () => setWhistle(false),
		submitterId: profile.user_id
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, { children: "Unable to open desk" });
}
function Shell() {
	const gate = typeof window !== "undefined" ? hasGateSessionMarker() : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-b border-line h-16 flex items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-lg mx-auto w-full px-4 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "font-black tracking-[0.18em] font-mono text-sm",
				children: "PATRIOTNET"
			}), !gate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				variant: "ghost",
				className: "h-11",
				onClick: () => void signOut(),
				children: "Sign out"
			}) : null]
		})
	});
}
function GateCard({ title, body }) {
	const gate = typeof window !== "undefined" ? hasGateSessionMarker() : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-lg mx-auto px-4 py-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-display font-bold",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted leading-relaxed",
					children: body
				}),
				!gate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					className: "mt-8",
					variant: "ghost",
					onClick: () => void signOut(),
					children: "Sign out"
				}) : null
			]
		})]
	});
}
//#endregion
export { Home as component };
