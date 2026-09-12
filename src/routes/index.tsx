import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMyProfile } from "@/lib/pn/api";
import { canAccessDesk } from "@/lib/pn/roles";
import type { Profile } from "@/lib/pn/types";
import { ApplyForm } from "@/components/pn/apply-form";
import { Desk } from "@/components/pn/desk";
import { Landing } from "@/components/pn/landing";
import { WhistleForm } from "@/components/pn/whistle-form";
import { Btn, Screen } from "@/components/pn/ui";
import { signOut } from "@/lib/auth/client";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [whistle, setWhistle] = useState(false);
  const [applyIntent, setApplyIntent] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setProfile(undefined);
      return;
    }
    let cancelled = false;
    void getMyProfile({
      data: {
        displayName: user.displayName,
        email: user.primaryEmail,
      },
    })
      .then((p) => {
        if (!cancelled) setProfile(p);
      })
      .catch(() => {
        if (!cancelled) setProfile(null);
      });
    return () => {
      cancelled = true;
    };
  }, [user, isPending]);

  if (!user) {
    return (
      <>
        <Landing
          onApply={() => {
            void navigate({ to: "/login" });
          }}
          onWhistle={() => setWhistle(true)}
        />
        <WhistleForm open={whistle} onClose={() => setWhistle(false)} />
      </>
    );
  }

  if (profile === undefined) {
    return <Screen>Loading desk…</Screen>;
  }

  if (profile && profile.status === "banned") {
    return (
      <GateCard
        title="Access revoked"
        body="This account is banned. Contact a senior admin if you believe this is an error."
      />
    );
  }

  if (profile && profile.status === "rejected") {
    return (
      <div className="min-h-dvh bg-bg text-fg">
        <Shell />
        <div className="max-w-lg mx-auto px-4 py-16">
          <h1 className="text-display font-bold">Application declined</h1>
          <p className="mt-4 text-sm text-muted leading-relaxed">
            Senior staff declined this application. You may submit a new statement
            below.
          </p>
          <div className="mt-8">
            <ApplyForm onDone={setProfile} />
          </div>
        </div>
      </div>
    );
  }

  if (profile && profile.status === "pending") {
    return (
      <div className="min-h-dvh bg-bg text-fg">
        <Shell />
        <div className="max-w-lg mx-auto px-4 py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-10 border border-accent/30 text-accent mark text-micro mb-6">
            Vetting in progress
          </div>
          <h1 className="text-display font-bold">Application received</h1>
          <p className="mt-4 text-sm text-muted leading-relaxed">
            Alias <span className="text-fg font-mono">@{profile.username}</span> is
            in the queue. Senior admin review is 24–48h. You will enter the desk
            once approved.
          </p>
        </div>
      </div>
    );
  }

  if (!profile || applyIntent) {
    return (
      <div className="min-h-dvh bg-bg text-fg">
        <Shell />
        <div className="max-w-lg mx-auto px-4 py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-10 border border-accent/30 text-accent mark text-micro mb-6">
            Apply to join
          </div>
          <h1 className="text-display font-bold">Vetting form</h1>
          <div className="mt-8">
            <ApplyForm
              onDone={(p) => {
                setProfile(p);
                setApplyIntent(false);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (profile && canAccessDesk(profile.status)) {
    return (
      <>
        <Desk
          me={profile}
          onProfile={setProfile}
          onWhistle={() => setWhistle(true)}
        />
        <WhistleForm
          open={whistle}
          onClose={() => setWhistle(false)}
          submitterId={profile.user_id}
        />
      </>
    );
  }

  return <Screen>Unable to open desk</Screen>;
}

function Shell() {
  const gate =
    typeof window !== "undefined" ? hasGateSessionMarker() : false;
  return (
    <header className="border-b border-line h-16 flex items-center">
      <div className="max-w-lg mx-auto w-full px-4 flex items-center justify-between">
        <Link to="/" className="font-black tracking-[0.18em] font-mono text-sm">
          PATRIOTNET
        </Link>
        {!gate ? (
          <Btn variant="ghost" className="h-11" onClick={() => void signOut()}>
            Sign out
          </Btn>
        ) : null}
      </div>
    </header>
  );
}

function GateCard({ title, body }: { title: string; body: string }) {
  const gate =
    typeof window !== "undefined" ? hasGateSessionMarker() : false;
  return (
    <div className="min-h-dvh bg-bg text-fg">
      <Shell />
      <div className="max-w-lg mx-auto px-4 py-16">
        <h1 className="text-display font-bold">{title}</h1>
        <p className="mt-4 text-sm text-muted leading-relaxed">{body}</p>
        {!gate ? (
          <Btn className="mt-8" variant="ghost" onClick={() => void signOut()}>
            Sign out
          </Btn>
        ) : null}
      </div>
    </div>
  );
}
