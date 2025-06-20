
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
      name: 'Farmers Insurance',
      visits: 28,
      engagement: 85,
      location: 'Los Angeles, CA',
      industry: 'Insurance',
      priority: 'High',
      employees: '48,000+',
      revenue: '$22B'
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
          <CardTitle className="flex items-center gap-2 text-lg">
            <Star className="w-5 h-5" />
            High-Priority Companies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCompanies.map((company, idx) => (
              <div key={idx} className="p-4 border rounded-lg hover:bg-muted/50">
                <div className="space-y-3">
                  {/* Company Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold break-words">{company.name}</h4>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="break-words">{company.location}</span>
                        </span>
                        <Badge variant="outline" className="text-xs whitespace-nowrap">
                          {company.industry}
                        </Badge>
                        <Badge variant="outline" className={`text-xs whitespace-nowrap ${getPriorityColor(company.priority)}`}>
                          {company.priority} Priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Company Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                    <div className="p-2 bg-muted/30 rounded">
                      <div className="text-sm font-medium">{company.visits}</div>
                      <div className="text-xs text-muted-foreground">Visits</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded">
                      <div className="text-sm font-medium">{company.engagement}%</div>
                      <div className="text-xs text-muted-foreground">Engagement</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded">
                      <div className="text-sm font-medium break-words">{company.employees}</div>
                      <div className="text-xs text-muted-foreground">Employees</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded">
                      <div className="text-sm font-medium break-words">{company.revenue}</div>
                      <div className="text-xs text-muted-foreground">Revenue</div>
                    </div>
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
