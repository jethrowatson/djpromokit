-- Add tracking columns for the 3-part abandoned cart email sequence to profiles
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS email_1hr_sent boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS email_1day_sent boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS email_3day_sent boolean DEFAULT false;

-- Create an index to speed up cron queries finding unsent/unpublished profiles
CREATE INDEX IF NOT EXISTS idx_abandoned_cart_tracking 
ON public.profiles(is_published, email_1hr_sent, email_1day_sent, email_3day_sent, created_at);
