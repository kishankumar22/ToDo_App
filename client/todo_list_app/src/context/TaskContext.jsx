import React, { createContext, useContext, useState } from 'react';

// Create Task Context
const TaskContext = createContext();

// Custom Hook
export const useTask = () => useContext(TaskContext);

// Task Provider
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), name: task, completed: false }]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateTask = (taskId, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
  };
  
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map((task) => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateTaskList = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks,setTasks, addTask, deleteTask, updateTask, toggleTaskCompletion,updateTaskList }}>
      {children}
    </TaskContext.Provider>
  );
};
