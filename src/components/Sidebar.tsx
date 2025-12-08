import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Folder, X, Check, Trash2, ListTodo, CheckCircle2 } from "lucide-react";
import { FilterType } from "../types/Filters";
import { cn } from "@/lib/utils";

interface SidebarProps {
  availableCategories: string[];
  selectedCategoryFilter: string | null;
  filterType: FilterType;
  onCategoryFilterChange: (category: string | null) => void;
  onFilterTypeChange: (filterType: FilterType) => void;
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  availableCategories,
  selectedCategoryFilter,
  filterType,
  onCategoryFilterChange,
  onFilterTypeChange,
  onAddCategory,
  onDeleteCategory,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !availableCategories.includes(trimmed)) {
      onAddCategory(trimmed);
      setNewCategory("");
      setShowInput(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCategory();
    } else if (e.key === "Escape") {
      setShowInput(false);
      setNewCategory("");
    }
  };

  return (
    <aside className="w-64 border-r bg-background lg:bg-muted/30 h-[calc(100vh-73px)] p-4 overflow-y-auto">
      <div className="space-y-6">
        {/* Status Filters Section */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Status</h2>
          <div className="space-y-1">
            <button
              onClick={() => {
                onFilterTypeChange(FilterType.ALL);
                onCategoryFilterChange(null);
              }}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                filterType === FilterType.ALL
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <Folder className="h-4 w-4" />
              <span>All Tasks</span>
            </button>
            <button
              onClick={() => {
                onFilterTypeChange(FilterType.ACTIVE);
                onCategoryFilterChange(null);
              }}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                filterType === FilterType.ACTIVE
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <ListTodo className="h-4 w-4" />
              <span>Active</span>
            </button>
            <button
              onClick={() => {
                onFilterTypeChange(FilterType.COMPLETED);
                onCategoryFilterChange(null);
              }}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                filterType === FilterType.COMPLETED
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Completed</span>
            </button>
          </div>
        </div>

        {/* Categories Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Categories</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setShowInput(true)}
              title="Add new category"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Add Category Input */}
          {showInput && (
            <div className="mb-3 flex items-center gap-1">
              <Input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Category name..."
                autoFocus
                maxLength={20}
                className="h-8 text-sm"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={handleAddCategory}
                className="h-8 w-8"
              >
                <Check className="h-3 w-3" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => {
                  setShowInput(false);
                  setNewCategory("");
                }}
                className="h-8 w-8"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          {/* Category List */}
          <div className="space-y-1">
            {availableCategories.map((category) => (
              <div
                key={category}
                className="relative"
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <button
                  onClick={() => onCategoryFilterChange(category)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                    selectedCategoryFilter === category
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <Folder className="h-4 w-4 flex-shrink-0" />
                  <span className="flex-1 text-left truncate pr-6">{category}</span>
                </button>
                {hoveredCategory === category && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 hover:bg-destructive/20",
                      selectedCategoryFilter === category
                        ? "text-primary-foreground hover:text-destructive"
                        : "text-muted-foreground hover:text-destructive"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm(`Delete category "${category}"? This will remove it from all tasks.`)) {
                        onDeleteCategory(category);
                      }
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

