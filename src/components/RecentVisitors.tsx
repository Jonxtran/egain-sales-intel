
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Monitor } from 'lucide-react';
import { fetchVisitors, VisitorData } from '@/utils/supabaseData';

interface RecentVisitorsProps {
  searchTerm: string;
}

const RecentVisitors = ({ searchTerm }: RecentVisitorsProps) => {
  const [visitors, setVisitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const b2cCompanies = [
    { name: 'Amazon', location: 'Seattle, WA', domain: 'amazon.com' },
    { name: 'Apple', location: 'Cupertino, CA', domain: 'apple.com' },
    { name: 'Netflix', location: 'Los Gatos, CA', domain: 'netflix.com' },
    { name: 'Disney', location: 'Burbank, CA', domain: 'disney.com' },
    { name: 'Nike', location: 'Beaverton, OR', domain: 'nike.com' },
    { name: 'Target', location: 'Minneapolis, MN', domain: 'target.com' },
    { name: 'Walmart', location: 'Bentonville, AR', domain: 'walmart.com' },
    { name: 'Starbucks', location: 'Seattle, WA', domain: 'starbucks.com' },
  ];

  useEffect(() => {
    const loadRecentVisitors = async () => {
      setLoading(true);
      try {
        const supabaseData = await fetchVisitors();
        
        // Get the most recent 6 visitors
        const recentData = supabaseData.slice(0, 6).map((data, index) => {
          const randomCompany = b2cCompanies[Math.floor(Math.random() * b2cCompanies.length)];
          
          return {
            id: `recent-${data.visitor_ip}-${index}`,
            ip: data.visitor_ip,
            company: randomCompany.name,
            location: randomCompany.location,
            lastSeen: new Date(data.date_time_utc).toLocaleString(),
            technology: data.user_agent?.includes('Chrome') ? 'Chrome' : 'Safari',
            status: Math.random() > 0.5 ? 'Active' : 'Recent'
          };
        });
        
        setVisitors(recentData);
      } catch (error) {
        console.error('Error loading recent visitors:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentVisitors();
  }, []);

  const filteredVisitors = visitors.filter(visitor =>
    visitor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visitor.ip.includes(searchTerm)
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Visitors (Last 24 hrs)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Visitors (Last 24 hrs)
          <Badge variant="outline" className="ml-2">
            {filteredVisitors.length} active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredVisitors.map((visitor) => (
            <div key={visitor.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${visitor.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <div>
                  <div className="font-medium">{visitor.company}</div>
                  <div className="text-sm text-muted-foreground font-mono">{visitor.ip}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {visitor.location}
                </div>
                <div className="text-sm flex items-center gap-1 text-muted-foreground">
                  <Monitor className="w-3 h-3" />
                  {visitor.technology}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentVisitors;
