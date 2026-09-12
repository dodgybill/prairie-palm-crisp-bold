import type { Profile, ProfileStatus, Role } from "./types";

const RANK: Record<Role, number> = {
  member: 1,
  moderator: 2,
  admin: 3,
  senior_admin: 4,
  owner: 5,
};

export const ROLE_LABEL: Record<Role, string> = {
  owner: "OWNER",
  senior_admin: "SENIOR ADMIN",
  admin: "ADMIN",
  moderator: "MODERATOR",
  member: "MEMBER",
};

export function rank(role: Role): number {
  return RANK[role] ?? 0;
}

export function isStaff(role: Role): boolean {
  return rank(role) >= 3;
}

export function isCommand(role: Role): boolean {
  return rank(role) >= 4;
}

export function isModerator(role: Role): boolean {
  return rank(role) >= 2;
}

export function canAccessDesk(status: ProfileStatus): boolean {
  return status === "active" || status === "muted";
}

export function canChat(profile: Profile): boolean {
  return profile.status === "active";
}

export function roleChipClass(role: Role): string {
  switch (role) {
    case "owner":
      return "bg-accent text-paper";
    case "senior_admin":
      return "bg-accent/20 text-accent border border-accent/30";
    case "admin":
      return "bg-elevated text-fg border border-strong";
    case "moderator":
      return "bg-surface text-muted border border-line";
    default:
      return "bg-bg text-subtle border border-line";
  }
}

export function slugify(input: string): string {
  const s = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 24);
  return s || "operator";
}
