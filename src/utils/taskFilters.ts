import { type Task } from "../types/Task";
import { FilterType, SortType } from "../types/Filters";

export const filterTasks = (
  tasks: Task[],
  filterType: FilterType,
  searchQuery: string,
  categoryFilter: string | null = null
): Task[] => {
  let filtered = [...tasks];

  // Apply completion filter
  switch (filterType) {
    case FilterType.ACTIVE:
      filtered = filtered.filter((task) => !task.completed);
      break;
    case FilterType.COMPLETED:
      filtered = filtered.filter((task) => task.completed);
      break;
    case FilterType.ALL:
    default:
      break;
  }

  // Apply category filter
  if (categoryFilter) {
    filtered = filtered.filter(
      (task) => task.categories && task.categories.includes(categoryFilter)
    );
  }

  // Apply search
  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        (task.categories &&
          task.categories.some((cat) => cat.toLowerCase().includes(query)))
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
