-- Supabase Waitlist Schema
-- Complete SQL setup for waitlist functionality
-- Copy and paste this entire file into Supabase SQL Editor

-- Create waitlist table
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  email varchar(255) not null unique,
  name varchar(100),
  source varchar(50) default 'website',
  locale varchar(5) default 'en',
  interests text[],
  utm_source varchar(100),
  utm_medium varchar(100),
  utm_campaign varchar(100),
  ip_address inet,
  user_agent text,
  referrer text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  status varchar(20) default 'active',
  verified boolean default false,
  verification_token varchar(100),
  last_email_sent timestamp with time zone,
  email_count integer default 0
);

-- Create indexes for performance
create index idx_waitlist_email on waitlist(email);
create index idx_waitlist_created_at on waitlist(created_at);
create index idx_waitlist_status on waitlist(status);
create index idx_waitlist_locale on waitlist(locale);

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language 'plpgsql';

-- Create trigger for updated_at
create trigger update_waitlist_updated_at
  before update on waitlist
  for each row
  execute function update_updated_at_column();

-- Enable Row Level Security
alter table waitlist enable row level security;

-- Policy: Anyone can insert waitlist entries (for public signups)
create policy "Anyone can insert waitlist entries"
on waitlist
for insert
with check (true);

-- Policy: Only service role can read all entries (for admin/analytics)
create policy "Service role can read all waitlist entries"
on waitlist
for select
using (auth.role() = 'service_role');

-- Policy: Only service role can update entries (for admin management)
create policy "Service role can update waitlist entries"
on waitlist
for update
using (auth.role() = 'service_role');

-- Policy: Only service role can delete entries (for admin management)
create policy "Service role can delete waitlist entries"
on waitlist
for delete
using (auth.role() = 'service_role');

-- Create analytics view for dashboard
create view waitlist_analytics as
select 
  date_trunc('day', created_at) as signup_date,
  locale,
  source,
  utm_source,
  utm_campaign,
  count(*) as signups,
  count(case when status = 'active' then 1 end) as active_signups,
  count(case when verified = true then 1 end) as verified_signups
from waitlist
group by signup_date, locale, source, utm_source, utm_campaign
order by signup_date desc;