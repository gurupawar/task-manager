import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import CategoryManager from "./CategoryManager";
import { Plus, ChevronDown, ChevronUp, Calendar } from "lucide-react";

interface TaskFormProps {
  onAddTask: (
    title: string,
    description: string,
    dueDate?: Date,
    categories?: string[]
  ) => void;
  availableCategories: string[];
  onAddCategory: (category: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onAddTask,
  availableCategories,
  onAddCategory,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === "") {
      setError("Task title is required");
      return;
    }

    const dueDateObj = dueDate ? new Date(dueDate) : undefined;
    onAddTask(title, description, dueDateObj, selectedCategories);

    // Clear form
    setTitle("");
    setDescription("");
    setDueDate("");
    setSelectedCategories([]);
    setShowAdvanced(false);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      {/* Main input row */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="Add new task"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            className="flex-1"
            aria-invalid={error ? "true" : "false"}
          />
          <Button type="submit" className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>

      {/* Advanced options toggle */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-xs text-muted-foreground hover:text-foreground"
      >
        {showAdvanced ? (
          <>
            <ChevronUp className="h-3 w-3 mr-1" />
            Hide options
          </>
        ) : (
          <>
            <ChevronDown className="h-3 w-3 mr-1" />
            Add description, due date & categories
          </>
        )}
      </Button>

      {/* Advanced options */}
      {showAdvanced && (
        <div className="space-y-4 pt-2 border-t">
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Task description..."
            value={description}
              onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Due Date (optional)
            </Label>
            <Input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

          {/* Categories */}
        <CategoryManager
          availableCategories={availableCategories}
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
          onAddCategory={onAddCategory}
        />
        </div>
      )}
      </form>
  );
};

export default TaskForm;
