-- Run once in Supabase SQL Editor: fixed 9 gallery slots, multi-image support, size in inches.
-- Prerequisites: public.gallery_cakes exists (see schema.sql).

-- 1) Columns
alter table public.gallery_cakes add column if not exists slot_index integer;
alter table public.gallery_cakes add column if not exists image_urls text[] default '{}'::text[];
alter table public.gallery_cakes add column if not exists size_inches text default '';

-- 2) Remove rows that are not one of the nine fixed cakes (e.g. test data)
delete from public.gallery_cakes
where name not in (
  'White Rose Elegance',
  'Floral Cascade',
  'Golden Wedding Tier',
  'Princess Birthday',
  'Character Dream',
  'Cloud Nine',
  'Golden Anniversary',
  'Modern Artisan',
  'Artisan Cookies'
);

-- 3) Assign slot_index (1–9) by exact name
update public.gallery_cakes set slot_index = 1 where name = 'White Rose Elegance';
update public.gallery_cakes set slot_index = 2 where name = 'Floral Cascade';
update public.gallery_cakes set slot_index = 3 where name = 'Golden Wedding Tier';
update public.gallery_cakes set slot_index = 4 where name = 'Princess Birthday';
update public.gallery_cakes set slot_index = 5 where name = 'Character Dream';
update public.gallery_cakes set slot_index = 6 where name = 'Cloud Nine';
update public.gallery_cakes set slot_index = 7 where name = 'Golden Anniversary';
update public.gallery_cakes set slot_index = 8 where name = 'Modern Artisan';
update public.gallery_cakes set slot_index = 9 where name = 'Artisan Cookies';

-- 4) Backfill image_urls from legacy image_url when empty
update public.gallery_cakes
set image_urls = array[image_url]::text[]
where image_url is not null
  and trim(image_url) <> ''
  and (image_urls is null or cardinality(image_urls) = 0);

-- 5) Unique slot_index (one DB row per slot when present)
alter table public.gallery_cakes drop constraint if exists gallery_cakes_slot_index_key;
alter table public.gallery_cakes add constraint gallery_cakes_slot_index_key unique (slot_index);
