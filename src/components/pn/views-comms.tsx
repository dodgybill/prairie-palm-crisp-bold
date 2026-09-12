import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import {
  createRoom,
  deleteRoom,
  listMessages,
  listRooms,
  renameRoom,
  sendMessage,
} from "@/lib/pn/api";
import { decryptText, encryptText } from "@/lib/pn/crypto";
import { relativeTime } from "@/lib/pn/format";
import { isStaff } from "@/lib/pn/roles";
import type { ChatMessage, Profile } from "@/lib/pn/types";
import { Avatar, Btn } from "./ui";

export function CommsView({
  me,
  initialRegion,
}: {
  me: Profile;
  initialRegion?: string;
}) {
  const qc = useQueryClient();
  const rooms = useQuery({ queryKey: ["rooms"], queryFn: () => listRooms() });
  const [roomId, setRoomId] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [showEnc, setShowEnc] = useState(false);
  const [renameId, setRenameId] = useState<number | null>(null);
  const [renameVal, setRenameVal] = useState("");
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rooms.data?.length) return;
    if (roomId && rooms.data.some((r) => r.id === roomId)) return;
    const match = initialRegion
      ? rooms.data.find((r) => r.region === initialRegion)
      : null;
    setRoomId(match?.id ?? rooms.data[0]!.id);
  }, [rooms.data, roomId, initialRegion]);

  const msgs = useQuery({
    queryKey: ["messages", roomId],
    queryFn: () => listMessages({ data: { roomId: roomId! } }),
    enabled: roomId != null,
    refetchInterval: 4000,
  });

  const [plain, setPlain] = useState<Record<number, string>>({});
  useEffect(() => {
    let cancelled = false;
    async function run() {
      const next: Record<number, string> = {};
      for (const m of msgs.data ?? []) {
        next[m.id] = await decryptText(m.room_id, m.content_enc);
      }
      if (!cancelled) setPlain(next);
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [msgs.data]);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [plain]);

  const active = useMemo(
    () => rooms.data?.find((r) => r.id === roomId),
    [rooms.data, roomId],
  );

  const send = useMutation({
    mutationFn: async () => {
      if (!roomId || !draft.trim()) return;
      const contentEnc = await encryptText(roomId, draft.trim());
      return sendMessage({ data: { roomId, contentEnc } });
    },
    onSuccess: () => {
      setDraft("");
      void qc.invalidateQueries({ queryKey: ["messages", roomId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function onNewRoom() {
    const title = window.prompt("New room title");
    if (!title) return;
    try {
      const room = await createRoom({ data: { title } });
      void qc.invalidateQueries({ queryKey: ["rooms"] });
      setRoomId(room.id);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  }

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-px bg-line border border-line min-h-[70vh]">
      <div className="bg-surface flex flex-col">
        <div className="p-3 border-b border-line flex items-center justify-between">
          <div className="mark text-2xs">Rooms — encrypted</div>
          {isStaff(me.role) ? (
            <button
              type="button"
              onClick={() => void onNewRoom()}
              className="mark text-micro text-subtle hover:text-fg h-11 px-2"
            >
              + New
            </button>
          ) : null}
        </div>
        <div className="p-2 space-y-1 flex-1 overflow-auto">
          {(rooms.data ?? []).map((r) => (
            <div
              key={r.id}
              className={`group flex items-center justify-between p-2.5 border cursor-pointer min-h-11 ${
                roomId === r.id
                  ? "bg-paper text-ink border-paper"
                  : "bg-bg border-line hover:border-strong text-muted"
              }`}
              onClick={() => setRoomId(r.id)}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Lock className="size-3 shrink-0" />
                <span className="mark text-2xs truncate">{r.title}</span>
              </div>
              {isStaff(me.role) ? (
                <div className="hidden group-hover:flex items-center">
                  <button
                    type="button"
                    className="text-micro px-2 h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      setRenameId(r.id);
                      setRenameVal(r.title);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-micro px-2 h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!window.confirm("Delete room?")) return;
                      void deleteRoom({ data: { id: r.id } }).then(() =>
                        qc.invalidateQueries({ queryKey: ["rooms"] }),
                      );
                    }}
                  >
                    ×
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        {renameId != null ? (
          <div className="p-2 border-t border-line bg-bg flex gap-1">
            <input
              value={renameVal}
              onChange={(e) => setRenameVal(e.target.value)}
              className="field h-8 flex-1 font-mono text-2xs"
            />
            <button
              type="button"
              className="h-8 px-2 bg-paper text-ink mark text-micro"
              onClick={() => {
                void renameRoom({ data: { id: renameId, title: renameVal } }).then(
                  () => {
                    setRenameId(null);
                    void qc.invalidateQueries({ queryKey: ["rooms"] });
                  },
                );
              }}
            >
              Save
            </button>
          </div>
        ) : null}
        <div className="p-3 border-t border-line bg-bg">
          <p className="text-micro font-mono text-faint leading-relaxed">
            Encrypted on device with AES-GCM. Server stores ciphertext only.
          </p>
          {isStaff(me.role) ? (
            <label className="flex items-center gap-2 mt-2 cursor-pointer min-h-11">
              <input
                type="checkbox"
                checked={showEnc}
                onChange={(e) => setShowEnc(e.target.checked)}
              />
              <span className="mark text-micro text-subtle">Show ciphertext</span>
            </label>
          ) : null}
        </div>
      </div>

      <div className="bg-bg flex flex-col min-h-[60vh]">
        <div className="p-3 border-b border-line bg-surface flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="mark text-xs truncate">{active?.title ?? "—"}</div>
            <span className="text-micro font-mono px-2 py-0.5 bg-accent/20 border border-accent/30 text-accent tracking-widest">
              E2E
            </span>
          </div>
          <div className="mark text-micro text-faint">
            {(msgs.data ?? []).length} messages
          </div>
        </div>
        <div className="flex-1 overflow-auto p-3 space-y-3">
          <div className="bg-surface border border-line p-2.5 text-micro font-mono text-subtle leading-relaxed">
            Encrypted channel. UK lawful conduct required. Factual, source-attributed
            posts only.
          </div>
          {(msgs.data ?? []).map((m: ChatMessage) => (
            <div key={m.id} className="flex gap-3">
              <Avatar name={m.username} size="sm" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-2xs font-mono font-semibold text-fg">
                    {m.username}
                  </span>
                  <span className="text-micro font-mono text-faint">
                    {relativeTime(m.created_at)}
                  </span>
                </div>
                <div className="mt-1 text-sm leading-relaxed text-muted bg-surface border border-line p-2.5">
                  {plain[m.id] ?? "…"}
                </div>
                {showEnc ? (
                  <div className="mt-1 text-micro font-mono text-dim break-all">
                    ENC: {m.content_enc}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
          <div ref={bottom} />
        </div>
        <div className="p-3 border-t border-line bg-surface flex gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") send.mutate();
            }}
            disabled={me.status !== "active"}
            placeholder={
              me.status === "active"
                ? "Type message — encrypted on send…"
                : "Muted — cannot send"
            }
            className="field flex-1 h-11"
          />
          <Btn
            variant="paper"
            disabled={me.status !== "active" || send.isPending}
            onClick={() => send.mutate()}
          >
            Send
          </Btn>
        </div>
      </div>
    </div>
  );
}
