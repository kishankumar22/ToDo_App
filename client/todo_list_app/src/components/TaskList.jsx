import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import { deleteTask, updateTask, updateCheckboxTask } from '../api/TaskApi';
import axios from 'axios';

const TaskList = () => {
  const navigate = useNavigate();
  const { tasks, updateTasks, removeTask, editTask } = useTask(); // Access context
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        alert('User ID not found. Please log in again.');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/taskslist', {
          params: { user_id: userId },
        });
        updateTasks(response.data); // Update tasks in context
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
        alert('Failed to fetch tasks.');
      }
    };

    fetchTasks();
  }, [navigate, updateTasks]);

  // Delete a task
  const handleDelete = async (taskId) => {
    const userId = localStorage.getItem('user_id');
    try {
      await deleteTask(userId, taskId);
      removeTask(taskId); // Remove task from context
      alert('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error.message);
      alert('Failed to delete task.');
    }
  };

  // Edit a task
  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  };

  const handleSaveEdit = async (taskId) => {
    try {
      await updateTask(taskId, editingTitle); // Update task in the backend
      editTask(taskId, editingTitle); // Update task in context
      setEditingTaskId(null);
      setEditingTitle('');
      alert('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error.message);
      alert('Failed to update task.');
    }
  };

  // Mark a task as complete/incomplete
  const handleCheckboxChange = async (taskId, currentStatus) => {
    const userId = localStorage.getItem('user_id');
    const newStatus = !currentStatus; // Toggle the status
  
    try {
      const response = await axios.put(`http://localhost:3000/api/uncheckboxtask/${taskId}`, {
        completed: newStatus, // Send the new status as a boolean
      });
      console.log(response.data.message); // Log success message
      updateTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error.message);
      alert('Failed to update task status.');
    }
  };
  

  return (
    <div className="max-w-lg mx-auto mt-5 p-5 bg-gray-200 rounded-md">
      <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
      {tasks.length > 0 ? (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(task.id, task.completed)}
                  className="mr-3 w-5 h-5"
                />
                {editingTaskId === task.id ? (
                  <input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="border border-gray-300 p-1 rounded"
                  />
                ) : (
                  <span
                    className={`${
                      task.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {task.title}
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                {editingTaskId === task.id ? (
                  <button
                    onClick={() => handleSaveEdit(task.id)}
                    className={`px-3 py-1 rounded ${
                      task.completed
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                    disabled={task.completed} // Disable if task is completed
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(task)}
                    className={`px-3 py-1 rounded ${
                      task.completed
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                    disabled={task.completed} // Disable if task is completed
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(task.id)}
                  className={`px-3 py-1 rounded ${
                    task.completed
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                  disabled={task.completed} // Disable if task is completed
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No tasks available</p>
      )}
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate('/tasklist')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Task List
        </button>
        <button
          onClick={() => navigate('/completed')}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          View Completed Tasks
        </button>
      </div>
    </div>
  );
};

export default TaskList;
