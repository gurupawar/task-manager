import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryManagerProps {
  availableCategories: string[];
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  onAddCategory: (category: string) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  availableCategories,
  selectedCategories,
  onCategoriesChange,
  onAddCategory,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !availableCategories.includes(trimmed)) {
      onAddCategory(trimmed);
      setNewCategory("");
      onCategoriesChange([...selectedCategories, trimmed]);
    }
    setShowInput(false);
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
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
    <div className="space-y-2">
      <Label>Categories</Label>
      <div className="flex flex-wrap gap-2">
        {availableCategories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategories.includes(category) ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all",
              selectedCategories.includes(category) && "ring-2 ring-primary"
            )}
            onClick={() => toggleCategory(category)}
          >
            {category}
            {selectedCategories.includes(category) && (
              <Check className="ml-1 h-3 w-3" />
            )}
          </Badge>
        ))}

        {showInput ? (
          <div className="flex items-center gap-1">
            <Input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Category name..."
              autoFocus
              maxLength={20}
              className="h-7 w-32"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleAddCategory}
              className="h-7 w-7"
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
              className="h-7 w-7"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <Badge
            variant="outline"
            className="cursor-pointer hover:bg-accent"
            onClick={() => setShowInput(true)}
          >
            <Plus className="mr-1 h-3 w-3" />
            Add New
          </Badge>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
