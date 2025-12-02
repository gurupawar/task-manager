import { useState } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { type Task } from "./types/Task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
    };

    setTasks([...tasks, newTask]);
  };

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

const handleDeleteTask = (id: string) => {
  setTasks(tasks.filter(task => task.id !== id));
}

const completedCount = tasks.filter(task => task.completed).length
const activeCount = tasks.length - completedCount


  return (
    <>
      <div className="app">
        <header>
          <h1>TaskMaster</h1>
          <p className="subtitle">Organize your work, one task at a time</p>
          <main>
            <TaskForm onAddTask={handleAddTask} />

            {tasks.length > 0 && (
              <div className="task-stats">
                <span className="stat">
                  📋 Total: <strong>{tasks.length}</strong>
                </span>
                <span className="stat">
                  ✅ Completed: <strong>{completedCount}</strong>
                </span>
                <span className="stat">
                  🔄 Active: <strong>{activeCount}</strong>
                </span>
              </div>
            )}
            <TaskList
              tasks={tasks}
              onToggleComplete={handleToggleComplete}
              onDeleteTask={handleDeleteTask}
            />
          </main>
        </header>
      </div>
    </>
  );
}

export default App;
