
-- Drop existing tables to recreate with correct structure
DROP TABLE IF EXISTS public.page_views;
DROP TABLE IF EXISTS public.visitors;
DROP TABLE IF EXISTS public.companies;

-- Create visitors table with exact Excel columns
CREATE TABLE public.visitors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_ip INET NOT NULL,
  domain TEXT,
  date_time_utc TIMESTAMP WITH TIME ZONE NOT NULL,
  request_type TEXT,
  page_url TEXT,
  referral_url TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create companies table for IP-to-company mapping
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  domain TEXT,
  ip_addresses TEXT[] DEFAULT '{}',
  industry TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add indexes for better query performance
CREATE INDEX idx_visitors_ip ON public.visitors(visitor_ip);
CREATE INDEX idx_visitors_date_time ON public.visitors(date_time_utc);
CREATE INDEX idx_visitors_domain ON public.visitors(domain);

-- Insert sample companies based on common IP ranges
INSERT INTO public.companies (name, domain, ip_addresses, industry, location) VALUES
('Microsoft Corporation', 'microsoft.com', ARRAY['69.191.211.207'], 'Technology', 'Redmond, WA'),
('Salesforce Inc', 'salesforce.com', ARRAY['180.179.180.41'], 'Technology', 'San Francisco, CA'),
('Amazon Web Services', 'aws.amazon.com', ARRAY['3.141.5.27'], 'Cloud Services', 'Seattle, WA'),
('Deutsche Bank AG', 'db.com', ARRAY['80.246.241.14'], 'Financial Services', 'Frankfurt, Germany'),
('JPMorgan Chase', 'jpmorganchase.com', ARRAY['162.249.164.251'], 'Financial Services', 'New York, NY');

-- Enable Row Level Security (RLS)
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access for analytics data
CREATE POLICY "Allow public read access to visitors" ON public.visitors FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to visitors" ON public.visitors FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access to visitors" ON public.visitors FOR UPDATE USING (true);
CREATE POLICY "Allow public read access to companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to companies" ON public.companies FOR INSERT WITH CHECK (true);
