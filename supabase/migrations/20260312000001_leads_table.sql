-- Migration: Create leads table for partial signups
create table if not exists public.leads (
    id uuid default gen_random_uuid() primary key,
    email text not null,
    profile_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Secure table (only service role needs access)
alter table public.leads enable row level security;
