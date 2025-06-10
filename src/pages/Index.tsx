
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
            <SearchFilters />
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
              <Building2 className="h-4 w-4 text-muted-foreground" />
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
              <CardTitle className="text-sm font-medium">Hot Leads</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{hotLeads}</div>
              <p className="text-xs text-muted-foreground">
                High engagement prospects
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Pages Viewed</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{topPages}</div>
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Main Dashboard</TabsTrigger>
            <TabsTrigger value="visitors">Visitor Details</TabsTrigger>
            <TabsTrigger value="heatmap">Page Heatmap</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopCompanies />
              <RecentVisitors searchTerm={searchTerm} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HotLeads />
              <PageHeatmap />
            </div>
          </TabsContent>

          <TabsContent value="visitors" className="space-y-6">
            <VisitorTable searchTerm={searchTerm} />
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-6">
            <PageHeatmap detailed={true} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
