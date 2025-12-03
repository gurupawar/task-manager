import {type Task } from "../types/Task";


const STORAGE_KEY = "taskmaster_tasks"

export const saveTasks = (tasks: Task[]): void => {
    try {
        const tasksTosave = tasks.map(task => ({
            ...task, 
            createdAt: task.createdAt.toISOString()
        }));

        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksTosave))
    } catch (error) {
        console.log('Error saving tasks to localStorage:', error)
    }
}

export const loadTasks = (): Task[] => {
    try {
        const tasksJSON = localStorage.getItem(STORAGE_KEY)

        if(!tasksJSON){
            return []
        }

        const parsedTasks = JSON.parse(tasksJSON)

        return parsedTasks.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt)
        }))

    } catch (error) {
        console.log('Error loading tasks from localStorage:', error)
            return []
        
    }
}