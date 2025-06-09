
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Clock, Eye, Target, Activity, Calendar } from 'lucide-react';

const EngagementMetrics = () => {
  const engagementData = [
    {
      metric: 'Average Session Duration',
      value: '4m 32s',
      change: '+18%',
      trend: 'up',
      description: 'Time spent per session'
    },
    {
      metric: 'Pages per Session',
      value: '6.8',
      change: '+12%',
      trend: 'up',
      description: 'Average pages viewed'
    },
    {
      metric: 'Bounce Rate',
      value: '32%',
      change: '-8%',
      trend: 'down',
      description: 'Single page visits'
    },
    {
      metric: 'Return Visitors',
      value: '28%',
      change: '+5%',
      trend: 'up',
      description: 'Returning users'
    }
  ];

  const topPages = [
    { page: '/knowledge-management-in-contact-centers/', visits: 342, engagement: 85 },
    { page: '/company/investors/', visits: 298, engagement: 72 },
    { page: '/products/email-management-software/', visits: 287, engagement: 78 },
    { page: '/company/careers/', visits: 245, engagement: 65 },
    { page: '/ai-knowledge-for-field-service/', visits: 189, engagement: 82 }
  ];

  const behaviorPatterns = [
    {
      pattern: 'Product Research Journey',
      percentage: 45,
      description: 'Visitors exploring multiple product pages and documentation'
    },
    {
      pattern: 'Pricing Investigation',
      percentage: 32,
      description: 'Extended time on pricing and ROI calculator pages'
    },
    {
      pattern: 'Technical Deep Dive',
      percentage: 28,
      description: 'Focus on technical documentation and API references'
    },
    {
      pattern: 'Competitive Analysis',
      percentage: 23,
      description: 'Comparing features and downloading comparison guides'
    }
  ];

  const timeAnalysis = [
    { timeSlot: '9:00 AM - 12:00 PM', visits: 35, engagement: 'High' },
    { timeSlot: '12:00 PM - 3:00 PM', visits: 28, engagement: 'Medium' },
    { timeSlot: '3:00 PM - 6:00 PM', visits: 42, engagement: 'High' },
    { timeSlot: '6:00 PM - 9:00 PM', visits: 18, engagement: 'Low' }
  ];

  return (
    <div className="space-y-6">
      {/* Engagement Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {engagementData.map((item, idx) => (
          <Card key={idx}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.metric}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className={`w-3 h-3 ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={`text-xs ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
                <Activity className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Performing Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Top Performing Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages.map((page, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium truncate">{page.page}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">{page.visits} visits</span>
                      <Progress value={page.engagement} className="w-20 h-1" />
                      <span className="text-xs">{page.engagement}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Behavioral Patterns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Behavioral Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {behaviorPatterns.map((pattern, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{pattern.pattern}</span>
                    <span className="text-sm">{pattern.percentage}%</span>
                  </div>
                  <Progress value={pattern.percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">{pattern.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time-based Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Peak Engagement Times
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {timeAnalysis.map((time, idx) => (
              <div key={idx} className="p-4 border rounded-lg text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{time.timeSlot}</span>
                </div>
                <div className="text-2xl font-bold mb-1">{time.visits}%</div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    time.engagement === 'High' ? 'bg-green-100 text-green-800 border-green-200' :
                    time.engagement === 'Medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                    'bg-gray-100 text-gray-800 border-gray-200'
                  }`}
                >
                  {time.engagement} Engagement
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EngagementMetrics;
