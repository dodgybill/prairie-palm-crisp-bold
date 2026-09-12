import type { ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Mark({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("mark", className)}>{children}</span>;
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <label className="mark text-micro text-subtle block mb-1">{children}</label>
  );
}

export function Pulse() {
  return (
    <span className="inline-block size-1.5 rounded-full bg-accent animate-pulse" />
  );
}

export function Modal({
  open,
  onClose,
  title,
  accent,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  accent?: boolean;
  children: ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-ink/80 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className={cn(
          "w-full bg-surface border border-line max-h-[92vh] overflow-auto",
          wide ? "max-w-xl" : "max-w-md",
          accent && "border-accent/30",
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-5 border-b border-line flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {accent ? <Pulse /> : null}
            <h2 className="mark text-xs text-fg truncate">{title}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="size-11 grid place-items-center text-subtle hover:text-fg"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export function Btn({
  children,
  onClick,
  type = "button",
  variant = "ghost",
  className,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "ghost" | "paper" | "accent" | "ink";
  className?: string;
  disabled?: boolean;
}) {
  const styles = {
    ghost:
      "bg-elevated border border-strong text-fg hover:bg-strong disabled:opacity-50",
    paper: "bg-paper text-ink hover:bg-fg disabled:opacity-50",
    accent: "bg-accent text-paper hover:bg-accent-dim disabled:opacity-50",
    ink: "bg-surface border border-line text-fg hover:bg-elevated disabled:opacity-50",
  } as const;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-11 px-5 mark text-2xs font-semibold transition-colors duration-150",
        styles[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Chip({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-8 px-2.5 mark text-micro border whitespace-nowrap transition-colors",
        active
          ? "bg-paper text-ink border-paper"
          : "bg-bg text-subtle border-line hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

export function Avatar({
  src,
  name,
  size = "md",
}: {
  src?: string | null;
  name: string;
  size?: "sm" | "md" | "lg";
}) {
  const dim = size === "lg" ? "size-24 text-xl" : size === "sm" ? "size-7 text-micro" : "size-10 text-2xs";
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase() || "PN";
  if (src) {
    return (
      <img
        src={src}
        alt=""
        className={cn(dim, "rounded-full object-cover shrink-0 outline outline-1 -outline-offset-1 outline-white/10")}
      />
    );
  }
  return (
    <div
      className={cn(
        dim,
        "rounded-full bg-elevated border border-strong grid place-items-center font-mono shrink-0",
      )}
    >
      {initials}
    </div>
  );
}

export function Screen({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg text-fg flex items-center justify-center p-6">
      <div className="mark text-sm text-muted">{children}</div>
    </div>
  );
}
