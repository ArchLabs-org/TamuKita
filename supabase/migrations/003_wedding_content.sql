-- =============================================================================
-- TamuKita — Wedding Content Extension
-- Adds columns for photos, music, story, maps, and bride/groom photos
-- Run AFTER 002_row_level_security.sql
-- =============================================================================

alter table public.weddings
  -- Couple story & additional details
  add column if not exists bride_parents       text,
  add column if not exists groom_parents       text,
  add column if not exists love_story          text,
  -- Event details
  add column if not exists akad_date           date,
  add column if not exists akad_time           text,
  add column if not exists akad_venue          text,
  add column if not exists akad_address        text,
  add column if not exists akad_maps_url       text,
  add column if not exists reception_date      date,
  add column if not exists reception_time      text,
  add column if not exists reception_address   text,
  add column if not exists reception_maps_url  text,
  -- Media
  add column if not exists bride_photo_url     text,
  add column if not exists groom_photo_url     text,
  add column if not exists cover_photo_url     text,
  add column if not exists gallery_urls        text[] default '{}',
  -- Music: 'template' | 'custom'
  add column if not exists music_type          text not null default 'template',
  add column if not exists music_custom_url    text,
  -- Gift / Angpao
  add column if not exists gifts               jsonb default '[]',
  -- Timeline stories
  add column if not exists timeline            jsonb default '[]';

comment on column public.weddings.gallery_urls      is 'Array of uploaded photo URLs from Supabase Storage';
comment on column public.weddings.music_type        is '"template" uses per-theme default, "custom" uses music_custom_url';
comment on column public.weddings.gifts             is 'JSON array: [{bank, account, name}]';
comment on column public.weddings.timeline          is 'JSON array: [{year, title, desc}]';
