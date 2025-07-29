import React, { createContext, useContext, useState, useCallback } from 'react';

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Memoized methods to prevent re-creation on each render
  const addTask = useCallback((newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const updateTasks = useCallback((updatedTasks) => {
    setTasks(updatedTasks);
  }, []);

  const removeTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  const editTask = useCallback((taskId, updatedTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: updatedTitle } : task
      )
    );
  }, []);

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTasks, removeTask, editTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
