import React from "react";
import "./TaskItem.css";
import { type Task } from "../types/Task";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, taskId: string) => void;
  isDragging: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
}) => {
  const isOverdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date();
  const isDueSoon =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate).getTime() - new Date().getTime() <
      24 * 60 * 60 * 1000;

  const formatDueDate = (date: Date): string => {
    const today = new Date();
    const dueDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    if (diffDays === -1) return "Was due yesterday";
    if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} days`;
    if (diffDays <= 7) return `Due in ${diffDays} days`;

    return `Due ${dueDate.toLocaleDateString()}`;
  };

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} ${
        isOverdue ? "overdue" : ""
      } ${isDragging ? "dragging" : ""}`}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, task.id)}
    >
      <div className="drag-handle" title="Drag to reorder">
        ⋮⋮
      </div>

      <div className="task-content">
        <div className="task-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            id={`task-${task.id}`}
          />
          <label htmlFor={`task-${task.id}`}></label>
        </div>

        <div className="task-details">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          {task.categories && task.categories.length > 0 && (
            <div className="task-categories">
              {task.categories.map((category) => (
                <span key={category} className="task-category-tag">
                  {category}
                </span>
              ))}
            </div>
          )}

          <div className="task-metadata">
            <span className="task-date">
              Created: {task.createdAt.toLocaleDateString()}
            </span>
            {task.dueDate && (
              <span
                className={`task-due-date ${isOverdue ? "overdue" : ""} ${
                  isDueSoon ? "due-soon" : ""
                }`}
              >
                📅 {formatDueDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="btn-edit"
          onClick={() => onEditTask(task)}
          aria-label="Edit task"
          title="Edit task"
        >
          ✏️
        </button>
        <button
          className="btn-delete"
          onClick={() => onDeleteTask(task.id)}
          aria-label="Delete task"
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
