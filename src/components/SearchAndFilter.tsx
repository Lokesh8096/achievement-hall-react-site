
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
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
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search students by name..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Toggle */}
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
              Active
            </span>
          )}
        </Button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="ghost" onClick={onClearFilters} className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card className="mt-4">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Team Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Team
                </label>
                <Select value={selectedTeam} onValueChange={onFilterByTeam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a team..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Teams</SelectItem>
                    {teams.map((team) => (
                      <SelectItem key={team} value={team}>
                        {team}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Score Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Score Range: {localScoreRange[0]} - {localScoreRange[1]}
                </label>
                <div className="px-3">
                  <Slider
                    value={localScoreRange}
                    onValueChange={handleScoreChange}
                    max={100}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
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
