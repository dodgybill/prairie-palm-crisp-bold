import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addNews, listNews } from "@/lib/pn/api";
import { relativeTime, gbDate } from "@/lib/pn/format";
import { isStaff } from "@/lib/pn/roles";
import { NEWS_CATEGORIES, type Profile } from "@/lib/pn/types";
import { Btn, Chip, Label } from "./ui";

const WINDOW_MS = 128 * 3600 * 1000;

export function HomeView({ me }: { me: Profile }) {
  const qc = useQueryClient();
  const news = useQuery({ queryKey: ["news"], queryFn: () => listNews() });
  const [filter, setFilter] = useState("All");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<(typeof NEWS_CATEGORIES)[number]>(
    "Crossings",
  );
  const [source, setSource] = useState("");
  const [summary, setSummary] = useState("");

  const items = useMemo(() => {
    const now = Date.now();
    return (news.data ?? []).filter((n) => {
      const t = new Date(n.published_at).getTime();
      const inWindow = t >= now - WINDOW_MS && t <= now + WINDOW_MS;
      const cat = filter === "All" || n.category === filter;
      return inWindow && cat;
    });
  }, [news.data, filter]);

  const publish = useMutation({
    mutationFn: () =>
      addNews({
        data: {
          title,
          category,
          source: source || "PatriotNet OSINT",
          summary,
        },
      }),
    onSuccess: () => {
      setTitle("");
      setSource("");
      setSummary("");
      void qc.invalidateQueries({ queryKey: ["news"] });
      toast.success("Item published");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="grid lg:grid-cols-[1.6fr_0.6fr] gap-4">
      <div className="bg-surface border border-line p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="mark text-xs">Home — news desk — 128h window</div>
            <div className="text-2xs font-mono text-subtle mt-1">
              {gbDate(new Date().toISOString())} — {items.length} items
            </div>
          </div>
          <div className="flex gap-1 flex-wrap">
            {["All", ...NEWS_CATEGORIES].map((c) => (
              <Chip key={c} active={filter === c} onClick={() => setFilter(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </div>
        <div className="grid gap-px bg-line border border-line">
          {items.map((n) => (
            <article key={n.id} className="bg-bg p-4 hover:bg-panel transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-micro font-mono px-2 py-0.5 bg-elevated border border-strong text-muted tracking-widest">
                    {n.category.toUpperCase()}
                  </span>
                  <span className="text-micro font-mono text-faint">
                    {relativeTime(n.published_at)} — {n.source}
                  </span>
                </div>
                <span className="text-micro font-mono text-dim">
                  {gbDate(n.published_at)}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-semibold leading-snug text-fg">
                {n.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{n.summary}</p>
            </article>
          ))}
          {items.length === 0 ? (
            <div className="bg-bg p-8 text-center mark text-2xs text-faint">
              No items in the 128h window for this filter
            </div>
          ) : null}
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-surface border border-line p-4">
          <div className="mark text-2xs text-subtle mb-3">Operational notes</div>
          <div className="space-y-3 text-2xs leading-relaxed text-muted font-mono">
            <div>All items factual, source-attributed. No editorialising.</div>
            <div>FOI / planning data needs independent verification.</div>
            <div>Window: now ±128h. Refresh re-evaluates the cut.</div>
            <div>Rooms: AES-GCM on device. Ciphertext on the desk.</div>
          </div>
        </div>
        {isStaff(me.role) ? (
          <div className="bg-bg border border-accent/30 p-4">
            <div className="mark text-2xs text-accent mb-3">Add news — admin+</div>
            <div className="space-y-2">
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as (typeof NEWS_CATEGORIES)[number])
                }
                className="field h-8 text-2xs font-mono"
              >
                {NEWS_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title — factual, neutral"
                className="field h-8"
              />
              <input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Source — e.g. Home Office"
                className="field h-8"
              />
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Summary — factual only"
                className="area min-h-16"
              />
              <Btn
                variant="paper"
                className="w-full"
                disabled={publish.isPending || !title || !summary}
                onClick={() => publish.mutate()}
              >
                Publish item
              </Btn>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
