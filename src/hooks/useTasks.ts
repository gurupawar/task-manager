import { useState, useEffect, useMemo } from "react";
import type { Task } from "../types/Task";
import { loadTasks, saveTasks } from "../utils/localStorage";
import { filterTasks, sortTasks } from "../utils/taskFilters";
import { FilterType, SortType } from "../types/Filters";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  const [sortType, setSortType] = useState<SortType>(SortType.DATE_DESC);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const loadedTasks = loadTasks();

    setTasks(loadedTasks);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  // Memoized filtered and sorted tasks
  const filteredAndSortedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filterType, searchQuery);
    return sortTasks(filtered, sortType);
  }, [tasks, filterType, sortType, searchQuery]);

  const addTask = (title: string, description: string): void => {
    const neweTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
    };

    setTasks((prevTasks) => [...prevTasks, neweTask]);
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

  return {
    tasks,
    filteredTasks: filteredAndSortedTasks,
    isLoading,
    filterType,
    sortType,
    searchQuery,
    addTask,
    toggleComplete,
    deleteTask,
    clearAllTasks,
    setFilterType,
    setSortType,
    setSearchQuery,
  };
};
