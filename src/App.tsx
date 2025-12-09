import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import { useTheme } from "./context/ThemeContext";
import { type Task } from "./types/Task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import EditTaskModal from "./components/EditTaskModal";
import ExportImport from "./components/ExportImport";
import Statistics from "./components/Statistics";
import Sidebar from "./components/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Moon,
  Sun,
  BarChart3,
  Loader2,
  FileText,
  Database,
  Menu,
  X,
} from "lucide-react";

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
    addCategory,
    deleteCategory,
    reorderTasks,
    importTasks,
    setFilterType,
    setSortType,
    setSearchQuery,
    setSelectedCategoryFilter,
  } = useTasks();

  const { theme, toggleTheme } = useTheme();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [showDataManagement, setShowDataManagement] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your tasks...</p>
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Full-width Header */}
      <header className="fixed top-0 left-0 right-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo with hamburger */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                title="Toggle menu"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Task Manager
                </span>
              </h1>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowDataManagement(true)}
                title="Data Management"
              >
                <Database className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowStats(true)}
                title="View Statistics"
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden relative pt-[73px]">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 top-[73px] z-50 lg:z-20 transform transition-transform duration-300 ease-in-out lg:transform-none ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <Sidebar
            availableCategories={availableCategories}
            selectedCategoryFilter={selectedCategoryFilter}
            filterType={filterType}
            onCategoryFilterChange={(category) => {
              setSelectedCategoryFilter(category);
              setSidebarOpen(false);
            }}
            onFilterTypeChange={(type) => {
              setFilterType(type);
              setSidebarOpen(false);
            }}
            onAddCategory={addCategory}
            onDeleteCategory={deleteCategory}
          />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full lg:ml-64">
          <div className="container mx-auto px-6 py-6 max-w-5xl">
            {/* Title with count */}
            <div className="flex items-center gap-2 mb-6">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-2xl font-bold">
                Tasks ({filteredTasks.length})
              </h2>
            </div>

            {/* Task Form - Simplified */}
            <TaskForm
              onAddTask={addTask}
              availableCategories={availableCategories}
              onAddCategory={addCategory}
            />

            {/* Filter Bar */}
            {tasks.length > 0 && (
              <div className="mb-6">
                <FilterBar
                  sortType={sortType}
                  searchQuery={searchQuery}
                  onSortChange={setSortType}
                  onSearchChange={setSearchQuery}
                />
              </div>
            )}

            {/* Task Stats - Compact */}
            {tasks.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  Total: {tasks.length}
                </Badge>
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  Active: {activeCount}
                </Badge>
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  Completed: {completedCount}
                </Badge>
                {overdueCount > 0 && (
                  <Badge variant="destructive" className="px-2 py-1 text-xs">
                    Overdue: {overdueCount}
                  </Badge>
                )}
              </div>
            )}

            {/* No results message */}
            {filteredTasks.length === 0 &&
              (searchQuery || selectedCategoryFilter) && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No tasks found matching your filters
                  </p>
                </div>
              )}

            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={toggleComplete}
              onDeleteTask={deleteTask}
              onEditTask={setEditingTask}
              onReorderTasks={reorderTasks}
            />
          </div>
        </main>
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={editTask}
          availableCategories={availableCategories}
          onAddCategory={addCategory}
        />
      )}

      {/* Statistics Modal */}
      <Statistics
        tasks={tasks}
        isOpen={showStats}
        onClose={() => setShowStats(false)}
      />

      {/* Data Management Modal */}
      <Dialog open={showDataManagement} onOpenChange={setShowDataManagement}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </DialogTitle>
          </DialogHeader>
          <ExportImport
            tasks={tasks}
            categories={availableCategories}
            onImport={importTasks}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
