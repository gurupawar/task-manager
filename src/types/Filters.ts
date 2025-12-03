export enum FilterType {
  ALL = "all",
  ACTIVE = "active",
  COMPLETED = "completed",
}

export enum SortType {
  DATE_DESC = "date_desc",
  DATE_ASC = "date_asc",
  TITLE_ASC = "title_asc",
  TITLE_DESC = "title_desc",
}

export interface FilterState {
  filterType: FilterType;
  sortType: SortType;
  searchQuery: string;
}
