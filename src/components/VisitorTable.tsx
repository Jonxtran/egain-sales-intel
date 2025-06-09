
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MapPin, Clock, TrendingUp, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import VisitorDetails from './VisitorDetails';

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
}

interface VisitorTableProps {
  searchTerm: string;
}

const VisitorTable = ({ searchTerm }: VisitorTableProps) => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading visitor data from the logs
    setTimeout(() => {
      const mockVisitors: Visitor[] = [
        {
          id: '1',
          ip: '69.191.211.207',
          domain: 'www.egain.com',
          company: 'Microsoft Corporation',
          pages: 12,
          duration: '8m 45s',
          lastSeen: '2 hours ago',
          location: 'Redmond, WA',
          engagement: 'High',
          technology: 'Chrome/Safari',
          intent: ['Knowledge Management', 'Customer Service']
        },
        {
          id: '2',
          ip: '180.179.180.41',
          domain: 'www.egain.com',
          company: 'Salesforce Inc',
          pages: 8,
          duration: '5m 32s',
          lastSeen: '4 hours ago',
          location: 'San Francisco, CA',
          engagement: 'High',
          technology: 'Chrome',
          intent: ['Sales Analytics', 'CRM Integration']
        },
        {
          id: '3',
          ip: '3.141.5.27',
          domain: 'www.egain.com',
          company: 'Amazon Web Services',
          pages: 15,
          duration: '12m 18s',
          lastSeen: '1 hour ago',
          location: 'Seattle, WA',
          engagement: 'High',
          technology: 'Chrome',
          intent: ['Cloud Solutions', 'AI Analytics']
        },
        {
          id: '4',
          ip: '80.246.241.14',
          domain: 'www.egain.com',
          company: 'Deutsche Bank AG',
          pages: 6,
          duration: '3m 21s',
          lastSeen: '6 hours ago',
          location: 'Frankfurt, Germany',
          engagement: 'Medium',
          technology: 'Firefox',
          intent: ['Financial Services', 'Compliance']
        },
        {
          id: '5',
          ip: '162.249.164.251',
          domain: 'www.egain.com',
          company: 'JPMorgan Chase',
          pages: 9,
          duration: '7m 15s',
          lastSeen: '3 hours ago',
          location: 'New York, NY',
          engagement: 'High',
          technology: 'Chrome',
          intent: ['Banking Solutions', 'Customer Analytics']
        }
      ];
      
      setVisitors(mockVisitors);
      setLoading(false);
    }, 1000);
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
        <CardTitle className="flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Visitor Intelligence
          <Badge variant="outline" className="ml-2">
            {filteredVisitors.length} visitors
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Engagement</TableHead>
              <TableHead>Pages Viewed</TableHead>
              <TableHead>Session Time</TableHead>
              <TableHead>Intent Signals</TableHead>
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
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {visitor.intent.slice(0, 2).map((intent, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {intent}
                      </Badge>
                    ))}
                    {visitor.intent.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{visitor.intent.length - 2}
                      </Badge>
                    )}
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
      </CardContent>
    </Card>
  );
};

export default VisitorTable;
