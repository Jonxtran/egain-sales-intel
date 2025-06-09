
import { supabase } from '@/integrations/supabase/client';

export interface VisitorData {
  id?: string;
  visitor_ip: string;
  domain?: string;
  date_time_utc: string;
  request_type?: string;
  page_url?: string;
  referral_url?: string;
  user_agent?: string;
}

export interface CompanyData {
  id?: string;
  name: string;
  domain?: string;
  ip_addresses: string[];
  industry?: string;
  location?: string;
}

// Function to fetch visitors from Supabase
export const fetchVisitors = async (): Promise<VisitorData[]> => {
  const { data, error } = await supabase
    .from('visitors')
    .select('*')
    .order('date_time_utc', { ascending: false });

  if (error) {
    console.error('Error fetching visitors:', error);
    return [];
  }

  // Transform the data to ensure visitor_ip is a string
  const transformedData: VisitorData[] = (data || []).map(row => ({
    id: row.id,
    visitor_ip: String(row.visitor_ip), // Convert unknown to string
    domain: row.domain,
    date_time_utc: row.date_time_utc,
    request_type: row.request_type,
    page_url: row.page_url,
    referral_url: row.referral_url,
    user_agent: row.user_agent
  }));

  return transformedData;
};

// Function to fetch companies from Supabase
export const fetchCompanies = async (): Promise<CompanyData[]> => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching companies:', error);
    return [];
  }

  return data || [];
};

// Function to get company name from IP address
export const getCompanyFromIP = async (ip: string): Promise<string> => {
  const { data, error } = await supabase
    .from('companies')
    .select('name, ip_addresses')
    .contains('ip_addresses', [ip])
    .single();

  if (error || !data) {
    return 'Unknown Company';
  }

  return data.name;
};
