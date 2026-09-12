import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { authClient } from "./client-Cj7Fo7BK.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-CYJNqk8f.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Mark({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("mark", className),
		children
	});
}
function Label({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "mark text-micro text-subtle block mb-1",
		children
	});
}
function Pulse() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block size-1.5 rounded-full bg-accent animate-pulse" });
}
function Modal({ open, onClose, title, accent, children, wide }) {
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 bg-ink/80 flex items-end sm:items-center justify-center p-0 sm:p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("w-full bg-surface border border-line max-h-[92vh] overflow-auto", wide ? "max-w-xl" : "max-w-md", accent && "border-accent/30"),
			role: "dialog",
			"aria-modal": "true",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 border-b border-line flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 min-w-0",
					children: [accent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pulse, {}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mark text-xs text-fg truncate",
						children: title
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "size-11 grid place-items-center text-subtle hover:text-fg",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-5",
				children
			})]
		})
	});
}
function Btn({ children, onClick, type = "button", variant = "ghost", className, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		onClick,
		disabled,
		className: cn("h-11 px-5 mark text-2xs font-semibold transition-colors duration-150", {
			ghost: "bg-elevated border border-strong text-fg hover:bg-strong disabled:opacity-50",
			paper: "bg-paper text-ink hover:bg-fg disabled:opacity-50",
			accent: "bg-accent text-paper hover:bg-accent-dim disabled:opacity-50",
			ink: "bg-surface border border-line text-fg hover:bg-elevated disabled:opacity-50"
		}[variant], className),
		children
	});
}
function Chip({ children, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-8 px-2.5 mark text-micro border whitespace-nowrap transition-colors", active ? "bg-paper text-ink border-paper" : "bg-bg text-subtle border-line hover:text-fg"),
		children
	});
}
function Avatar({ src, name, size = "md" }) {
	const dim = size === "lg" ? "size-24 text-xl" : size === "sm" ? "size-7 text-micro" : "size-10 text-2xs";
	const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase() || "PN";
	if (src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		className: cn(dim, "rounded-full object-cover shrink-0 outline outline-1 -outline-offset-1 outline-white/10")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(dim, "rounded-full bg-elevated border border-strong grid place-items-center font-mono shrink-0"),
		children: initials
	});
}
function Screen({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-bg text-fg flex items-center justify-center p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mark text-sm text-muted",
			children
		})
	});
}
//#endregion
export { Mark as a, Screen as c, Label as i, useCurrentUserState as l, Btn as n, Modal as o, Chip as r, Pulse as s, Avatar as t };
