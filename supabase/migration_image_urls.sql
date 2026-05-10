-- Run once if gallery_cakes already exists with image_url (single column).

alter table public.gallery_cakes add column if not exists image_urls text[];

update public.gallery_cakes
set image_urls = array[image_url]
where image_urls is null and image_url is not null;

alter table public.gallery_cakes drop column if exists image_url;

alter table public.gallery_cakes alter column image_urls set not null;

alter table public.gallery_cakes drop constraint if exists gallery_cakes_image_urls_check;
alter table public.gallery_cakes
  add constraint gallery_cakes_image_urls_check
  check (cardinality(image_urls) >= 1 and cardinality(image_urls) <= 5);

drop policy if exists "Allow public delete gallery_cakes" on public.gallery_cakes;
create policy "Allow public delete gallery_cakes"
  on public.gallery_cakes for delete
  using (true);
