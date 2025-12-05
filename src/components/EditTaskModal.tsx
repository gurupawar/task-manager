import React, { useState, useEffect } from "react";
import "./EditTaskModal.css";
import { type Task } from "../types/Task";
import CategoryManager from "./CategoryManager";

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
  onSave: (
    id: string,
    title: string,
    description: string,
    dueDate?: Date,
    categories?: string[]
  ) => void;
  availableCategories: string[];
  onAddCategory: (category: string) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  task,
  onClose,
  onSave,
  availableCategories,
  onAddCategory,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState<string>(
    task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    task.categories || []
  );

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === "") {
      alert("Please enter a task title");
      return;
    }

    const dueDateObj = dueDate ? new Date(dueDate) : undefined;
    onSave(task.id, title, description, dueDateObj, selectedCategories);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Task</h2>
          <button className="btn-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-title">Title</label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="task-input"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">Description</label>
            <textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="task-textarea"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-dueDate">📅 Due Date</label>
            <input
              id="edit-dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="task-date-input"
            />
          </div>

          <CategoryManager
            availableCategories={availableCategories}
            selectedCategories={selectedCategories}
            onCategoriesChange={setSelectedCategories}
            onAddCategory={onAddCategory}
          />

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
