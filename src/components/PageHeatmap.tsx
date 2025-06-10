
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Users, Eye } from 'lucide-react';

interface PageHeatmapProps {
  detailed?: boolean;
}

const PageHeatmap = ({ detailed = false }: PageHeatmapProps) => {
  const pageData = [
    {
      url: '/products/knowledge-management/',
      category: 'Product',
      views: 2847,
      uniqueVisitors: 1204,
      avgTime: '3m 45s',
      trend: '+15%',
      heatLevel: 'high'
    },
    {
      url: '/solutions/contact-center/',
      category: 'Product',
      views: 2103,
      uniqueVisitors: 892,
      avgTime: '2m 58s',
      trend: '+8%',
      heatLevel: 'high'
    },
    {
      url: '/company/careers/',
      category: 'Careers',
      views: 1876,
      uniqueVisitors: 1542,
      avgTime: '1m 32s',
      trend: '+22%',
      heatLevel: 'medium'
    },
    {
      url: '/pricing/',
      category: 'Commercial',
      views: 1654,
      uniqueVisitors: 723,
      avgTime: '4m 12s',
      trend: '+5%',
      heatLevel: 'high'
    },
    {
      url: '/company/investors/',
      category: 'Investor',
      views: 1321,
      uniqueVisitors: 456,
      avgTime: '2m 20s',
      trend: '+12%',
      heatLevel: 'medium'
    },
    {
      url: '/resources/whitepapers/',
      category: 'Resources',
      views: 987,
      uniqueVisitors: 634,
      avgTime: '5m 15s',
      trend: '+18%',
      heatLevel: 'medium'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Product': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Commercial': return 'bg-green-100 text-green-800 border-green-200';
      case 'Careers': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Investor': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Resources': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getHeatColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const displayData = detailed ? pageData : pageData.slice(0, 4);

  return (
    <Card className={detailed ? "col-span-full" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          {detailed ? 'Page Interest Heatmap - Detailed View' : 'Most Viewed Pages'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayData.map((page, index) => (
            <div key={page.url} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getHeatColor(page.heatLevel)}`}></div>
                    <span className="font-mono text-sm">{page.url}</span>
                    <Badge variant="outline" className={getCategoryColor(page.category)}>
                      {page.category}
                    </Badge>
                  </div>
                  {detailed && (
                    <div className="text-sm text-muted-foreground mb-2">
                      Average session time: {page.avgTime}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-green-600 text-sm flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {page.trend}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{page.views.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Total Views</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{page.uniqueVisitors.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Unique Visitors</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {detailed && (
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-2">Page Categories Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['Product', 'Commercial', 'Careers', 'Investor', 'Resources'].map((category) => {
                const categoryPages = pageData.filter(p => p.category === category);
                const totalViews = categoryPages.reduce((sum, p) => sum + p.views, 0);
                return (
                  <div key={category} className="text-center">
                    <Badge variant="outline" className={getCategoryColor(category)}>
                      {category}
                    </Badge>
                    <div className="text-sm font-medium mt-1">{totalViews.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Total Views</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PageHeatmap;
