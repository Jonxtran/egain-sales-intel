
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, TrendingUp, Users } from 'lucide-react';

const TopCompanies = () => {
  const topCompanies = [
    { name: 'Apple', visits: 45, trend: '+15%', score: 'High', employees: '164,000+' },
    { name: 'Netflix', visits: 38, trend: '+8%', score: 'High', employees: '12,800+' },
    { name: 'Tesla', visits: 32, trend: '+22%', score: 'Medium', employees: '127,000+' },
    { name: 'Nike', visits: 28, trend: '+5%', score: 'High', employees: '79,100+' },
    { name: 'Starbucks', visits: 24, trend: '+12%', score: 'Medium', employees: '383,000+' },
    { name: 'Target', visits: 19, trend: '+3%', score: 'Low', employees: '450,000+' },
  ];

  const getScoreColor = (score: string) => {
    switch (score) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Top Companies by Visit Volume
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topCompanies.map((company, index) => (
            <div key={company.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-sm font-medium">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium">{company.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {company.employees}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-medium">{company.visits} visits</div>
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {company.trend}
                  </div>
                </div>
                <Badge variant="outline" className={getScoreColor(company.score)}>
                  {company.score}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopCompanies;
