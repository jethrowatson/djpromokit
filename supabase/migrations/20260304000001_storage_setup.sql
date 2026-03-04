-- Storage Buckets Setup
insert into storage.buckets (id, name, public) 
values 
  ('avatars', 'avatars', true),
  ('press_shots', 'press_shots', true)
on conflict (id) do nothing;

-- Storage Policies: Avatars
create policy "Avatars are publicly accessible" 
  on storage.objects for select using (bucket_id = 'avatars');

create policy "Users can upload avatars" 
  on storage.objects for insert with check (bucket_id = 'avatars' and auth.uid() = owner);

create policy "Users can update their avatars" 
  on storage.objects for update using (bucket_id = 'avatars' and auth.uid() = owner);

create policy "Users can delete their avatars" 
  on storage.objects for delete using (bucket_id = 'avatars' and auth.uid() = owner);

-- Storage Policies: Press Shots
create policy "Press shots are publicly accessible" 
  on storage.objects for select using (bucket_id = 'press_shots');

create policy "Users can upload press shots" 
  on storage.objects for insert with check (bucket_id = 'press_shots' and auth.uid() = owner);

create policy "Users can update their press shots" 
  on storage.objects for update using (bucket_id = 'press_shots' and auth.uid() = owner);

create policy "Users can delete their press shots" 
  on storage.objects for delete using (bucket_id = 'press_shots' and auth.uid() = owner);
