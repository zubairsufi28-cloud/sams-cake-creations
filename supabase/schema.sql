-- Run once in Supabase → SQL Editor

create table if not exists public.gallery_cakes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null
    check (category in ('Wedding', 'Birthday', 'Baby Shower', 'Anniversary', 'Cookies', 'Other')),
  description text not null default '',
  image_url text not null,
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

-- Optional: Database → Replication → supabase_realtime → add gallery_cakes for instant gallery refresh
