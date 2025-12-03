import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useTasks } from './hooks/useTasks';

function App() {
  const {
    tasks,
    isLoading,
    addTask,
    toggleComplete,
    deleteTask,
    clearAllTasks
  } = useTasks();

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your tasks...</p>
        </div>
      </div>
    );
  }

  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <div className="app">
      <header>
        <h1>TaskMaster</h1>
        <p className="subtitle">Organize your work, one task at a time</p>
      </header>
      
      <main>
        <TaskForm onAddTask={addTask} />
        
        {tasks.length > 0 && (
          <>
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

            <button 
              className="btn-clear-all"
              onClick={clearAllTasks}
            >
              Clear All Tasks
            </button>
          </>
        )}

        <TaskList 
          tasks={tasks}
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask}
        />
      </main>
    </div>
  );
}

export default App;