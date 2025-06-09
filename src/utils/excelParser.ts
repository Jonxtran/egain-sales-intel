
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
    // Load the Excel file from the public directory
    const response = await fetch('/Website visitor IP address log file 1.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    // Get the first worksheet
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    // Transform the data to match our interface
    const visitors: ExcelVisitorData[] = jsonData.map((row: any, index: number) => ({
      id: String(index + 1),
      ip: row['IP Address'] || row['IP'] || row['ip'] || '',
      timestamp: row['Timestamp'] || row['Time'] || row['timestamp'] || '',
      page: row['Page'] || row['URL'] || row['page'] || '',
      referrer: row['Referrer'] || row['referrer'] || '',
      userAgent: row['User Agent'] || row['userAgent'] || '',
      sessionId: row['Session ID'] || row['sessionId'] || '',
      duration: row['Duration'] || row['duration'] || 0,
      location: row['Location'] || row['location'] || ''
    }));
    
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
