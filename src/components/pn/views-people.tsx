import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listMembers, listRooms } from "@/lib/pn/api";
import { ROLE_LABEL, roleChipClass } from "@/lib/pn/roles";
import { UK_REGIONS } from "@/lib/pn/regions";
import type { Profile, Role } from "@/lib/pn/types";
import { Avatar } from "./ui";

export function MembersView({ onOpenRegion }: { onOpenRegion?: (r: string) => void }) {
  const members = useQuery({ queryKey: ["members"], queryFn: () => listMembers() });
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return (members.data ?? []).filter(
      (m) =>
        !s ||
        m.username.toLowerCase().includes(s) ||
        m.display_name.toLowerCase().includes(s) ||
        m.region.toLowerCase().includes(s),
    );
  }, [members.data, q]);

  return (
    <div>
      <div className="bg-surface border border-line p-4 flex flex-wrap gap-3 items-center justify-between">
        <div>
          <div className="mark text-xs">Member list — enrolled</div>
          <div className="text-2xs font-mono text-subtle mt-1">
            {filtered.length} members — role colour coded
          </div>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search username / region…"
          className="field h-11 w-full md:w-72"
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-line border border-line border-t-0">
        {filtered.map((m) => (
          <MemberCard key={m.user_id} m={m} onRegion={onOpenRegion} />
        ))}
      </div>
    </div>
  );
}

function MemberCard({
  m,
  onRegion,
}: {
  m: Profile;
  onRegion?: (r: string) => void;
}) {
  return (
    <div className="bg-bg p-4 hover:bg-panel transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex gap-3 min-w-0">
          <Avatar src={m.avatar} name={m.display_name} />
          <div className="min-w-0">
            <div className="text-sm font-semibold leading-tight text-fg truncate">
              {m.display_name}
            </div>
            <div className="text-2xs font-mono text-subtle">@{m.username}</div>
            <button
              type="button"
              className="text-micro font-mono text-faint mt-1 hover:text-fg"
              onClick={() => m.region && onRegion?.(m.region)}
            >
              {m.region || "Unassigned"} · {m.status}
            </button>
          </div>
        </div>
        <span
          className={`text-micro px-2 py-1 font-mono tracking-widest shrink-0 ${roleChipClass(m.role as Role)}`}
        >
          {ROLE_LABEL[m.role]}
        </span>
      </div>
      {m.bio ? (
        <p className="mt-3 text-2xs leading-relaxed text-muted line-clamp-3">{m.bio}</p>
      ) : null}
    </div>
  );
}

export function GroupsView({
  onOpenRoom,
}: {
  onOpenRoom: (region: string) => void;
}) {
  const members = useQuery({ queryKey: ["members"], queryFn: () => listMembers() });
  const rooms = useQuery({ queryKey: ["rooms"], queryFn: () => listRooms() });

  return (
    <div>
      <div className="bg-surface border border-line p-4 mb-px">
        <div className="mark text-xs">Regional groups — UK</div>
        <div className="text-2xs font-mono text-subtle mt-1">
          Members clustered by region. Open the matching encrypted room.
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line">
        {UK_REGIONS.map((region) => {
          const count = (members.data ?? []).filter((m) => m.region === region).length;
          const room = (rooms.data ?? []).find((r) => r.region === region);
          return (
            <div key={region} className="bg-bg p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-fg">{region}</div>
                  <div className="mark text-micro text-subtle mt-1 tabular-nums">
                    {count} members
                  </div>
                </div>
                {room ? (
                  <button
                    type="button"
                    onClick={() => onOpenRoom(region)}
                    className="h-11 px-3 bg-elevated border border-strong mark text-micro hover:bg-strong"
                  >
                    Open room
                  </button>
                ) : (
                  <span className="mark text-micro text-faint">No room</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

