import React from "react"
import type { Task } from "../types/Task"
import TaskItem from "./TaskItem";
import "./TaskList.css"

interface TaskListProps {
    tasks: Task[];
    onToggleComplete: (id: string) => void;
    onDeleteTask: (id: string) => void
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onToggleComplete,
    onDeleteTask
}) => {

    if(tasks.length ===0){
        return (
            <div className="empty-state">
                <p>📝 No tasks yet. Add your first task above!</p>
            </div>
        )
    }

    return (
        <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    )
}

export default TaskList;