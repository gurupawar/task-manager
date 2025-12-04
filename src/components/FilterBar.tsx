import type React from "react";
import { FilterType, SortType } from "../types/Filters";
import "./FilterBar.css";

interface FilterBarProps {
  filterType: FilterType;
  sortType: SortType;
  searchQuery: string;
  onFilterChange: (sort: FilterType) => void;
  onSortChange: (sort: SortType) => void;
  onSearchChange: (query: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filterType,
  sortType,
  searchQuery,
  onFilterChange,
  onSortChange,
  onSearchChange,
}) => {
  return (
    <div className="filter-bar">
      {/* Search Input */}
      <div className="search-box">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${
            filterType === FilterType.ALL ? "active" : ""
          }`}
          onClick={() => onFilterChange(FilterType.ALL)}
        >
          All
        </button>
        <button
          className={`filter-btn ${
            filterType === FilterType.ACTIVE ? "active" : ""
          }`}
          onClick={() => onFilterChange(FilterType.ACTIVE)}
        >
          Active
        </button>
        <button
          className={`filter-btn ${
            filterType === FilterType.COMPLETED ? "active" : ""
          }`}
          onClick={() => onFilterChange(FilterType.COMPLETED)}
        >
          Completed
        </button>
      </div>

      {/* Sort Dropdown */}
      <div className="sort-box">
        <label htmlFor="sort-select">Sort by:</label>
        <select
          id="sort-select"
          value={sortType}
          onChange={(e) => onSortChange(e.target.value as SortType)}
          className="sort-select"
        >
          <option value={SortType.DATE_DESC}>Newest First</option>
          <option value={SortType.DATE_ASC}>Oldest First</option>
          <option value={SortType.TITLE_ASC}>Title (A-Z)</option>
          <option value={SortType.TITLE_DESC}>Title (Z-A)</option>
        </select>
      </div>
    </div>
  );
};
export default FilterBar;
