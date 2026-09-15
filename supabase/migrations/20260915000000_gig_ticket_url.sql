-- Add ticket_url to gig_history table
ALTER TABLE public.gig_history ADD COLUMN IF NOT EXISTS ticket_url text;

COMMENT ON COLUMN public.gig_history.ticket_url IS 'Direct URL to purchase tickets for the gig/event (e.g. RA, Skiddle, DICE, Eventbrite)';
