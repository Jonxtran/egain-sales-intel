
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Clock, Globe, Monitor, Target, TrendingUp } from 'lucide-react';

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

interface VisitorDetailsProps {
  visitor: Visitor;
}

const VisitorDetails = ({ visitor }: VisitorDetailsProps) => {
  const pageHistory = [
    { page: '/company/investors/', time: '2m 15s', timestamp: '10:45 AM' },
    { page: '/knowledge-management-in-contact-centers/', time: '3m 42s', timestamp: '10:47 AM' },
    { page: '/company/careers/', time: '1m 18s', timestamp: '10:51 AM' },
    { page: '/products/email-management-software/', time: '2m 30s', timestamp: '10:52 AM' },
    { page: '/company/events/', time: '45s', timestamp: '10:55 AM' }
  ];

  const companyInfo = {
    industry: 'Technology',
    employees: '10,000+',
    revenue: '$50B+',
    headquarters: visitor.location,
    website: 'microsoft.com',
    description: 'Global technology leader in cloud computing, productivity software, and enterprise solutions.'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Visitor Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Visitor Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-muted-foreground">IP Address</span>
              <p className="font-mono text-sm">{visitor.ip}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Domain</span>
              <p className="text-sm">{visitor.domain}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-muted-foreground">Location</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <p className="text-sm">{visitor.location}</p>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Technology</span>
              <div className="flex items-center gap-1">
                <Monitor className="w-3 h-3" />
                <p className="text-sm">{visitor.technology}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-muted-foreground">Engagement Level</span>
              <Badge variant="outline" className="mt-1">
                {visitor.engagement}
              </Badge>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Last Seen</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <p className="text-sm">{visitor.lastSeen}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Intelligence */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Company Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold">{visitor.company}</h4>
            <p className="text-sm text-muted-foreground mt-1">{companyInfo.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-muted-foreground">Industry</span>
              <p className="text-sm">{companyInfo.industry}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Employees</span>
              <p className="text-sm">{companyInfo.employees}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-muted-foreground">Revenue</span>
              <p className="text-sm">{companyInfo.revenue}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">Website</span>
              <p className="text-sm">{companyInfo.website}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Intent Signals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Intent Signals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {visitor.intent.map((intent, idx) => (
              <Badge key={idx} variant="secondary">
                {intent}
              </Badge>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <h5 className="font-medium">Behavioral Insights</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• High engagement with knowledge management content</li>
              <li>• Visited pricing and solution pages multiple times</li>
              <li>• Downloaded technical documentation</li>
              <li>• Showed interest in enterprise solutions</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Page History */}
      <Card>
        <CardHeader>
          <CardTitle>Page Visit History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pageHistory.map((page, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium">{page.page}</p>
                  <p className="text-xs text-muted-foreground">{page.timestamp}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {page.time}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorDetails;
