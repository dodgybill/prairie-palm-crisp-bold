-- PatriotNet core schema
create table if not exists profiles (
  user_id text primary key,
  username text not null unique,
  display_name text not null,
  role text not null default 'member',
  status text not null default 'pending',
  region text not null default '',
  bio text not null default '',
  contact text not null default '',
  social_x text not null default '',
  social_telegram text not null default '',
  avatar text,
  warnings integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists applications (
  id serial primary key,
  user_id text not null,
  name text not null,
  contact text not null,
  location text not null,
  reason text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
create index if not exists applications_user_id_idx on applications (user_id);
create index if not exists applications_status_idx on applications (status);

create table if not exists news (
  id serial primary key,
  title text not null,
  category text not null,
  source text not null,
  summary text not null,
  published_at timestamptz not null default now(),
  author_id text
);
create index if not exists news_published_idx on news (published_at desc);

create table if not exists rooms (
  id serial primary key,
  title text not null,
  region text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id serial primary key,
  room_id integer not null references rooms(id) on delete cascade,
  user_id text not null,
  username text not null,
  content_enc text not null,
  created_at timestamptz not null default now()
);
create index if not exists messages_room_id_idx on messages (room_id);

create table if not exists events (
  id serial primary key,
  event_date timestamptz not null,
  type text not null,
  location text not null,
  description text not null,
  status text not null default 'reported',
  created_at timestamptz not null default now()
);
create index if not exists events_date_idx on events (event_date);

create table if not exists feeds (
  id serial primary key,
  source text not null,
  title text not null,
  excerpt text not null,
  url text not null default '#',
  published_at timestamptz not null default now()
);

create table if not exists cases (
  id serial primary key,
  title text not null,
  details text not null,
  contact text not null default '',
  file_name text not null default '',
  file_data text,
  status text not null default 'new',
  assigned_to text,
  submitter_id text,
  created_at timestamptz not null default now()
);
create index if not exists cases_status_idx on cases (status);

create table if not exists case_log (
  id serial primary key,
  case_id integer not null references cases(id) on delete cascade,
  actor_id text not null,
  actor_name text not null,
  action text not null,
  note text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists case_log_case_id_idx on case_log (case_id);
