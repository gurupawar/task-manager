import React, { useState } from "react";
import "./CategoryManager.css";

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
      // Auto-select the newly added category
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
    <div className="category-manager">
      <label className="category-label">🏷️ Categories</label>

      <div className="category-chips">
        {availableCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-chip ${
              selectedCategories.includes(category) ? "selected" : ""
            }`}
            onClick={() => toggleCategory(category)}
          >
            {category}
            {selectedCategories.includes(category) && (
              <span className="check">✓</span>
            )}
          </button>
        ))}

        {showInput ? (
          <div className="new-category-input">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Category name..."
              autoFocus
              maxLength={20}
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="btn-add-cat"
            >
              ✓
            </button>
            <button
              type="button"
              onClick={() => {
                setShowInput(false);
                setNewCategory("");
              }}
              className="btn-cancel-cat"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="category-chip add-new"
            onClick={() => setShowInput(true)}
          >
            + Add New
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
