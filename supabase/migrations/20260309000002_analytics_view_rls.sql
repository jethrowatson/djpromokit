-- Allow users to view their own analytics data
create policy "Users can view their own analytics" 
  on public.analytics for select 
  using (profile_id = auth.uid());
