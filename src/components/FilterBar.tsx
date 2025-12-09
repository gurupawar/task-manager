import React from "react";
import { SortType } from "../types/Filters";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface FilterBarProps {
  sortType: SortType;
  searchQuery: string;
  onSortChange: (sort: SortType) => void;
  onSearchChange: (query: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  sortType,
  searchQuery,
  onSortChange,
  onSearchChange,
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
