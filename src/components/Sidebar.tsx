import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Folder, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  availableCategories: string[];
  selectedCategoryFilter: string | null;
  onCategoryFilterChange: (category: string | null) => void;
  onAddCategory: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  availableCategories,
  selectedCategoryFilter,
  onCategoryFilterChange,
  onAddCategory,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [showInput, setShowInput] = useState(false);

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
    <aside className="w-64 border-r bg-muted/30 min-h-[calc(100vh-73px)] p-4">
      <div className="space-y-6">
        {/* Projects/Categories Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Projects</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setShowInput(true)}
              title="Add new project"
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
                placeholder="Project name..."
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
            <button
              onClick={() => onCategoryFilterChange(null)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                selectedCategoryFilter === null
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <Folder className="h-4 w-4" />
              <span>All Tasks</span>
            </button>
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryFilterChange(category)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  selectedCategoryFilter === category
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )}
              >
                <Folder className="h-4 w-4" />
                <span>{category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

