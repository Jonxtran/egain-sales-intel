
import { supabase } from '@/integrations/supabase/client';

export interface VisitorData {
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

// Function to fetch companies from Supabase - returns empty array since companies table doesn't exist
export const fetchCompanies = async (): Promise<CompanyData[]> => {
  console.log('Companies table not available in current schema');
  return [];
};

// Function to get company name from IP address - returns Unknown Company since companies table doesn't exist
export const getCompanyFromIP = async (ip: string): Promise<string> => {
  console.log('Company lookup not available - companies table does not exist');
  return 'Unknown Company';
};
