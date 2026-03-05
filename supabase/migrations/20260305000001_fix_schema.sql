-- Add avatar_url to profiles
alter table public.profiles add column if not exists avatar_url text;

-- Drop old specific tables (if they weren't used yet, which is likely since the frontend used 'media')
drop table if exists public.mixes cascade;
drop table if exists public.videos cascade;

-- Create generic media table 
create table if not exists public.media (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  type text not null, -- 'press_shot', 'featured_mix', 'video'
  title text,
  url text not null,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for media
alter table public.media enable row level security;

-- Drop existing policies if they overlap, just to be safe
drop policy if exists "Public view related items based on profile visibility" on public.media;
drop policy if exists "Users can manage their own media" on public.media;

create policy "Public view related items based on profile visibility" 
  on public.media for select 
  using (exists (select 1 from public.profiles p where p.id = profile_id and p.is_published = true));

create policy "Users can manage their own media" 
  on public.media for all using (profile_id = auth.uid());
