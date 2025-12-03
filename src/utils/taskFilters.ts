import { type Task } from "../types/Task";
import { FilterType, SortType } from "../types/Filters";

export const filterTasks = (
  tasks: Task[],
  filterType: FilterType,
  searchQuery: string
): Task[] => {
  let filtered = [...tasks];

  // Apply filter
  switch (filterType) {
    case FilterType.ACTIVE:
      filtered = filtered.filter((task) => !task.completed);
      break;
    case FilterType.COMPLETED:
      filtered = filtered.filter((task) => task.completed);
      break;
    case FilterType.ALL:
    default:
      // No filtering needed
      break;
  }

  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (task) =>
        task.title.toLocaleLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
    );
  }

  return filtered;
};

export const sortTasks = (tasks: Task[], sortType: SortType): Task[] => {
  const sorted = [...tasks];

  switch (sortType) {
    case SortType.DATE_DESC:
      return sorted.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );

    case SortType.DATE_ASC:
      return sorted.sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );

    case SortType.TITLE_ASC:
      return sorted.sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );

    case SortType.TITLE_DESC:
      return sorted.sort((a, b) =>
        b.title.toLowerCase().localeCompare(a.title.toLowerCase())
      );

    default:
      return sorted;
  }
};
