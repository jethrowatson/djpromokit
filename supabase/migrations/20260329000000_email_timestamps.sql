-- Add a last_email_sent_at timestamp to track relative follow-up times for backfilled accounts
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS last_abandoned_email_at timestamptz;

-- Refresh the index to include the new column
DROP INDEX IF EXISTS idx_abandoned_cart_tracking;
CREATE INDEX idx_abandoned_cart_tracking 
ON public.profiles(is_published, email_1hr_sent, email_1day_sent, email_3day_sent, last_abandoned_email_at);
