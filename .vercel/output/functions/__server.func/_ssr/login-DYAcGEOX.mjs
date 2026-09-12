import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as GROK_PROVIDERS } from "./server-By8W_hUb.mjs";
import { authClient, signIn } from "./client-Cj7Fo7BK.mjs";
import { c as Screen, i as Label, l as useCurrentUserState, n as Btn, s as Pulse } from "./ui-CYJNqk8f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DYAcGEOX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, { children: "Initialising secure session…" });
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	async function onEmail(e) {
		e.preventDefault();
		setBusy(true);
		setError(null);
		try {
			if (mode === "up") {
				const res = await authClient.signUp.email({
					email,
					password,
					name: name || email.split("@")[0] || "operator",
					callbackURL: "/"
				});
				if (res.error) throw new Error(res.error.message || "Sign up failed");
			} else {
				const res = await authClient.signIn.email({
					email,
					password,
					callbackURL: "/"
				});
				if (res.error) throw new Error(res.error.message || "Sign in failed");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-line h-16 flex items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-lg mx-auto w-full px-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "font-black tracking-[0.18em] font-mono text-sm",
					children: "PATRIOTNET"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pulse, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mark text-micro text-subtle",
						children: "Restricted"
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "max-w-lg mx-auto px-4 py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-flex items-center gap-2 px-3 py-1 bg-accent-10 border border-accent/30 text-accent mark text-micro mb-6",
					children: "Operator access"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-display font-bold tracking-tight text-paper",
					children: "Sign in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted leading-relaxed",
					children: "Vetted network. After sign-in you will apply to join unless you already hold an active desk."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 space-y-3",
					children: [
						GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => void signIn(p.providerId, { callbackURL: "/" }),
							className: "w-full h-11 bg-elevated border border-strong mark text-2xs hover:bg-strong",
							children: ["Continue with ", p.label]
						}, p.providerId)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-line" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mark text-micro text-faint",
									children: "or email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-line" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMode("in"),
								className: `h-11 px-4 mark text-micro border ${mode === "in" ? "bg-paper text-ink border-paper" : "bg-surface text-muted border-line"}`,
								children: "Sign in"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMode("up"),
								className: `h-11 px-4 mark text-micro border ${mode === "up" ? "bg-paper text-ink border-paper" : "bg-surface text-muted border-line"}`,
								children: "Create account"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => void onEmail(e),
							className: "space-y-3",
							children: [
								mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Alias" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: name,
									onChange: (e) => setName(e.target.value),
									className: "field",
									placeholder: "Essex Observer"
								})] }) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "field"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									type: "password",
									minLength: 8,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "field"
								})] }),
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xs font-mono text-accent",
									children: error
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									type: "submit",
									variant: "paper",
									className: "w-full",
									disabled: busy,
									children: busy ? "Working…" : mode === "up" ? "Create account" : "Sign in with email"
								})
							]
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { Login as component };
