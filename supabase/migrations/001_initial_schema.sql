-- =============================================================================
-- TamuKita — Initial Schema
-- Run this in the Supabase SQL Editor or via CLI:
--   supabase db push
-- =============================================================================

-- ── Extensions ────────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── Enums ─────────────────────────────────────────────────────────────────────
create type plan_type as enum ('free', 'starter', 'professional', 'enterprise');
create type rsvp_status as enum ('pending', 'attending', 'not_attending', 'maybe');

-- ── profiles ──────────────────────────────────────────────────────────────────
-- One row per auth.users entry. Created automatically via trigger.
create table if not exists public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  email        text not null,
  full_name    text,
  avatar_url   text,
  plan         plan_type not null default 'free'
);

comment on table public.profiles is
  'Extended user profile, linked 1-to-1 with auth.users.';

-- ── weddings ──────────────────────────────────────────────────────────────────
create table if not exists public.weddings (
  id           uuid primary key default uuid_generate_v4(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  user_id      uuid not null references public.profiles(id) on delete cascade,
  bride_name   text not null,
  groom_name   text not null,
  wedding_date date not null,
  venue        text,
  theme_id     text,
  slug         text not null unique,
  is_published boolean not null default false
);

comment on table public.weddings is
  'Each row represents one wedding event created by a user.';

create index if not exists weddings_user_id_idx on public.weddings(user_id);
create index if not exists weddings_slug_idx     on public.weddings(slug);

-- ── guests ────────────────────────────────────────────────────────────────────
create table if not exists public.guests (
  id           uuid primary key default uuid_generate_v4(),
  created_at   timestamptz not null default now(),
  wedding_id   uuid not null references public.weddings(id) on delete cascade,
  name         text not null,
  email        text,
  phone        text,
  rsvp_status  rsvp_status not null default 'pending',
  seat_number  text,
  notes        text
);

comment on table public.guests is
  'Guest list entries scoped to a specific wedding.';

create index if not exists guests_wedding_id_idx on public.guests(wedding_id);

-- ── updated_at trigger ────────────────────────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger weddings_updated_at
  before update on public.weddings
  for each row execute function public.handle_updated_at();

-- ── Auto-create profile on sign-up ────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', null)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
