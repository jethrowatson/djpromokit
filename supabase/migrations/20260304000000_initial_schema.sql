-- Enable the UUID extension
create extension if not exists "uuid-ossp";

-- Define custom types
create type booking_type as enum('form', 'email');
create type payment_status as enum('pending', 'completed', 'failed');

-- Profiles Table (Core DJ Data)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  username text unique not null,
  name text not null,
  tagline text,
  location text not null,
  genres text[] not null default '{}',
  
  -- Bio
  short_bio text,
  long_bio text,
  
  -- Booking & Contact
  booking_type booking_type not null default 'form',
  public_email text,
  agent_name text,
  fee_range text,
  availability_notes text,
  
  -- System fields
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Media (Mixes)
create table public.mixes (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  url text not null,
  is_featured boolean default false,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Media (Videos)
create table public.videos (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  url text not null,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Gig History
create table public.gig_history (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  venue text not null,
  date date not null,
  details text,
  is_upcoming boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Social Links
create table public.social_links (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null unique,
  instagram text,
  soundcloud text,
  mixcloud text,
  spotify text,
  youtube text,
  resident_advisor text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tech Rider
create table public.tech_riders (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null unique,
  equipment text[] not null default '{}',
  setup_notes text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Payments (Stripe)
create table public.payments (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  stripe_session_id text unique,
  stripe_payment_intent_id text unique,
  amount integer not null,
  status payment_status not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Analytics (Page Views & Clicks)
create table public.analytics (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  event_type text not null, -- 'page_view', 'booking_click', 'link_click', 'mix_play'
  event_data jsonb,
  source text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies Setup

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.mixes enable row level security;
alter table public.videos enable row level security;
alter table public.gig_history enable row level security;
alter table public.social_links enable row level security;
alter table public.tech_riders enable row level security;
alter table public.payments enable row level security;
alter table public.analytics enable row level security;

-- Profiles: Anyone can view published profiles
create policy "Published profiles are viewable by everyone" 
  on public.profiles for select using (is_published = true);

-- Profiles: Users can view their own profile (even draft)
create policy "Users can view their own profile" 
  on public.profiles for select using (auth.uid() = id);

-- Profiles: Users can update their own profile
create policy "Users can update their own profile" 
  on public.profiles for update using (auth.uid() = id);

-- Profiles: Users can insert their own profile
create policy "Users can insert their own profile" 
  on public.profiles for insert with check (auth.uid() = id);

-- Other tables: Select depends on parent profile visibility
create policy "Public view related items based on profile visibility" 
  on public.mixes for select 
  using (exists (select 1 from public.profiles p where p.id = profile_id and p.is_published = true));

create policy "Users can manage their own mixes" 
  on public.mixes for all using (profile_id = auth.uid());

create policy "Public view related items based on profile visibility" 
  on public.videos for select 
  using (exists (select 1 from public.profiles p where p.id = profile_id and p.is_published = true));

create policy "Users can manage their own videos" 
  on public.videos for all using (profile_id = auth.uid());

create policy "Public view related items based on profile visibility" 
  on public.gig_history for select 
  using (exists (select 1 from public.profiles p where p.id = profile_id and p.is_published = true));

create policy "Users can manage their own gig history" 
  on public.gig_history for all using (profile_id = auth.uid());

create policy "Public view related items based on profile visibility" 
  on public.social_links for select 
  using (exists (select 1 from public.profiles p where p.id = profile_id and p.is_published = true));

create policy "Users can manage their own social links" 
  on public.social_links for all using (profile_id = auth.uid());

create policy "Public view related items based on profile visibility" 
  on public.tech_riders for select 
  using (exists (select 1 from public.profiles p where p.id = profile_id and p.is_published = true));

create policy "Users can manage their own tech riders" 
  on public.tech_riders for all using (profile_id = auth.uid());

-- Payments: Users can view their own payments
create policy "Users can view their own payments" 
  on public.payments for select using (profile_id = auth.uid());

-- Triggers for updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

create trigger update_profiles_updated_at
    before update on public.profiles
    for each row execute procedure update_updated_at_column();

create trigger update_social_links_updated_at
    before update on public.social_links
    for each row execute procedure update_updated_at_column();

create trigger update_tech_riders_updated_at
    before update on public.tech_riders
    for each row execute procedure update_updated_at_column();
