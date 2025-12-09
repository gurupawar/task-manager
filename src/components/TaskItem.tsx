import React from "react";
import { type Task } from "../types/Task";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Calendar, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={cn(
        "border rounded-lg p-4 mb-3 bg-card transition-all hover:shadow-sm",
        task.completed && "opacity-60",
        isOverdue && !task.completed && "border-destructive/50",
        isDragging && "opacity-50 scale-95"
      )}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, task.id)}
    >
      <div className="flex items-start gap-3">
        <GripVertical className="h-5 w-5 text-muted-foreground/40 cursor-grab active:cursor-grabbing mt-1 flex-shrink-0" />
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          id={`task-${task.id}`}
          className="mt-1"
        />

        <div className="flex-1 min-w-0">
          <label
            htmlFor={`task-${task.id}`}
            className={cn(
              "text-base font-medium cursor-pointer block",
              task.completed && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </label>

          {task.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {task.description}
            </p>
          )}

          {task.categories && task.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {task.categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="text-xs"
                >
                  {category}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span
                  className={cn(
                    isOverdue && "text-destructive font-medium",
                    isDueSoon && !isOverdue && "text-orange-500 font-medium"
                  )}
                >
                  {formatDate(task.dueDate)}
                </span>
              </div>
            )}
            {!task.dueDate && (
              <span>{formatDate(task.createdAt)}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEditTask(task)}
            aria-label="Edit task"
            title="Edit task"
            className="h-8 w-8"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteTask(task.id)}
            aria-label="Delete task"
            title="Delete task"
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
