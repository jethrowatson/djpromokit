-- Allow anyone to insert analytics events (used for tracking page views, clicks, etc. from anonymous visitors)
create policy "Allow public inserts to analytics" 
  on public.analytics for insert 
  with check (true);
