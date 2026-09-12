import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  commandUser,
  createRoom,
  decideApplication,
  deleteRoom,
  listAllProfiles,
  listApplications,
  listRooms,
  networkStats,
} from "@/lib/pn/api";
import { gbDate, relativeTime } from "@/lib/pn/format";
import { ROLE_LABEL, isCommand } from "@/lib/pn/roles";
import { ROLES, type Application, type Profile, type Role } from "@/lib/pn/types";
import { Btn } from "./ui";

export function CommandView({ me }: { me: Profile }) {
  const qc = useQueryClient();
  const apps = useQuery({
    queryKey: ["applications"],
    queryFn: () => listApplications(),
    enabled: isCommand(me.role),
  });
  const profiles = useQuery({
    queryKey: ["all-profiles"],
    queryFn: () => listAllProfiles(),
    enabled: isCommand(me.role),
  });
  const rooms = useQuery({ queryKey: ["rooms"], queryFn: () => listRooms() });
  const stats = useQuery({ queryKey: ["stats"], queryFn: () => networkStats() });
  const [history, setHistory] = useState(false);
  const [newRoom, setNewRoom] = useState("");

  const decide = useMutation({
    mutationFn: (p: { id: number; status: "approved" | "rejected" }) =>
      decideApplication({ data: p }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["applications"] });
      void qc.invalidateQueries({ queryKey: ["all-profiles"] });
      void qc.invalidateQueries({ queryKey: ["members"] });
      void qc.invalidateQueries({ queryKey: ["stats"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const act = useMutation({
    mutationFn: (p: { userId: string; action: "role" | "ban" | "warn" | "mute" | "unmute"; value?: string }) =>
      commandUser({ data: p }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["all-profiles"] });
      void qc.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!isCommand(me.role)) {
    return (
      <div className="bg-bg border border-accent/30 p-8 text-center mark text-2xs text-accent">
        Restricted — senior admin+ / owner only
      </div>
    );
  }

  const pending = (apps.data ?? []).filter((a) => a.status === "pending");
  const done = (apps.data ?? []).filter((a) => a.status !== "pending");

  return (
    <div className="space-y-4">
      <div className="bg-surface border border-line p-4">
        <div className="mark text-xs">Command panel — senior admin+</div>
        <div className="text-2xs font-mono text-subtle mt-1">
          Join requests, roles, sanctions, room management.
        </div>
      </div>

      <div className="bg-bg border border-accent/30">
        <div className="p-4 border-b border-line flex flex-wrap items-center justify-between gap-3 bg-surface">
          <div className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            <div className="mark text-xs">Join requests — pending approval</div>
            <span className="text-micro font-mono px-2 py-0.5 bg-accent text-paper tracking-widest">
              {pending.length} pending
            </span>
          </div>
          <Btn
            variant="ghost"
            className="h-8 px-3"
            onClick={() => void apps.refetch()}
          >
            Refresh
          </Btn>
        </div>
        <div className="p-3">
          {pending.length === 0 ? (
            <div className="p-6 text-center border border-dashed border-line">
              <div className="mark text-2xs text-faint">No pending applications</div>
            </div>
          ) : (
            <div className="grid gap-px bg-line border border-line">
              {pending.map((a) => (
                <AppRow
                  key={a.id}
                  a={a}
                  busy={decide.isPending}
                  onDecide={(status) => decide.mutate({ id: a.id, status })}
                />
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-line">
          <button
            type="button"
            onClick={() => setHistory((h) => !h)}
            className="w-full p-3 flex items-center justify-between hover:bg-surface min-h-11"
          >
            <span className="mark text-micro text-subtle">
              History — {done.length} items
            </span>
            <span className="mark text-micro text-faint">
              {history ? "Collapse" : "Expand"}
            </span>
          </button>
          {history ? (
            <div className="p-3 pt-0">
              {done.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-wrap items-center justify-between gap-2 bg-surface p-3 border border-line mb-px"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`text-micro font-mono px-2 py-0.5 tracking-widest border ${
                        a.status === "approved"
                          ? "bg-ok-bg border-ok-border text-ok-fg"
                          : "bg-warn-bg border-warn-border text-warn-fg"
                      }`}
                    >
                      {a.status.toUpperCase()}
                    </span>
                    <span className="text-2xs font-mono text-fg truncate">{a.name}</span>
                    <span className="text-micro font-mono text-faint">{a.location}</span>
                  </div>
                  <span className="text-micro font-mono text-faint">
                    {gbDate(a.created_at)}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-px bg-line border border-line">
        <Stat label="Total members" value={stats.data?.members ?? 0} />
        <Stat label="Active rooms" value={stats.data?.rooms ?? 0} />
        <Stat
          label="Intel new"
          value={stats.data?.intelNew ?? 0}
          accent
        />
      </div>

      <div className="bg-bg border border-line overflow-x-auto">
        <div className="min-w-[900px]">
          <div className="grid grid-cols-[160px_140px_100px_80px_1fr] gap-px bg-line border-b border-line p-px">
            {["Username", "Role", "Status", "Warn", "Actions"].map((h) => (
              <div key={h} className="bg-surface p-2.5 mark text-micro text-subtle">
                {h}
              </div>
            ))}
          </div>
          {(profiles.data ?? []).map((p) => (
            <div
              key={p.user_id}
              className="grid grid-cols-[160px_140px_100px_80px_1fr] gap-px bg-line p-px"
            >
              <div className="bg-bg p-2.5">
                <div className="text-2xs font-mono text-fg">{p.username}</div>
                <div className="text-micro font-mono text-faint truncate">
                  {p.display_name}
                </div>
              </div>
              <div className="bg-bg p-2.5">
                <select
                  value={p.role}
                  onChange={(e) =>
                    act.mutate({
                      userId: p.user_id,
                      action: "role",
                      value: e.target.value,
                    })
                  }
                  className="field h-8 text-micro font-mono"
                >
                  {ROLES.filter((r) => r !== "owner" || me.role === "owner").map(
                    (r) => (
                      <option key={r} value={r}>
                        {ROLE_LABEL[r as Role]}
                      </option>
                    ),
                  )}
                </select>
              </div>
              <div className="bg-bg p-2.5 text-micro font-mono text-muted">
                {p.status}
              </div>
              <div className="bg-bg p-2.5 text-micro font-mono text-muted tabular-nums">
                {p.warnings}
              </div>
              <div className="bg-bg p-2.5 flex flex-wrap gap-1">
                <Mini
                  onClick={() => act.mutate({ userId: p.user_id, action: "ban" })}
                >
                  {p.status === "banned" ? "Unban" : "Ban"}
                </Mini>
                <Mini
                  onClick={() => act.mutate({ userId: p.user_id, action: "warn" })}
                >
                  Warn
                </Mini>
                <Mini
                  onClick={() =>
                    act.mutate({
                      userId: p.user_id,
                      action: p.status === "muted" ? "unmute" : "mute",
                    })
                  }
                >
                  {p.status === "muted" ? "Unmute" : "Mute"}
                </Mini>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-bg border border-line p-4">
        <div className="mark text-2xs text-subtle mb-3">Room management</div>
        <div className="flex gap-2 mb-3">
          <input
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            placeholder="NEW ROOM TITLE"
            className="field h-11 flex-1 font-mono"
          />
          <Btn
            variant="paper"
            disabled={!newRoom.trim()}
            onClick={() => {
              void createRoom({ data: { title: newRoom } }).then(() => {
                setNewRoom("");
                void qc.invalidateQueries({ queryKey: ["rooms"] });
                void qc.invalidateQueries({ queryKey: ["stats"] });
              });
            }}
          >
            Create
          </Btn>
        </div>
        <div className="space-y-1 max-h-40 overflow-auto">
          {(rooms.data ?? []).map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between bg-surface border border-line p-2 min-h-11"
            >
              <span className="text-2xs font-mono text-muted">
                {r.title}
                {r.region ? ` — ${r.region}` : ""}
              </span>
              <button
                type="button"
                className="mark text-micro text-faint hover:text-accent px-3 h-11"
                onClick={() => {
                  if (!window.confirm("Delete room?")) return;
                  void deleteRoom({ data: { id: r.id } }).then(() => {
                    void qc.invalidateQueries({ queryKey: ["rooms"] });
                    void qc.invalidateQueries({ queryKey: ["stats"] });
                  });
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AppRow({
  a,
  busy,
  onDecide,
}: {
  a: Application;
  busy: boolean;
  onDecide: (s: "approved" | "rejected") => void;
}) {
  return (
    <div className="bg-surface p-4">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-semibold text-fg">{a.name}</span>
            <span className="text-micro font-mono px-2 py-0.5 bg-accent/20 border border-accent/30 text-warn-fg tracking-widest">
              Pending
            </span>
            <span className="text-micro font-mono text-faint">
              {gbDate(a.created_at)} — {relativeTime(a.created_at)}
            </span>
          </div>
          <div className="mt-3 grid md:grid-cols-2 gap-3 text-2xs font-mono">
            <div className="space-y-1">
              <div className="flex gap-2">
                <span className="w-20 text-faint">Contact</span>
                <span className="text-muted break-all">{a.contact}</span>
              </div>
              <div className="flex gap-2">
                <span className="w-20 text-faint">Location</span>
                <span className="text-muted">{a.location}</span>
              </div>
            </div>
            <div className="bg-bg border border-line p-2.5">
              <div className="mark text-micro text-faint mb-1">Reason</div>
              <div className="text-2xs leading-relaxed text-muted">{a.reason}</div>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-col gap-2 shrink-0">
          <Btn
            variant="paper"
            disabled={busy}
            onClick={() => onDecide("approved")}
          >
            Approve
          </Btn>
          <Btn variant="ghost" disabled={busy} onClick={() => onDecide("rejected")}>
            Reject
          </Btn>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="bg-bg p-4">
      <div className="mark text-micro text-faint">{label}</div>
      <div
        className={`mt-1 text-xl font-mono font-semibold tabular-nums ${accent ? "text-accent" : "text-fg"}`}
      >
        {value}
      </div>
    </div>
  );
}

function Mini({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-8 px-2 bg-elevated border border-strong mark text-micro hover:bg-strong"
    >
      {children}
    </button>
  );
}
