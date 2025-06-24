
import React, { useState } from 'react';
import { Search, Filter, X, Sliders } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilterByTeam: (team: string) => void;
  onFilterByScore: (range: [number, number]) => void;
  onClearFilters: () => void;
  teams: string[];
  searchQuery: string;
  selectedTeam: string;
  scoreRange: [number, number];
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  onFilterByTeam,
  onFilterByScore,
  onClearFilters,
  teams,
  searchQuery,
  selectedTeam,
  scoreRange,
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [localScoreRange, setLocalScoreRange] = useState<[number, number]>(scoreRange);

  const handleScoreChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setLocalScoreRange(range);
    onFilterByScore(range);
  };

  const hasActiveFilters = searchQuery || selectedTeam || scoreRange[0] > 0 || scoreRange[1] < 100;

  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search students by name..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {/* Filter Toggle */}
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="cricket-button-secondary flex items-center gap-2"
        >
          <Sliders className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1 ml-1">
              Active
            </span>
          )}
        </Button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            onClick={onClearFilters} 
            className="flex items-center gap-2 text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <X className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card className="mt-4 cricket-card border-slate-600">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Team Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Filter by Team
                </label>
                <Select value={selectedTeam} onValueChange={onFilterByTeam}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Select a team..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="" className="text-white hover:bg-slate-700">All Teams</SelectItem>
                    {teams.map((team) => (
                      <SelectItem key={team} value={team} className="text-white hover:bg-slate-700">
                        {team}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Score Range Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Score Range: <span className="text-orange-500 font-semibold">{localScoreRange[0]} - {localScoreRange[1]}</span>
                </label>
                <div className="px-3">
                  <Slider
                    value={localScoreRange}
                    onValueChange={handleScoreChange}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full [&>span:first-child]:bg-slate-600 [&>span:first-child>span]:bg-orange-500 [&>span:last-child>span]:bg-orange-500 [&>span:last-child>span]:border-orange-500"
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchAndFilter;
