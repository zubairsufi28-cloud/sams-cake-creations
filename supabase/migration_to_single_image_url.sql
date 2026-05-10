-- If you previously used image_urls (text[]), run this once to switch to image_url.

alter table public.gallery_cakes add column if not exists image_url text;

update public.gallery_cakes
set image_url = image_urls[1]
where (image_url is null or image_url = '')
  and image_urls is not null
  and cardinality(image_urls) >= 1;

alter table public.gallery_cakes drop column if exists image_urls;

alter table public.gallery_cakes alter column image_url set not null;

drop policy if exists "Allow public update gallery_cakes" on public.gallery_cakes;
create policy "Allow public update gallery_cakes"
  on public.gallery_cakes for update
  using (true)
  with check (true);
