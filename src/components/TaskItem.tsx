import React from "react";
import type { Task } from "../types/Task";
import "./TaskItem.css"

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDeleteTask,
}) => {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task content">
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
          <span className="task-d">
            {task.createdAt.toLocaleDateString()} at{" "}
            {task.createdAt.toLocaleTimeString()}
          </span>
        </div>
      </div>

      <button className="btn-delete"
      onClick={() => onDeleteTask(task.id)}
      area-label="Delete task"
      >
        🗑️
      </button>
    </div>
  );
};


export default TaskItem