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
  const [sortType, setSortType] = useState<SortType>(SortType.DATE_DESC);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<
    string | null
  >(null);

  // Load tasks and categories from localStorage
  useEffect(() => {
    const loadedTasks = loadTasks();
    const savedCategories = localStorage.getItem(CATEGORIES_KEY);

    setTasks(loadedTasks);
    if (savedCategories) {
      setAvailableCategories(JSON.parse(savedCategories));
    }
    setIsLoading(false);
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    if (!isLoading) {
      saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  // Save categories to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(availableCategories));
    }
  }, [availableCategories, isLoading]);

  // Memoized filtered and sorted tasks
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
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
      dueDate,
      categories,
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
    setFilterType,
    setSortType,
    setSearchQuery,
    setSelectedCategoryFilter,
  };
};
