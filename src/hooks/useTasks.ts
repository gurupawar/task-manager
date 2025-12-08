import { useState, useEffect, useMemo } from "react";
import { type Task } from "../types/Task";
import { FilterType, SortType } from "../types/Filters";
import { saveTasks, loadTasks } from "../utils/localStorage";
import { filterTasks, sortTasks } from "../utils/taskFilters";

const CATEGORIES_KEY = "taskmaster_categories";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [sortType, setSortType] = useState<SortType>(SortType.MANUAL);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<
    string | null
  >(null);

  useEffect(() => {
    const loadedTasks = loadTasks();
    const savedCategories = localStorage.getItem(CATEGORIES_KEY);

    setTasks(loadedTasks);
    if (savedCategories) {
      setAvailableCategories(JSON.parse(savedCategories));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(availableCategories));
    }
  }, [availableCategories, isLoading]);

  const filteredAndSortedTasks = useMemo(() => {
    const filtered = filterTasks(
      tasks,
      filterType,
      searchQuery,
      selectedCategoryFilter
    );
    return sortTasks(filtered, sortType);
  }, [tasks, filterType, sortType, searchQuery, selectedCategoryFilter]);

  const addTask = (
    title: string,
    description: string,
    dueDate?: Date,
    categories: string[] = []
  ): void => {
    const maxOrder =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.order || 0)) : -1;

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
      dueDate,
      categories,
      order: maxOrder + 1,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const editTask = (
    id: string,
    title: string,
    description: string,
    dueDate?: Date,
    categories: string[] = []
  ): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title, description, dueDate, categories }
          : task
      )
    );
  };

  const toggleComplete = (id: string): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const clearAllTasks = (): void => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      setTasks([]);
    }
  };

  const addCategory = (category: string): void => {
    if (!availableCategories.includes(category)) {
      setAvailableCategories((prev) => [...prev, category]);
    }
  };

  const deleteCategory = (category: string): void => {
    setAvailableCategories((prev) => prev.filter((cat) => cat !== category));
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({
        ...task,
        categories: task.categories.filter((cat) => cat !== category),
      }))
    );
    if (selectedCategoryFilter === category) {
      setSelectedCategoryFilter(null);
    }
  };

  const reorderTasks = (reorderedTasks: Task[]): void => {
    setTasks(reorderedTasks);
    setSortType(SortType.MANUAL);
  };

  const importTasks = (
    importedTasks: Task[],
    importedCategories: string[]
  ): void => {
    setTasks(importedTasks);
    setAvailableCategories(importedCategories);
  };

  return {
    tasks,
    filteredTasks: filteredAndSortedTasks,
    isLoading,
    filterType,
    sortType,
    searchQuery,
    availableCategories,
    selectedCategoryFilter,
    addTask,
    editTask,
    toggleComplete,
    deleteTask,
    clearAllTasks,
    addCategory,
    deleteCategory,
    reorderTasks,
    importTasks,
    setFilterType,
    setSortType,
    setSearchQuery,
    setSelectedCategoryFilter,
  };
};
