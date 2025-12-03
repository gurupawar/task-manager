import {useState, useEffect} from "react"
import type { Task } from "../types/Task"
import { loadTasks, saveTasks } from "../utils/localStorage";


export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadedTasks = loadTasks()

        setTasks(loadedTasks)
        setIsLoading(false)
    },[])

    useEffect(() => {
        if(!isLoading){
            saveTasks(tasks)
        }
    }, [tasks, isLoading])

    const addTask = (title: string, description: string): void => {
        const neweTask: Task = {
            id: Date.now().toString(),
            title,
            description,
            completed: false,
            createdAt: new Date()
        }

        setTasks(prevTasks => [...prevTasks, neweTask])
    }

    const toggleComplete = (id:string):void => {
        setTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === id 
                ? {...task, completed: !task.completed}
                : task
            )
        )
    }

    const deleteTask = (id: string): void => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
    }

    const clearAllTasks = (): void => {
        if(window.confirm('Are you sure you want to delete all tasks?')){
            setTasks([]);
        }
    }

    return {
       tasks,
       isLoading,
       addTask,
       toggleComplete,
       deleteTask,
       clearAllTasks
    }
}

