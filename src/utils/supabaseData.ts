import { supabase } from '@/integrations/supabase/client';
import * as XLSX from 'xlsx';

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

// Function to import Excel data to Supabase
export const importExcelToSupabase = async (): Promise<{ success: boolean; message: string }> => {
  try {
    // Load the Excel file
    const response = await fetch('/Shorten - Website visitor IP address log file .xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    console.log('Raw Excel data:', jsonData);

    // Transform Excel data to match database structure
    const visitors: Omit<VisitorData, 'id'>[] = jsonData.map((row: any) => {
      const keys = Object.keys(row);
      
      // Find columns with flexible matching
      const ipKey = keys.find(key => 
        key.toLowerCase().includes('ip') || 
        key.toLowerCase().includes('address')
      );
      const domainKey = keys.find(key => 
        key.toLowerCase().includes('domain')
      );
      const timestampKey = keys.find(key => 
        key.toLowerCase().includes('time') || 
        key.toLowerCase().includes('date')
      );
      const requestTypeKey = keys.find(key => 
        key.toLowerCase().includes('request') ||
        key.toLowerCase().includes('type')
      );
      const pageKey = keys.find(key => 
        key.toLowerCase().includes('page') || 
        key.toLowerCase().includes('url') && !key.toLowerCase().includes('referral')
      );
      const referralKey = keys.find(key => 
        key.toLowerCase().includes('referral') || 
        key.toLowerCase().includes('referer')
      );
      const userAgentKey = keys.find(key => 
        key.toLowerCase().includes('agent') || 
        key.toLowerCase().includes('browser')
      );

      return {
        visitor_ip: ipKey ? String(row[ipKey] || '') : '',
        domain: domainKey ? String(row[domainKey] || '') : null,
        date_time_utc: timestampKey ? String(row[timestampKey] || '') : new Date().toISOString(),
        request_type: requestTypeKey ? String(row[requestTypeKey] || '') : null,
        page_url: pageKey ? String(row[pageKey] || '') : null,
        referral_url: referralKey ? String(row[referralKey] || '') : null,
        user_agent: userAgentKey ? String(row[userAgentKey] || '') : null
      };
    }).filter(visitor => visitor.visitor_ip); // Only include rows with valid IP

    console.log('Processed visitors for import:', visitors);

    if (visitors.length === 0) {
      return { success: false, message: 'No valid visitor data found in Excel file' };
    }

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('visitors')
      .insert(visitors)
      .select();

    if (error) {
      console.error('Error inserting data:', error);
      return { success: false, message: `Error importing data: ${error.message}` };
    }

    return { 
      success: true, 
      message: `Successfully imported ${data?.length || 0} visitor records` 
    };

  } catch (error) {
    console.error('Error importing Excel data:', error);
    return { 
      success: false, 
      message: `Error processing Excel file: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
};
