export const ROLES = [
  "owner",
  "senior_admin",
  "admin",
  "moderator",
  "member",
] as const;
export type Role = (typeof ROLES)[number];

export const PROFILE_STATUSES = [
  "pending",
  "active",
  "banned",
  "muted",
  "rejected",
] as const;
export type ProfileStatus = (typeof PROFILE_STATUSES)[number];

export type Profile = {
  user_id: string;
  username: string;
  display_name: string;
  role: Role;
  status: ProfileStatus;
  region: string;
  bio: string;
  contact: string;
  social_x: string;
  social_telegram: string;
  avatar: string | null;
  warnings: number;
  created_at: string;
};

export const NEWS_CATEGORIES = [
  "Crossings",
  "Accommodation",
  "Crime",
  "Statistics",
  "Government",
  "Extremism",
] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsItem = {
  id: number;
  title: string;
  category: string;
  source: string;
  summary: string;
  published_at: string;
  author_id: string | null;
};

export type Room = {
  id: number;
  title: string;
  region: string;
  created_at: string;
};

export type ChatMessage = {
  id: number;
  room_id: number;
  user_id: string;
  username: string;
  content_enc: string;
  created_at: string;
};

export const EVENT_TYPES = [
  "Community meeting",
  "Lawful protest",
  "Counter SUTR",
  "Counter Islamist extremism",
] as const;
export type EventType = (typeof EVENT_TYPES)[number];

export type OpEvent = {
  id: number;
  event_date: string;
  type: string;
  location: string;
  description: string;
  status: string;
  created_at: string;
};

export const FEED_SOURCES = ["Urban Scoop", "UTK", "Independent"] as const;
export type FeedSource = (typeof FEED_SOURCES)[number];

export type FeedItem = {
  id: number;
  source: string;
  title: string;
  excerpt: string;
  url: string;
  published_at: string;
};

export const CASE_STATUSES = [
  "new",
  "under_investigation",
  "assigned",
  "closed",
] as const;
export type CaseStatus = (typeof CASE_STATUSES)[number];

export type CaseItem = {
  id: number;
  title: string;
  details: string;
  contact: string;
  file_name: string;
  file_data: string | null;
  status: CaseStatus;
  assigned_to: string | null;
  submitter_id: string | null;
  created_at: string;
};

export type CaseLogEntry = {
  id: number;
  case_id: number;
  actor_id: string;
  actor_name: string;
  action: string;
  note: string;
  created_at: string;
};

export type Application = {
  id: number;
  user_id: string;
  name: string;
  contact: string;
  location: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export type DeskTab =
  | "home"
  | "comms"
  | "groups"
  | "members"
  | "operations"
  | "utk"
  | "profile"
  | "intel"
  | "command";
