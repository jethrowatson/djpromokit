-- Add sync_gigs_enabled column to the profiles table
ALTER TABLE public.profiles
ADD COLUMN sync_gigs_enabled BOOLEAN DEFAULT false;
