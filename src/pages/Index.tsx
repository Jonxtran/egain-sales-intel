
import { useState, useEffect } from 'react';
import { TrendingUp, Users, Eye, Clock, Building2, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VisitorTable from '@/components/VisitorTable';
import CompanyInsights from '@/components/CompanyInsights';
import EngagementMetrics from '@/components/EngagementMetrics';
import SearchFilters from '@/components/SearchFilters';
import TopCompanies from '@/components/TopCompanies';
import RecentVisitors from '@/components/RecentVisitors';
import HotLeads from '@/components/HotLeads';
import PageHeatmap from '@/components/PageHeatmap';
import IntelligentSearch from '@/components/IntelligentSearch';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [uniqueCompanies, setUniqueCompanies] = useState(0);
  const [hotLeads, setHotLeads] = useState(0);
  const [topPages, setTopPages] = useState(0);

  useEffect(() => {
    // Simulate loading stats
    setTotalVisitors(1247);
    setUniqueCompanies(342);
    setHotLeads(89);
    setTopPages(156);
  }, []);

  return (
    <div className="min-h-screen bg-background p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground break-words">
              eGain Sales Intelligence
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Visitor insights and lead intelligence dashboard
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 w-fit">
              Live Data
            </Badge>
            <div className="w-full sm:w-auto">
              <SearchFilters />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium leading-tight">
                Total Visitors
              </CardTitle>
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{totalVisitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium leading-tight">
                Unique Companies
              </CardTitle>
              <Building2 className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{uniqueCompanies}</div>
              <p className="text-xs text-muted-foreground">
                +8% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium leading-tight">
                Hot Leads
              </CardTitle>
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{hotLeads}</div>
              <p className="text-xs text-muted-foreground">
                High engagement prospects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium leading-tight">
                Top Pages Viewed
              </CardTitle>
              <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-lg sm:text-2xl font-bold">{topPages}</div>
              <p className="text-xs text-muted-foreground">
                Most popular content
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Intelligent Search Bar */}
        <IntelligentSearch 
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 min-w-fit">
              <TabsTrigger value="dashboard" className="text-xs sm:text-sm">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="visitors" className="text-xs sm:text-sm">
                Visitors
              </TabsTrigger>
              <TabsTrigger value="heatmap" className="text-xs sm:text-sm">
                Heatmap
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm">
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              <TopCompanies />
              <RecentVisitors searchTerm={searchTerm} />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              <HotLeads />
              <PageHeatmap />
            </div>
          </TabsContent>

          <TabsContent value="visitors" className="space-y-4 sm:space-y-6">
            <VisitorTable searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-4 sm:space-y-6">
            <PageHeatmap detailed={true} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              <CompanyInsights />
              <EngagementMetrics />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
