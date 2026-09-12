import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  GROK_PROVIDERS,
  authClient,
  authEnabled,
  signIn,
} from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Btn, Label, Pulse, Screen } from "@/components/pn/ui";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (isPending) return <Screen>Initialising secure session…</Screen>;
  if (user) return <Navigate to="/" />;

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({
          email,
          password,
          name: name || email.split("@")[0] || "operator",
          callbackURL: "/",
        });
        if (res.error) throw new Error(res.error.message || "Sign up failed");
      } else {
        const res = await authClient.signIn.email({
          email,
          password,
          callbackURL: "/",
        });
        if (res.error) throw new Error(res.error.message || "Sign in failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-line h-16 flex items-center">
        <div className="max-w-lg mx-auto w-full px-4 flex items-center justify-between">
          <Link to="/" className="font-black tracking-[0.18em] font-mono text-sm">
            PATRIOTNET
          </Link>
          <div className="flex items-center gap-2">
            <Pulse />
            <span className="mark text-micro text-subtle">Restricted</span>
          </div>
        </div>
      </header>
      <main className="max-w-lg mx-auto px-4 py-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-10 border border-accent/30 text-accent mark text-micro mb-6">
          Operator access
        </div>
        <h1 className="text-display font-bold tracking-tight text-paper">
          Sign in
        </h1>
        <p className="mt-3 text-sm text-muted leading-relaxed">
          Vetted network. After sign-in you will apply to join unless you already
          hold an active desk.
        </p>

        {!authEnabled ? (
          <p className="mt-8 text-sm text-subtle">Sign-in is disabled.</p>
        ) : (
          <div className="mt-8 space-y-3">
            {GROK_PROVIDERS.map((p) => (
              <button
                key={p.providerId}
                type="button"
                onClick={() => void signIn(p.providerId, { callbackURL: "/" })}
                className="w-full h-11 bg-elevated border border-strong mark text-2xs hover:bg-strong"
              >
                Continue with {p.label}
              </button>
            ))}

            <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-line" />
              <span className="mark text-micro text-faint">or email</span>
              <div className="h-px flex-1 bg-line" />
            </div>

            <div className="flex gap-1 mb-2">
              <button
                type="button"
                onClick={() => setMode("in")}
                className={`h-11 px-4 mark text-micro border ${
                  mode === "in"
                    ? "bg-paper text-ink border-paper"
                    : "bg-surface text-muted border-line"
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => setMode("up")}
                className={`h-11 px-4 mark text-micro border ${
                  mode === "up"
                    ? "bg-paper text-ink border-paper"
                    : "bg-surface text-muted border-line"
                }`}
              >
                Create account
              </button>
            </div>

            <form onSubmit={(e) => void onEmail(e)} className="space-y-3">
              {mode === "up" ? (
                <div>
                  <Label>Alias</Label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="field"
                    placeholder="Essex Observer"
                  />
                </div>
              ) : null}
              <div>
                <Label>Email</Label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="field"
                />
              </div>
              <div>
                <Label>Password</Label>
                <input
                  required
                  type="password"
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="field"
                />
              </div>
              {error ? (
                <div className="text-2xs font-mono text-accent">{error}</div>
              ) : null}
              <Btn type="submit" variant="paper" className="w-full" disabled={busy}>
                {busy
                  ? "Working…"
                  : mode === "up"
                    ? "Create account"
                    : "Sign in with email"}
              </Btn>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
