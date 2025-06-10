import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MapPin, Clock, TrendingUp, RefreshCw, Flag, Tag, MoreHorizontal, Star, Building } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
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
  isFlagged?: boolean;
  industry?: string;
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
    { name: 'Amazon', location: 'Seattle, WA', domain: 'amazon.com', industry: 'E-commerce' },
    { name: 'Apple', location: 'Cupertino, CA', domain: 'apple.com', industry: 'Technology' },
    { name: 'Netflix', location: 'Los Gatos, CA', domain: 'netflix.com', industry: 'Entertainment' },
    { name: 'Disney', location: 'Burbank, CA', domain: 'disney.com', industry: 'Entertainment' },
    { name: 'Nike', location: 'Beaverton, OR', domain: 'nike.com', industry: 'Retail' },
    { name: 'Target', location: 'Minneapolis, MN', domain: 'target.com', industry: 'Retail' },
    { name: 'Walmart', location: 'Bentonville, AR', domain: 'walmart.com', industry: 'Retail' },
    { name: 'Starbucks', location: 'Seattle, WA', domain: 'starbucks.com', industry: 'Food & Beverage' },
    { name: 'Tesla', location: 'Austin, TX', domain: 'tesla.com', industry: 'Automotive' },
    { name: 'Uber', location: 'San Francisco, CA', domain: 'uber.com', industry: 'Transportation' },
    { name: 'Airbnb', location: 'San Francisco, CA', domain: 'airbnb.com', industry: 'Travel' },
    { name: 'McDonald\'s', location: 'Chicago, IL', domain: 'mcdonalds.com', industry: 'Food & Beverage' },
    { name: 'Coca-Cola', location: 'Atlanta, GA', domain: 'coca-cola.com', industry: 'Food & Beverage' },
    { name: 'PepsiCo', location: 'Purchase, NY', domain: 'pepsico.com', industry: 'Food & Beverage' },
    { name: 'Best Buy', location: 'Richfield, MN', domain: 'bestbuy.com', industry: 'Retail' }
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
            industry: randomCompany.industry,
            isFlagged: Math.random() > 0.8, // Random flagged status
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

  const handleFlagVisitor = (visitorId: string) => {
    setVisitors(prev => prev.map(visitor => 
      visitor.id === visitorId 
        ? { ...visitor, isFlagged: !visitor.isFlagged }
        : visitor
    ));
    
    const visitor = visitors.find(v => v.id === visitorId);
    toast({
      title: visitor?.isFlagged ? "Visitor Unflagged" : "Visitor Flagged",
      description: visitor?.isFlagged 
        ? `${visitor.company} removed from watch list`
        : `${visitor?.company} added to watch list`,
    });
  };

  const handleIndustryTag = (visitorId: string) => {
    toast({
      title: "Industry Analysis",
      description: "LinkedIn/Crunchbase integration coming soon...",
    });
  };

  const handleContactInfo = (visitorId: string) => {
    toast({
      title: "Contact Discovery",
      description: "Finding contact information...",
    });
  };

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
        <CardContent className="p-4 sm:p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary"></div>
            <span className="ml-2 text-sm sm:text-base">Loading visitor data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-base sm:text-lg">Visitor Intelligence</span>
            </div>
            <Badge variant="outline" className="w-fit">
              {filteredVisitors.length} visitors
            </Badge>
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={loadVisitors}
              disabled={loading}
              className="text-xs sm:text-sm"
            >
              <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        {visitors.length === 0 ? (
          <div className="text-center py-8 px-4">
            <p className="text-muted-foreground text-sm sm:text-base">
              No visitor data found in the database.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px] min-w-[150px]">Company</TableHead>
                    <TableHead className="w-[120px] min-w-[100px]">IP Address</TableHead>
                    <TableHead className="w-[150px] min-w-[120px]">Location</TableHead>
                    <TableHead className="w-[100px] min-w-[80px]">Engagement</TableHead>
                    <TableHead className="w-[80px] min-w-[70px]">Pages</TableHead>
                    <TableHead className="w-[100px] min-w-[80px]">Session</TableHead>
                    <TableHead className="w-[150px] min-w-[120px]">Last Seen</TableHead>
                    <TableHead className="w-[120px] min-w-[100px]">Details</TableHead>
                    <TableHead className="w-[120px] min-w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVisitors.map((visitor) => (
                    <ContextMenu key={visitor.id}>
                      <ContextMenuTrigger asChild>
                        <TableRow className="hover:bg-muted/50">
                          <TableCell className="p-2 sm:p-4">
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-sm truncate" title={visitor.company}>
                                  {visitor.company}
                                </span>
                                {visitor.isFlagged && (
                                  <Flag className="w-3 h-3 text-red-500 fill-red-500 flex-shrink-0" />
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground truncate" title={visitor.domain}>
                                {visitor.domain}
                              </span>
                              {visitor.industry && (
                                <Badge variant="outline" className="w-fit text-xs py-0 h-5">
                                  {visitor.industry}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="p-2 sm:p-4">
                            <span className="font-mono text-xs break-all">{visitor.ip}</span>
                          </TableCell>
                          <TableCell className="p-2 sm:p-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                              <span className="text-xs truncate" title={visitor.location}>
                                {visitor.location}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="p-2 sm:p-4">
                            <Badge variant="outline" className={`${getEngagementColor(visitor.engagement)} text-xs`}>
                              {visitor.engagement}
                            </Badge>
                          </TableCell>
                          <TableCell className="p-2 sm:p-4">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                              <span className="text-xs">{visitor.pages}</span>
                            </div>
                          </TableCell>
                          <TableCell className="p-2 sm:p-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                              <span className="text-xs">{visitor.duration}</span>
                            </div>
                          </TableCell>
                          <TableCell className="p-2 sm:p-4">
                            <span className="text-xs text-muted-foreground">
                              {new Date(visitor.lastSeen).toLocaleDateString()}
                            </span>
                          </TableCell>
                          <TableCell className="p-2 sm:p-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-xs h-7">
                                  <Eye className="w-3 h-3 mr-1" />
                                  <span className="hidden sm:inline">View</span>
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="text-sm sm:text-lg">
                                    Visitor Intelligence - {visitor.company}
                                  </DialogTitle>
                                </DialogHeader>
                                <VisitorDetails visitor={visitor} />
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                          <TableCell className="p-2 sm:p-4">
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleFlagVisitor(visitor.id)}
                                className={`h-7 w-7 p-0 ${visitor.isFlagged ? "text-red-600" : ""}`}
                                title={visitor.isFlagged ? "Remove from watch list" : "Add to watch list"}
                              >
                                <Flag className={`w-3 h-3 ${visitor.isFlagged ? 'fill-current' : ''}`} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleIndustryTag(visitor.id)}
                                className="h-7 w-7 p-0"
                                title="Analyze with LinkedIn/Crunchbase"
                              >
                                <Building className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleContactInfo(visitor.id)}
                                className="h-7 w-7 p-0"
                                title="Find contact information"
                              >
                                <Star className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        <ContextMenuItem onClick={() => handleFlagVisitor(visitor.id)}>
                          <Flag className="w-4 h-4 mr-2" />
                          {visitor.isFlagged ? 'Remove from Watch List' : 'Add to Watch List'}
                        </ContextMenuItem>
                        <ContextMenuItem onClick={() => handleIndustryTag(visitor.id)}>
                          <Tag className="w-4 h-4 mr-2" />
                          Analyze with LinkedIn/Crunchbase
                        </ContextMenuItem>
                        <ContextMenuItem onClick={() => handleContactInfo(visitor.id)}>
                          <Star className="w-4 h-4 mr-2" />
                          Find Contact Information
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VisitorTable;
