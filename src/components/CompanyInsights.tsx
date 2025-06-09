import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building, TrendingUp, Users, MapPin, Star } from 'lucide-react';

const CompanyInsights = () => {
  const topCompanies = [
    {
      name: 'Nvidia Corporation',
      visits: 45,
      engagement: 92,
      location: 'Santa Clara, CA',
      industry: 'Technology',
      priority: 'High',
      employees: '29,000+',
      revenue: '$61B'
    },
    {
      name: 'Home Depot Inc',
      visits: 32,
      engagement: 88,
      location: 'Atlanta, GA',
      industry: 'Retail',
      priority: 'High',
      employees: '500,000+',
      revenue: '$157B'
    },
    {
      name: 'Amazon Web Services',
      visits: 28,
      engagement: 85,
      location: 'Seattle, WA',
      industry: 'Cloud Services',
      priority: 'High',
      employees: '1,500,000+',
      revenue: '$514B'
    },
    {
      name: 'JPMorgan Chase',
      visits: 24,
      engagement: 79,
      location: 'New York, NY',
      industry: 'Financial Services',
      priority: 'Medium',
      employees: '271,000+',
      revenue: '$128B'
    },
    {
      name: 'Deutsche Bank AG',
      visits: 18,
      engagement: 72,
      location: 'Frankfurt, Germany',
      industry: 'Banking',
      priority: 'Medium',
      employees: '84,000+',
      revenue: '$25B'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Industry Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="w-5 h-5" />
              Top Industries
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Technology</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <Progress value={35} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Financial Services</span>
                <span className="text-sm font-medium">28%</span>
              </div>
              <Progress value={28} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Healthcare</span>
                <span className="text-sm font-medium">22%</span>
              </div>
              <Progress value={22} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Manufacturing</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">North America</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Europe</span>
                <span className="text-sm font-medium">32%</span>
              </div>
              <Progress value={32} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Asia Pacific</span>
                <span className="text-sm font-medium">18%</span>
              </div>
              <Progress value={18} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Other</span>
                <span className="text-sm font-medium">5%</span>
              </div>
              <Progress value={5} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="w-5 h-5" />
              Company Size
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Enterprise (10K+)</span>
                <span className="text-sm font-medium">42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Large (1K-10K)</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <Progress value={35} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Mid-Market (100-1K)</span>
                <span className="text-sm font-medium">18%</span>
              </div>
              <Progress value={18} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Small (1-100)</span>
                <span className="text-sm font-medium">5%</span>
              </div>
              <Progress value={5} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Companies Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5" />
            High-Priority Companies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCompanies.map((company, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="font-semibold">{company.name}</h4>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {company.location}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {company.industry}
                        </Badge>
                        <Badge variant="outline" className={getPriorityColor(company.priority)}>
                          {company.priority} Priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-sm font-medium">{company.visits}</div>
                    <div className="text-xs text-muted-foreground">Visits</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{company.engagement}%</div>
                    <div className="text-xs text-muted-foreground">Engagement</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{company.employees}</div>
                    <div className="text-xs text-muted-foreground">Employees</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{company.revenue}</div>
                    <div className="text-xs text-muted-foreground">Revenue</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyInsights;
