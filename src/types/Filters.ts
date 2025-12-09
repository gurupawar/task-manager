export const FilterType = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
} as const;

export const SortType = {
  MANUAL: "manual",
  DATE_DESC: "date_desc",
  DATE_ASC: "date_asc",
  TITLE_ASC: "title_asc",
  TITLE_DESC: "title_desc",
} as const;

export type FilterType = typeof FilterType[keyof typeof FilterType];
export type SortType = typeof SortType[keyof typeof SortType];

export interface FilterState {
  filterType: FilterType;
  sortType: SortType;
  searchQuery: string;
}
