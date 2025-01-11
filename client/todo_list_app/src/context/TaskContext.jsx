import React, { createContext, useContext, useState } from 'react';

// Create the context
const TaskContext = createContext();

// Custom hook to use the TaskContext
export const useTask = () => useContext(TaskContext);

// TaskProvider to wrap the app
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]); // Shared state for tasks

  // Add a new task to the list
  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Update the entire list of tasks (e.g., after fetching)
  const updateTasks = (updatedTasks) => {
    setTasks(updatedTasks);
  };

  // Remove a task from the list
  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Update a specific task in the list
  const editTask = (taskId, updatedTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: updatedTitle } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTasks, removeTask, editTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
