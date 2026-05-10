-- Run in Supabase SQL Editor (new projects: full create).
-- Existing DBs: run migration_image_urls.sql first if you still have image_url.

create table if not exists public.gallery_cakes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null
    check (category in ('Wedding', 'Birthday', 'Baby Shower', 'Anniversary', 'Cookies', 'Other')),
  description text not null default '',
  image_urls text[] not null check (cardinality(image_urls) >= 1 and cardinality(image_urls) <= 5),
  created_at timestamptz not null default now()
);

alter table public.gallery_cakes enable row level security;

drop policy if exists "Allow public read gallery_cakes" on public.gallery_cakes;
create policy "Allow public read gallery_cakes"
  on public.gallery_cakes for select
  using (true);

drop policy if exists "Allow public insert gallery_cakes" on public.gallery_cakes;
create policy "Allow public insert gallery_cakes"
  on public.gallery_cakes for insert
  with check (true);

drop policy if exists "Allow public delete gallery_cakes" on public.gallery_cakes;
create policy "Allow public delete gallery_cakes"
  on public.gallery_cakes for delete
  using (true);
