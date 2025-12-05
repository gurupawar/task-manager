import React, { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import EditTaskModal from "./components/EditTaskModal";
import { useTasks } from "./hooks/useTasks";
import { type Task } from "./types/Task";

function App() {
  const {
    tasks,
    filteredTasks,
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
  } = useTasks();

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your tasks...</p>
        </div>
      </div>
    );
  }

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;
  const overdueCount = tasks.filter(
    (task) =>
      task.dueDate && !task.completed && new Date(task.dueDate) < new Date()
  ).length;

  return (
    <div className="app">
      <header>
        <h1>TaskMaster</h1>
        <p className="subtitle">Organize your work, one task at a time</p>
      </header>

      <main>
        <TaskForm
          onAddTask={addTask}
          availableCategories={availableCategories}
          onAddCategory={addCategory}
        />

        {tasks.length > 0 && (
          <>
            <div className="task-stats">
              <span className="stat">
                📋 Total: <strong>{tasks.length}</strong>
              </span>
              <span className="stat">
                ✅ Completed: <strong>{completedCount}</strong>
              </span>
              <span className="stat">
                🔄 Active: <strong>{activeCount}</strong>
              </span>
              {overdueCount > 0 && (
                <span className="stat overdue-stat">
                  ⚠️ Overdue: <strong>{overdueCount}</strong>
                </span>
              )}
            </div>

            <FilterBar
              filterType={filterType}
              sortType={sortType}
              searchQuery={searchQuery}
              selectedCategoryFilter={selectedCategoryFilter}
              availableCategories={availableCategories}
              onFilterChange={setFilterType}
              onSortChange={setSortType}
              onSearchChange={setSearchQuery}
              onCategoryFilterChange={setSelectedCategoryFilter}
            />

            {filteredTasks.length === 0 &&
              (searchQuery || selectedCategoryFilter) && (
                <div className="no-results">
                  <p>No tasks found matching your filters</p>
                </div>
              )}

            <button className="btn-clear-all" onClick={clearAllTasks}>
              Clear All Tasks
            </button>
          </>
        )}

        <TaskList
          tasks={filteredTasks}
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask}
          onEditTask={setEditingTask}
        />
      </main>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={editTask}
          availableCategories={availableCategories}
          onAddCategory={addCategory}
        />
      )}
    </div>
  );
}

export default App;
