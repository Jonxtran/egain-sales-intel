
import { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, Users, Eye, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VisitorTable from '@/components/VisitorTable';
import CompanyInsights from '@/components/CompanyInsights';
import EngagementMetrics from '@/components/EngagementMetrics';
import SearchFilters from '@/components/SearchFilters';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('visitors');
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [uniqueCompanies, setUniqueCompanies] = useState(0);
  const [highEngagement, setHighEngagement] = useState(0);

  useEffect(() => {
    // Simulate loading stats
    setTotalVisitors(1247);
    setUniqueCompanies(342);
    setHighEngagement(89);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">eGain Sales Intelligence</h1>
            <p className="text-muted-foreground mt-1">Visitor insights and lead intelligence dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Live Data
            </Badge>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Companies</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueCompanies}</div>
              <p className="text-xs text-muted-foreground">
                +8% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Engagement</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{highEngagement}</div>
              <p className="text-xs text-muted-foreground">
                Prospects worth prioritizing
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4m 32s</div>
              <p className="text-xs text-muted-foreground">
                +18% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search by company, domain, IP, or visitor behavior..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <SearchFilters />
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visitors">Visitor Intelligence</TabsTrigger>
            <TabsTrigger value="companies">Company Insights</TabsTrigger>
            <TabsTrigger value="engagement">Engagement Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="visitors" className="space-y-6">
            <VisitorTable searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <CompanyInsights />
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <EngagementMetrics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
