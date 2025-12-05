import React, { useState } from "react";
import "./TaskForm.css";
import CategoryManager from "./CategoryManager";

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
  const [description, setDescrition] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === "") {
      alert("Title is required");
      return;
    }

    const dueDateObj = dueDate ? new Date(dueDate) : undefined;
    onAddTask(title, description, dueDateObj, selectedCategories);

    //Clear form
    setTitle("");
    setDescrition("");
    setDueDate("");
    setSelectedCategories([]);
  };

  return (
    <>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="task-input"
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescrition(e.target.value)}
            className="task-textarea"
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">
            📅 Due Date (optional)
          </label>

          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="task-date-input"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <CategoryManager
          availableCategories={availableCategories}
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
          onAddCategory={onAddCategory}
        />

        <button type="submit" className="btn-add">
          Add Task
        </button>
      </form>
    </>
  );
};

export default TaskForm;
