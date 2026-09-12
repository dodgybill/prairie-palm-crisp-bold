import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addEvent, addFeed, listEvents, listFeeds } from "@/lib/pn/api";
import { gbDate, relativeTime } from "@/lib/pn/format";
import { isStaff } from "@/lib/pn/roles";
import { EVENT_TYPES, FEED_SOURCES, type Profile } from "@/lib/pn/types";
import { Btn, Chip } from "./ui";

export function OperationsView({ me }: { me: Profile }) {
  const qc = useQueryClient();
  const events = useQuery({ queryKey: ["events"], queryFn: () => listEvents() });
  const [filter, setFilter] = useState("All");
  const [type, setType] = useState<(typeof EVENT_TYPES)[number]>("Community meeting");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("reported");

  const upcoming = useMemo(() => {
    const now = Date.now();
    return (events.data ?? []).filter((e) => {
      const t = new Date(e.event_date).getTime();
      const future = t >= now;
      const match = filter === "All" || e.type === filter;
      return future && match;
    });
  }, [events.data, filter]);

  const add = useMutation({
    mutationFn: () =>
      addEvent({
        data: {
          event_date: date ? new Date(date).toISOString() : new Date(Date.now() + 86400000).toISOString(),
          type,
          location,
          description,
          status,
        },
      }),
    onSuccess: () => {
      setLocation("");
      setDescription("");
      void qc.invalidateQueries({ queryKey: ["events"] });
      toast.success("Operation added");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="grid lg:grid-cols-[1.6fr_0.6fr] gap-4">
      <div className="bg-surface border border-line p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="mark text-xs">Known operations — lawful & peaceful</div>
            <div className="text-2xs font-mono text-subtle mt-1">
              Future only from current time. {upcoming.length} events
            </div>
          </div>
          <div className="flex gap-1 flex-wrap">
            {["All", ...EVENT_TYPES].map((t) => (
              <Chip key={t} active={filter === t} onClick={() => setFilter(t)}>
                {t}
              </Chip>
            ))}
          </div>
        </div>
        <div className="bg-accent-10 border border-accent/20 p-3 mb-4 text-2xs font-mono leading-relaxed text-warn-fg">
          All activity must remain within UK law. No incitement. Public assemblies
          are subject to police conditions under S12/S14 Public Order Act. Maintain
          peaceful conduct. Document, do not disrupt.
        </div>
        <div className="grid gap-px bg-line border border-line">
          {upcoming.map((e) => (
            <div key={e.id} className="bg-bg p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-micro font-mono px-2 py-0.5 bg-elevated border border-strong text-muted tracking-widest">
                  {e.type.toUpperCase()}
                </span>
                <span
                  className={`text-micro font-mono px-2 py-0.5 border tracking-widest ${
                    e.status === "confirmed"
                      ? "bg-accent/20 border-accent/30 text-accent"
                      : "bg-elevated border-strong text-muted"
                  }`}
                >
                  {e.status.toUpperCase()}
                </span>
                <span className="text-micro font-mono text-faint">
                  {gbDate(e.event_date)} — {relativeTime(e.event_date)}
                </span>
              </div>
              <div className="mt-2 text-sm font-semibold text-fg">{e.location}</div>
              <p className="mt-1 text-xs leading-relaxed text-muted">{e.description}</p>
            </div>
          ))}
          {upcoming.length === 0 ? (
            <div className="bg-bg p-8 text-center mark text-2xs text-faint">
              No future events
            </div>
          ) : null}
        </div>
      </div>
      <div className="space-y-4">
        {isStaff(me.role) ? (
          <div className="bg-bg border border-line p-4">
            <div className="mark text-2xs text-subtle mb-3">Add event — admin+</div>
            <div className="space-y-2">
              <select
                value={type}
                onChange={(e) => setType(e.target.value as (typeof EVENT_TYPES)[number])}
                className="field h-8 text-2xs font-mono"
              >
                {EVENT_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="field h-8"
              />
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="field h-8"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description — lawful, factual"
                className="area min-h-16"
              />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="field h-8 text-2xs font-mono"
              >
                <option value="reported">reported</option>
                <option value="confirmed">confirmed</option>
                <option value="monitoring">monitoring</option>
              </select>
              <Btn
                variant="paper"
                className="w-full"
                disabled={!location || !description || add.isPending}
                onClick={() => add.mutate()}
              >
                Add operation
              </Btn>
            </div>
          </div>
        ) : null}
        <div className="bg-surface border border-line p-4">
          <div className="mark text-2xs text-subtle mb-2">Lawful conduct protocol</div>
          <div className="text-2xs leading-relaxed text-muted font-mono">
            Peaceful assembly only
            <br />
            No face coverings where S14 prohibits
            <br />
            Liaise with police where applicable
            <br />
            No entry to private property
            <br />
            Document, do not confront
            <br />
            Source protection applies to intel
          </div>
        </div>
      </div>
    </div>
  );
}

export function UtkView({ me }: { me: Profile }) {
  const qc = useQueryClient();
  const feeds = useQuery({ queryKey: ["feeds"], queryFn: () => listFeeds() });
  const [source, setSource] = useState<(typeof FEED_SOURCES)[number]>("Urban Scoop");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [url, setUrl] = useState("");

  const add = useMutation({
    mutationFn: () => addFeed({ data: { source, title, excerpt, url } }),
    onSuccess: () => {
      setTitle("");
      setExcerpt("");
      setUrl("");
      void qc.invalidateQueries({ queryKey: ["feeds"] });
      toast.success("Feed item added");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const urban = (feeds.data ?? []).filter((f) => f.source === "Urban Scoop");
  const utk = (feeds.data ?? []).filter((f) => f.source !== "Urban Scoop");

  return (
    <div>
      <div className="bg-surface border border-line p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="mark text-xs">UTK / Urban Scoop — external feeds</div>
          <div className="text-2xs font-mono text-subtle mt-1">
            External sources — verify independently. Not endorsed.
          </div>
        </div>
        <div className="mark text-micro text-faint">External — verify</div>
      </div>
      <div className="grid md:grid-cols-2 gap-px bg-line border border-line border-t-0">
        <FeedCol title="Urban Scoop feed" items={urban} />
        <FeedCol title="UTK / independent journalism" items={utk} />
      </div>
      {isStaff(me.role) ? (
        <div className="mt-4 bg-bg border border-line p-4 grid md:grid-cols-[1fr_1fr_auto] gap-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="field h-11"
          />
          <input
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Excerpt"
            className="field h-11"
          />
          <div className="flex gap-2">
            <select
              value={source}
              onChange={(e) =>
                setSource(e.target.value as (typeof FEED_SOURCES)[number])
              }
              className="field h-11 font-mono text-2xs"
            >
              {FEED_SOURCES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <Btn
              variant="paper"
              disabled={!title || !excerpt || add.isPending}
              onClick={() => add.mutate()}
            >
              Add
            </Btn>
          </div>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL (optional)"
            className="field h-11 md:col-span-3"
          />
        </div>
      ) : null}
    </div>
  );
}

function FeedCol({
  title,
  items,
}: {
  title: string;
  items: { id: number; title: string; excerpt: string; source: string; url: string; published_at: string }[];
}) {
  return (
    <div className="bg-bg p-4">
      <div className="mark text-2xs text-subtle mb-3">{title}</div>
      <div className="space-y-3">
        {items.map((o) => (
          <article key={o.id} className="border border-line bg-surface p-3">
            <div className="flex items-center gap-2 text-micro font-mono text-faint">
              <span>{relativeTime(o.published_at)}</span>
              <span>·</span>
              <span>{o.source}</span>
            </div>
            <h3 className="mt-1 text-sm font-semibold text-fg leading-snug">{o.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted">{o.excerpt}</p>
            {o.url && o.url !== "#" ? (
              <a
                href={o.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-micro font-mono text-subtle hover:text-fg underline"
              >
                External link
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
