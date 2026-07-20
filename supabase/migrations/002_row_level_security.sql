-- =============================================================================
-- TamuKita — Row Level Security Policies
-- Run AFTER 001_initial_schema.sql
-- =============================================================================

-- ── profiles ──────────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;

-- Users can only read their own profile
create policy "profiles: select own"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can only update their own profile
create policy "profiles: update own"
  on public.profiles for update
  using (auth.uid() = id);

-- Only the trigger function (security definer) can insert profiles
-- No direct INSERT policy needed for regular users

-- ── weddings ──────────────────────────────────────────────────────────────────
alter table public.weddings enable row level security;

-- Anyone can read published weddings (for the public invitation page)
create policy "weddings: select published"
  on public.weddings for select
  using (is_published = true);

-- Owners can read all their own weddings (including drafts)
create policy "weddings: select own"
  on public.weddings for select
  using (auth.uid() = user_id);

-- Owners can create weddings
create policy "weddings: insert own"
  on public.weddings for insert
  with check (auth.uid() = user_id);

-- Owners can update their own weddings
create policy "weddings: update own"
  on public.weddings for update
  using (auth.uid() = user_id);

-- Owners can delete their own weddings
create policy "weddings: delete own"
  on public.weddings for delete
  using (auth.uid() = user_id);

-- ── guests ────────────────────────────────────────────────────────────────────
alter table public.guests enable row level security;

-- Owners can read guests of their own weddings
create policy "guests: select own wedding"
  on public.guests for select
  using (
    exists (
      select 1 from public.weddings w
      where w.id = guests.wedding_id
        and w.user_id = auth.uid()
    )
  );

-- Anyone can read guests of published weddings (needed for RSVP check-in)
create policy "guests: select published wedding"
  on public.guests for select
  using (
    exists (
      select 1 from public.weddings w
      where w.id = guests.wedding_id
        and w.is_published = true
    )
  );

-- Owners can add guests to their own weddings
create policy "guests: insert own wedding"
  on public.guests for insert
  with check (
    exists (
      select 1 from public.weddings w
      where w.id = guests.wedding_id
        and w.user_id = auth.uid()
    )
  );

-- Owners can update guests of their own weddings
create policy "guests: update own wedding"
  on public.guests for update
  using (
    exists (
      select 1 from public.weddings w
      where w.id = guests.wedding_id
        and w.user_id = auth.uid()
    )
  );

-- Anyone can update their own RSVP status (unauthenticated RSVP flow)
-- The guest record is identified by its UUID (sent via unique link)
create policy "guests: update rsvp self"
  on public.guests for update
  using (true)
  with check (true);

-- Owners can delete guests from their own weddings
create policy "guests: delete own wedding"
  on public.guests for delete
  using (
    exists (
      select 1 from public.weddings w
      where w.id = guests.wedding_id
        and w.user_id = auth.uid()
    )
  );
