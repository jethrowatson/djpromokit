-- Overwrite Storage Policies to allow inserting without explicit owner check

drop policy if exists "Users can upload avatars" on storage.objects;
drop policy if exists "Users can update their avatars" on storage.objects;
drop policy if exists "Users can delete their avatars" on storage.objects;

drop policy if exists "Users can upload press shots" on storage.objects;
drop policy if exists "Users can update their press shots" on storage.objects;
drop policy if exists "Users can delete their press shots" on storage.objects;

-- Storage Policies: Avatars
create policy "Users can upload avatars" 
  on storage.objects for insert with check (bucket_id = 'avatars' and auth.uid() is not null);

create policy "Users can update their avatars" 
  on storage.objects for update using (bucket_id = 'avatars' and auth.uid() is not null);

create policy "Users can delete their avatars" 
  on storage.objects for delete using (bucket_id = 'avatars' and auth.uid() is not null);

-- Storage Policies: Press Shots
create policy "Users can upload press shots" 
  on storage.objects for insert with check (bucket_id = 'press_shots' and auth.uid() is not null);

create policy "Users can update their press shots" 
  on storage.objects for update using (bucket_id = 'press_shots' and auth.uid() is not null);

create policy "Users can delete their press shots" 
  on storage.objects for delete using (bucket_id = 'press_shots' and auth.uid() is not null);
