-- Booking Request Status Enum
create type booking_request_status as enum('pending', 'accepted', 'declined');

-- Booking Requests Table
create table public.booking_requests (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  
  -- Sender Details
  sender_name text not null,
  sender_email text not null,
  
  -- Event Details
  event_date date not null,
  event_time time,
  location text not null,
  event_type text not null,
  offer text,
  
  -- Extra context
  message text,
  
  -- Status management
  status booking_request_status not null default 'pending',
  
  -- Timestamps
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies Setup
alter table public.booking_requests enable row level security;

-- Booking Requests: Users can view their own requests
create policy "Users can view their own booking requests" 
  on public.booking_requests for select using (profile_id = auth.uid());

-- Booking Requests: Users can update their own requests
create policy "Users can update their own booking requests" 
  on public.booking_requests for update using (profile_id = auth.uid());

-- Booking Requests: Public can insert (so the API route can create them without user auth)
create policy "Public can insert booking requests" 
  on public.booking_requests for insert with check (true);

-- Trigger for updated_at
create trigger update_booking_requests_updated_at
    before update on public.booking_requests
    for each row execute procedure update_updated_at_column();
