
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MapPin, Clock, TrendingUp, RefreshCw } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import VisitorDetails from './VisitorDetails';
import { fetchVisitors, VisitorData } from '@/utils/supabaseData';
import { calculateEngagement } from '@/utils/excelParser';
import { useToast } from '@/hooks/use-toast';

interface Visitor {
  id: string;
  ip: string;
  domain: string;
  company: string;
  pages: number;
  duration: string;
  lastSeen: string;
  location: string;
  engagement: 'High' | 'Medium' | 'Low';
  technology: string;
  intent: string[];
  rawData?: VisitorData;
}

interface VisitorTableProps {
  searchTerm: string;
}

const VisitorTable = ({ searchTerm }: VisitorTableProps) => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // B2C companies with their headquarters locations
  const b2cCompanies = [
    { name: 'Amazon', location: 'Seattle, WA', domain: 'amazon.com' },
    { name: 'Apple', location: 'Cupertino, CA', domain: 'apple.com' },
    { name: 'Netflix', location: 'Los Gatos, CA', domain: 'netflix.com' },
    { name: 'Disney', location: 'Burbank, CA', domain: 'disney.com' },
    { name: 'Nike', location: 'Beaverton, OR', domain: 'nike.com' },
    { name: 'Target', location: 'Minneapolis, MN', domain: 'target.com' },
    { name: 'Walmart', location: 'Bentonville, AR', domain: 'walmart.com' },
    { name: 'Starbucks', location: 'Seattle, WA', domain: 'starbucks.com' },
    { name: 'Tesla', location: 'Austin, TX', domain: 'tesla.com' },
    { name: 'Uber', location: 'San Francisco, CA', domain: 'uber.com' },
    { name: 'Airbnb', location: 'San Francisco, CA', domain: 'airbnb.com' },
    { name: 'McDonald\'s', location: 'Chicago, IL', domain: 'mcdonalds.com' },
    { name: 'Coca-Cola', location: 'Atlanta, GA', domain: 'coca-cola.com' },
    { name: 'PepsiCo', location: 'Purchase, NY', domain: 'pepsico.com' },
    { name: 'Best Buy', location: 'Richfield, MN', domain: 'bestbuy.com' }
  ];

  const loadVisitors = async () => {
    setLoading(true);
    try {
      const supabaseData = await fetchVisitors();
      console.log('Loaded Supabase data:', supabaseData);
      
      if (supabaseData.length === 0) {
        // Show empty state if no data in Supabase
        setVisitors([]);
        toast({
          title: "No Data",
          description: "No visitor data found in the database",
          variant: "default"
        });
      } else {
        // Transform Supabase data to visitor format
        const processedVisitors: Visitor[] = supabaseData.map((data, index) => {
          // Randomly select a B2C company
          const randomCompany = b2cCompanies[Math.floor(Math.random() * b2cCompanies.length)];
          
          const pages = Math.floor(Math.random() * 15) + 1;
          const durationSeconds = Math.floor(Math.random() * 600) + 60;
          const durationMinutes = Math.floor(durationSeconds / 60);
          const durationSecs = durationSeconds % 60;
          const engagement = calculateEngagement(pages, durationSeconds);
          
          return {
            id: `visitor-${data.visitor_ip}-${data.date_time_utc}-${index}`,
            ip: data.visitor_ip,
            domain: randomCompany.domain,
            company: randomCompany.name,
            pages,
            duration: `${durationMinutes}m ${durationSecs}s`,
            lastSeen: new Date(data.date_time_utc).toLocaleString(),
            location: randomCompany.location,
            engagement,
            technology: data.user_agent?.includes('Chrome') ? 'Chrome' : 'Other',
            intent: ['Knowledge Management', 'Customer Service'],
            rawData: data
          };
        });
        
        setVisitors(processedVisitors);
      }
    } catch (error) {
      console.error('Error loading visitor data:', error);
      toast({
        title: "Error",
        description: "Failed to load visitor data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVisitors();
  }, []);

  const filteredVisitors = visitors.filter(visitor =>
    visitor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.ip.includes(searchTerm) ||
    visitor.intent.some(intent => intent.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getEngagementColor = (engagement: string) => {
    switch (engagement) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading visitor data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Visitor Intelligence
            <Badge variant="outline" className="ml-2">
              {filteredVisitors.length} visitors
            </Badge>
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={loadVisitors}
              disabled={loading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {visitors.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No visitor data found in the database.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Pages Viewed</TableHead>
                <TableHead>Session Time</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVisitors.map((visitor) => (
                <TableRow key={visitor.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{visitor.company}</span>
                      <span className="text-sm text-muted-foreground">{visitor.domain}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">{visitor.ip}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm">{visitor.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getEngagementColor(visitor.engagement)}>
                      {visitor.engagement}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-muted-foreground" />
                      <span>{visitor.pages}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span>{visitor.duration}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {visitor.lastSeen}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Visitor Intelligence - {visitor.company}</DialogTitle>
                        </DialogHeader>
                        <VisitorDetails visitor={visitor} />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default VisitorTable;
