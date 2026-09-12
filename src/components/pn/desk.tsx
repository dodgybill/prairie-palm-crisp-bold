import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "@/lib/auth/client";
import { hasGateSessionMarker } from "@/lib/auth/gate-session-marker";
import { networkStats } from "@/lib/pn/api";
import { ROLE_LABEL, roleChipClass, isCommand, isStaff } from "@/lib/pn/roles";
import type { DeskTab, Profile } from "@/lib/pn/types";
import { Avatar, Pulse } from "./ui";
import { HomeView } from "./views-home";
import { CommsView } from "./views-comms";
import { GroupsView, MembersView } from "./views-people";
import { OperationsView, UtkView } from "./views-ops";
import { ProfileView } from "./views-profile";
import { IntelView } from "./views-intel";
import { CommandView } from "./views-command";

export function Desk({
  me,
  onProfile,
  onWhistle,
}: {
  me: Profile;
  onProfile: (p: Profile) => void;
  onWhistle: () => void;
}) {
  const [tab, setTab] = useState<DeskTab>("home");
  const [roomRegion, setRoomRegion] = useState<string | undefined>();
  const stats = useQuery({ queryKey: ["stats"], queryFn: () => networkStats() });
  const gate = useMemo(
    () => (typeof window !== "undefined" ? hasGateSessionMarker() : false),
    [],
  );

  const tabs: { id: DeskTab; label: string; badge?: number }[] = [
    { id: "home", label: "Home" },
    { id: "comms", label: "Comms" },
    { id: "groups", label: "Groups" },
    { id: "members", label: "Members" },
    { id: "operations", label: "Operations" },
    { id: "utk", label: "UTK" },
    { id: "profile", label: "Profile" },
  ];
  if (isStaff(me.role)) {
    tabs.push({
      id: "intel",
      label: "Intelligence",
      badge: stats.data?.intelNew,
    });
  }
  if (isCommand(me.role)) tabs.push({ id: "command", label: "Command" });

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="h-14 border-b border-line bg-bg sticky top-0 z-30 flex items-center">
        <div className="w-full max-w-[1600px] mx-auto px-3 md:px-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 md:gap-8 min-w-0">
            <div className="font-black tracking-[0.18em] text-sm font-mono shrink-0">
              PATRIOTNET
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <Pulse />
              <span className="mark text-micro text-subtle">
                Encrypted & confidential
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-surface border border-line">
              <span className="size-1 rounded-full bg-ok" />
              <span className="mark text-micro text-muted">Secure session</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-surface border border-line px-3 h-11">
              <Avatar src={me.avatar} name={me.display_name} size="sm" />
              <span className="text-2xs font-mono">{me.username}</span>
              <span
                className={`text-micro px-1.5 py-0.5 font-mono ${roleChipClass(me.role)}`}
              >
                {ROLE_LABEL[me.role]}
              </span>
            </div>
            <button
              type="button"
              onClick={onWhistle}
              className="h-11 px-3 bg-accent text-paper mark text-micro hover:bg-accent-dim"
            >
              Whistleblow
            </button>
            {!gate ? (
              <button
                type="button"
                onClick={() => void signOut()}
                className="h-11 px-3 bg-elevated border border-strong mark text-micro hover:bg-strong"
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </header>

      <nav className="border-b border-line bg-bg sticky top-14 z-20 overflow-x-auto">
        <div className="max-w-[1600px] mx-auto px-3 md:px-5 flex items-center gap-1 h-12">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`h-11 px-3 mark text-2xs border whitespace-nowrap ${
                tab === t.id
                  ? "bg-paper text-ink border-paper"
                  : "bg-surface text-muted border-line hover:border-strong hover:text-fg"
              }`}
            >
              {t.label}
              {t.badge ? ` (${t.badge})` : ""}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-3 md:px-5 py-4 md:py-6">
        {tab === "home" ? <HomeView me={me} /> : null}
        {tab === "comms" ? (
          <CommsView me={me} initialRegion={roomRegion} />
        ) : null}
        {tab === "groups" ? (
          <GroupsView
            onOpenRoom={(region) => {
              setRoomRegion(region);
              setTab("comms");
            }}
          />
        ) : null}
        {tab === "members" ? (
          <MembersView
            onOpenRegion={(region) => {
              setRoomRegion(region);
              setTab("groups");
            }}
          />
        ) : null}
        {tab === "operations" ? <OperationsView me={me} /> : null}
        {tab === "utk" ? <UtkView me={me} /> : null}
        {tab === "profile" ? <ProfileView me={me} onUpdated={onProfile} /> : null}
        {tab === "intel" ? <IntelView me={me} /> : null}
        {tab === "command" ? <CommandView me={me} /> : null}

        <footer className="mt-10 border-t border-line py-6 flex flex-wrap gap-4 justify-between mark text-micro text-faint">
          <span>PatriotNet — encrypted — confidential handling — UK law applies</span>
          <span className="flex gap-4">
            <span>Secure</span>
            <span>·</span>
            <span>Lawful</span>
            <span>·</span>
            <span>Confidential</span>
          </span>
        </footer>
      </main>
    </div>
  );
}
