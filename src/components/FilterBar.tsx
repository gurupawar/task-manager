import React from "react";
import { FilterType, SortType } from "../types/Filters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filterType: FilterType;
  sortType: SortType;
  searchQuery: string;
  selectedCategoryFilter: string | null;
  availableCategories: string[];
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
  onSearchChange: (query: string) => void;
  onCategoryFilterChange: (category: string | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filterType,
  sortType,
  searchQuery,
  selectedCategoryFilter,
  availableCategories,
  onFilterChange,
  onSortChange,
  onSearchChange,
  onCategoryFilterChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={filterType === FilterType.ALL ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(FilterType.ALL)}
        >
          All
        </Button>
        <Button
          variant={filterType === FilterType.ACTIVE ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(FilterType.ACTIVE)}
        >
          Active
        </Button>
        <Button
          variant={filterType === FilterType.COMPLETED ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(FilterType.COMPLETED)}
        >
          Completed
        </Button>
      </div>

      {/* Category Filter */}
      {availableCategories.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Filter by category:</label>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategoryFilter === null ? "default" : "outline"}
              className={cn(
                "cursor-pointer",
                selectedCategoryFilter === null && "ring-2 ring-primary"
              )}
              onClick={() => onCategoryFilterChange(null)}
            >
              All Categories
            </Badge>
            {availableCategories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategoryFilter === category ? "default" : "outline"}
                className={cn(
                  "cursor-pointer",
                  selectedCategoryFilter === category && "ring-2 ring-primary"
                )}
                onClick={() => onCategoryFilterChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <label htmlFor="sort-select" className="text-sm font-medium whitespace-nowrap">
          Sort by:
        </label>
        <Select value={sortType} onValueChange={(value) => onSortChange(value as SortType)}>
          <SelectTrigger id="sort-select" className="w-full sm:w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SortType.MANUAL}>Manual Order</SelectItem>
            <SelectItem value={SortType.DATE_DESC}>Newest First</SelectItem>
            <SelectItem value={SortType.DATE_ASC}>Oldest First</SelectItem>
            <SelectItem value={SortType.TITLE_ASC}>Title (A-Z)</SelectItem>
            <SelectItem value={SortType.TITLE_DESC}>Title (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
