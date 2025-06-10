
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Eye, TrendingUp, Clock } from 'lucide-react';

const HotLeads = () => {
  const hotLeads = [
    {
      company: 'Apple',
      score: 95,
      pages: 12,
      duration: '8m 45s',
      lastActivity: '2 mins ago',
      intent: ['Enterprise Solutions', 'Knowledge Management'],
      status: 'Hot'
    },
    {
      company: 'Netflix',
      score: 88,
      pages: 8,
      duration: '6m 20s',
      lastActivity: '15 mins ago',
      intent: ['Customer Service', 'AI Solutions'],
      status: 'Warm'
    },
    {
      company: 'Tesla',
      score: 82,
      pages: 6,
      duration: '4m 15s',
      lastActivity: '32 mins ago',
      intent: ['Contact Center', 'Analytics'],
      status: 'Warm'
    },
    {
      company: 'Nike',
      score: 76,
      pages: 5,
      duration: '3m 40s',
      lastActivity: '1 hr ago',
      intent: ['Digital Transformation'],
      status: 'Interested'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot': return 'bg-red-100 text-red-800 border-red-200';
      case 'Warm': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Interested': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-red-600';
    if (score >= 80) return 'text-orange-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-red-500" />
          Hot Leads (High Engagement)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {hotLeads.map((lead) => (
            <div key={lead.company} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{lead.company}</h4>
                    <Badge variant="outline" className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Last activity: {lead.lastActivity}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(lead.score)}`}>
                    {lead.score}
                  </div>
                  <div className="text-sm text-muted-foreground">Lead Score</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span>{lead.pages} pages viewed</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{lead.duration} session time</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm font-medium mb-1">Intent Signals:</div>
                <div className="flex flex-wrap gap-1">
                  {lead.intent.map((intent, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {intent}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Full Profile
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HotLeads;
