-- Add wizard progress tracking to the profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS onboarding_step INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS is_onboarded BOOLEAN DEFAULT false;

-- Add a comment to explain the columns
COMMENT ON COLUMN profiles.onboarding_step IS 'Tracks the user''s current step in the persistent dashboard profile wizard (1-7).';
COMMENT ON COLUMN profiles.is_onboarded IS 'Flag to indicate if the user has successfully completed the initial dashboard setup wizard.';
