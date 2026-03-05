-- Create booking_requests table
create table public.booking_requests (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  sender_name text not null,
  sender_email text not null,
  event_date date not null,
  location text not null,
  event_type text not null,
  offer text,
  message text not null,
  status text not null default 'pending', -- 'pending', 'accepted', 'declined'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.booking_requests enable row level security;

-- Only the owner of the profile can view their booking requests
create policy "Users can view their own booking requests" 
  on public.booking_requests for select using (
    exists (
      select 1 from public.profiles
      where public.profiles.id = public.booking_requests.profile_id
      and public.profiles.id = auth.uid()
    )
  );

-- Only the owner of the profile can update their booking requests (e.g. mark as accepted)
create policy "Users can update their own booking requests" 
  on public.booking_requests for update using (
    exists (
      select 1 from public.profiles
      where public.profiles.id = public.booking_requests.profile_id
      and public.profiles.id = auth.uid()
    )
  );

-- The service role (our API) will bypass RLS to insert new requests
