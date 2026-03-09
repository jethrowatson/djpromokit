-- Migration to sanitize all existing usernames (convert spaces to hyphens, lowercase, remove special characters)
UPDATE public.profiles
SET username = regexp_replace(
  regexp_replace(lower(username), '\s+', '-', 'g'), 
  '[^a-z0-9\-]', '', 'g'
)
WHERE username IS NOT NULL;
