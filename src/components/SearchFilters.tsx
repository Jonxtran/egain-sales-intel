
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Filter, CalendarDays, MapPin, Building } from 'lucide-react';

const SearchFilters = () => {
  const [selectedEngagement, setSelectedEngagement] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);

  const engagementLevels = ['High', 'Medium', 'Low'];
  const industries = ['Technology', 'Financial Services', 'Healthcare', 'Manufacturing', 'Retail'];
  const regions = ['North America', 'Europe', 'Asia Pacific', 'Other'];

  const handleEngagementChange = (value: string) => {
    setSelectedEngagement(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleIndustryChange = (value: string) => {
    setSelectedIndustries(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const handleRegionChange = (value: string) => {
    setSelectedRegions(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const clearAllFilters = () => {
    setSelectedEngagement([]);
    setSelectedIndustries([]);
    setSelectedRegions([]);
  };

  const totalFilters = selectedEngagement.length + selectedIndustries.length + selectedRegions.length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
          {totalFilters > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
              {totalFilters}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Filters</h4>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          </div>

          {/* Engagement Level */}
          <div>
            <Label className="text-sm font-medium flex items-center gap-2 mb-3">
              <CalendarDays className="w-4 h-4" />
              Engagement Level
            </Label>
            <div className="space-y-2">
              {engagementLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={level}
                    checked={selectedEngagement.includes(level)}
                    onCheckedChange={() => handleEngagementChange(level)}
                  />
                  <Label htmlFor={level} className="text-sm">
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Industry */}
          <div>
            <Label className="text-sm font-medium flex items-center gap-2 mb-3">
              <Building className="w-4 h-4" />
              Industry
            </Label>
            <div className="space-y-2">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center space-x-2">
                  <Checkbox
                    id={industry}
                    checked={selectedIndustries.includes(industry)}
                    onCheckedChange={() => handleIndustryChange(industry)}
                  />
                  <Label htmlFor={industry} className="text-sm">
                    {industry}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Region */}
          <div>
            <Label className="text-sm font-medium flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4" />
              Region
            </Label>
            <div className="space-y-2">
              {regions.map((region) => (
                <div key={region} className="flex items-center space-x-2">
                  <Checkbox
                    id={region}
                    checked={selectedRegions.includes(region)}
                    onCheckedChange={() => handleRegionChange(region)}
                  />
                  <Label htmlFor={region} className="text-sm">
                    {region}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <Button className="w-full">
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchFilters;
