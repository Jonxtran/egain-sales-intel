
import * as XLSX from 'xlsx';

export interface ExcelVisitorData {
  id: string;
  ip: string;
  timestamp: string;
  page: string;
  referrer?: string;
  userAgent?: string;
  sessionId?: string;
  duration?: number;
  location?: string;
}

export const parseExcelFile = async (): Promise<ExcelVisitorData[]> => {
  try {
    // Load the shortened Excel file from the public directory
    const response = await fetch('/Shorten - Website visitor IP address log file .xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    // Get the first worksheet
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    console.log('Raw Excel data:', jsonData);
    console.log('First row keys:', jsonData[0] ? Object.keys(jsonData[0]) : 'No data');
    
    // Transform the data to match our interface with more flexible column matching
    const visitors: ExcelVisitorData[] = jsonData.map((row: any, index: number) => {
      const keys = Object.keys(row);
      console.log(`Row ${index + 1} keys:`, keys);
      
      // Find IP column with various possible names
      const ipKey = keys.find(key => 
        key.toLowerCase().includes('ip') || 
        key.toLowerCase().includes('address')
      );
      
      // Find timestamp column
      const timestampKey = keys.find(key => 
        key.toLowerCase().includes('time') || 
        key.toLowerCase().includes('date') ||
        key.toLowerCase().includes('stamp')
      );
      
      // Find page/URL column
      const pageKey = keys.find(key => 
        key.toLowerCase().includes('page') || 
        key.toLowerCase().includes('url') ||
        key.toLowerCase().includes('path')
      );
      
      // Find referrer column
      const referrerKey = keys.find(key => 
        key.toLowerCase().includes('referrer') || 
        key.toLowerCase().includes('referer')
      );
      
      // Find user agent column
      const userAgentKey = keys.find(key => 
        key.toLowerCase().includes('agent') || 
        key.toLowerCase().includes('browser')
      );
      
      // Find session column
      const sessionKey = keys.find(key => 
        key.toLowerCase().includes('session')
      );
      
      // Find duration column
      const durationKey = keys.find(key => 
        key.toLowerCase().includes('duration') || 
        key.toLowerCase().includes('time') && !key.toLowerCase().includes('stamp')
      );
      
      // Find location column
      const locationKey = keys.find(key => 
        key.toLowerCase().includes('location') || 
        key.toLowerCase().includes('country') ||
        key.toLowerCase().includes('city')
      );
      
      const visitor = {
        id: String(index + 1),
        ip: ipKey ? String(row[ipKey] || '') : '',
        timestamp: timestampKey ? String(row[timestampKey] || '') : '',
        page: pageKey ? String(row[pageKey] || '') : '',
        referrer: referrerKey ? String(row[referrerKey] || '') : '',
        userAgent: userAgentKey ? String(row[userAgentKey] || '') : '',
        sessionId: sessionKey ? String(row[sessionKey] || '') : '',
        duration: durationKey ? Number(row[durationKey]) || 0 : 0,
        location: locationKey ? String(row[locationKey] || '') : ''
      };
      
      console.log(`Processed visitor ${index + 1}:`, visitor);
      return visitor;
    });
    
    console.log('Final processed visitors:', visitors);
    return visitors;
  } catch (error) {
    console.error('Error parsing Excel file:', error);
    return [];
  }
};

// Function to derive company information from IP address (mock implementation)
export const getCompanyFromIP = (ip: string): string => {
  // This is a simplified mock implementation
  // In a real scenario, you'd use IP geolocation services like MaxMind, IPinfo, etc.
  const companyMap: { [key: string]: string } = {
    '69.191.211.207': 'Microsoft Corporation',
    '180.179.180.41': 'Salesforce Inc',
    '3.141.5.27': 'Amazon Web Services',
    '80.246.241.14': 'Deutsche Bank AG',
    '162.249.164.251': 'JPMorgan Chase',
  };
  
  return companyMap[ip] || 'Unknown Company';
};

// Function to calculate engagement level based on pages and duration
export const calculateEngagement = (pages: number, duration: number): 'High' | 'Medium' | 'Low' => {
  if (pages >= 10 || duration >= 300) return 'High';
  if (pages >= 5 || duration >= 120) return 'Medium';
  return 'Low';
};
