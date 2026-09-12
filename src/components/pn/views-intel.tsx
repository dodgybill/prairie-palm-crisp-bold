import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { listCaseLog, listCases, listMembers, updateCase } from "@/lib/pn/api";
import { gbDate, relativeTime } from "@/lib/pn/format";
import { CASE_STATUSES, type CaseItem, type CaseStatus, type Profile } from "@/lib/pn/types";
import { isStaff } from "@/lib/pn/roles";
import { Btn, Label } from "./ui";

export function IntelView({ me }: { me: Profile }) {
  const qc = useQueryClient();
  const cases = useQuery({
    queryKey: ["cases"],
    queryFn: () => listCases(),
    enabled: isStaff(me.role),
  });
  const members = useQuery({
    queryKey: ["members"],
    queryFn: () => listMembers(),
    enabled: isStaff(me.role),
  });
  const [openId, setOpenId] = useState<number | null>(null);
  const [note, setNote] = useState("");

  const log = useQuery({
    queryKey: ["case-log", openId],
    queryFn: () => listCaseLog({ data: { caseId: openId! } }),
    enabled: openId != null,
  });

  const patch = useMutation({
    mutationFn: (payload: {
      id: number;
      status?: CaseStatus;
      assigned_to?: string | null;
      note?: string;
    }) => updateCase({ data: payload }),
    onSuccess: () => {
      setNote("");
      void qc.invalidateQueries({ queryKey: ["cases"] });
      void qc.invalidateQueries({ queryKey: ["case-log"] });
      void qc.invalidateQueries({ queryKey: ["stats"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!isStaff(me.role)) {
    return (
      <div className="bg-bg border border-accent/30 p-8 text-center mark text-2xs text-accent">
        Restricted — admin+ only
      </div>
    );
  }

  return (
    <div>
      <div className="bg-accent-10 border border-accent/30 p-4 mb-4">
        <div className="mark text-xs text-accent">
          Intelligence — restricted — admin+ — handle with sensitivity
        </div>
        <p className="mt-2 text-2xs font-mono leading-relaxed text-warn-fg">
          Do not disclose a source without explicit consent. Assign only to trusted
          handlers. Verify independently. Investigation log is timestamped.
        </p>
      </div>
      <div className="grid gap-px bg-line border border-line">
        {(cases.data ?? []).map((c) => (
          <CaseRow
            key={c.id}
            c={c}
            members={members.data ?? []}
            open={openId === c.id}
            onToggle={() => setOpenId(openId === c.id ? null : c.id)}
            log={openId === c.id ? (log.data ?? []) : []}
            note={openId === c.id ? note : ""}
            setNote={setNote}
            busy={patch.isPending}
            onPatch={(p) => patch.mutate({ id: c.id, ...p })}
          />
        ))}
        {(cases.data ?? []).length === 0 ? (
          <div className="bg-bg p-8 text-center mark text-2xs text-faint">
            No intake
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CaseRow({
  c,
  members,
  open,
  onToggle,
  log,
  note,
  setNote,
  busy,
  onPatch,
}: {
  c: CaseItem;
  members: Profile[];
  open: boolean;
  onToggle: () => void;
  log: { id: number; action: string; note: string; actor_name: string; created_at: string }[];
  note: string;
  setNote: (v: string) => void;
  busy: boolean;
  onPatch: (p: { status?: CaseStatus; assigned_to?: string | null; note?: string }) => void;
}) {
  return (
    <div className="bg-bg p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xs font-mono font-semibold text-fg">{c.title}</span>
            <StatusChip status={c.status} />
            {c.file_name ? (
              <span className="text-micro font-mono px-1.5 py-0.5 bg-elevated border border-strong text-subtle">
                File
              </span>
            ) : null}
            <span className="text-micro font-mono text-faint">
              {relativeTime(c.created_at)}
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted">{c.details}</p>
          <div className="mt-2 text-micro font-mono text-faint">
            Contact: {c.contact || "ANONYMOUS"} — ID: {c.id}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch gap-2 shrink-0">
          <select
            value={c.assigned_to || ""}
            onChange={(e) =>
              onPatch({
                assigned_to: e.target.value || null,
                status: e.target.value ? "assigned" : c.status,
              })
            }
            className="field h-11 text-micro font-mono w-44"
          >
            <option value="">Assign to…</option>
            {members.map((m) => (
              <option key={m.user_id} value={m.user_id}>
                {m.username} — {m.role}
              </option>
            ))}
          </select>
          <select
            value={c.status}
            onChange={(e) => onPatch({ status: e.target.value as CaseStatus })}
            className="field h-11 text-micro font-mono w-44"
          >
            {CASE_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replaceAll("_", " ")}
              </option>
            ))}
          </select>
          <Btn variant="ink" onClick={onToggle}>
            {open ? "Hide log" : "Investigation log"}
          </Btn>
        </div>
      </div>
      {c.file_name && c.file_data ? (
        <a
          href={c.file_data}
          download={c.file_name}
          className="mt-2 inline-block text-micro font-mono text-subtle underline hover:text-fg"
        >
          Download {c.file_name}
        </a>
      ) : null}
      {open ? (
        <div className="mt-4 border border-line bg-surface p-3">
          <div className="mark text-micro text-subtle mb-3">Timestamped log</div>
          <div className="space-y-2">
            {log.map((e) => (
              <div key={e.id} className="text-2xs font-mono text-muted border-b border-line pb-2">
                <span className="text-faint">{gbDate(e.created_at)}</span>
                {"  "}
                <span className="text-accent">{e.action}</span>
                {"  "}
                <span>{e.actor_name}</span>
                {e.note ? <div className="mt-1 text-subtle">{e.note}</div> : null}
              </div>
            ))}
            {log.length === 0 ? (
              <div className="text-micro font-mono text-faint">No entries</div>
            ) : null}
          </div>
          <div className="mt-3">
            <Label>Add log note</Label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="area min-h-16"
              placeholder="Action taken…"
            />
            <Btn
              variant="paper"
              className="mt-2"
              disabled={!note.trim() || busy}
              onClick={() => onPatch({ note: note.trim() })}
            >
              Append to log
            </Btn>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StatusChip({ status }: { status: string }) {
  const cls =
    status === "new"
      ? "bg-accent text-paper border-accent"
      : status === "under_investigation"
        ? "bg-elevated text-fg border-strong"
        : status === "assigned"
          ? "bg-surface text-muted border-strong"
          : "bg-bg text-faint border-line";
  return (
    <span className={`text-micro font-mono px-2 py-0.5 border tracking-widest ${cls}`}>
      {status.replaceAll("_", " ").toUpperCase()}
    </span>
  );
}
