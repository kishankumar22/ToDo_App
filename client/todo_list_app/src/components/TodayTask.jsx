import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './../App.css';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../context/TaskContext';
import { deleteTask, updateTask, updateCheckboxTask } from '../api/TaskApi';
import axios from 'axios';

const TodayTask = () => {
  const navigate = useNavigate();
  const { tasks, updateTasks, removeTask, editTask } = useTask(); // Access context
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        alert('User  ID not found. Please log in again.');
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/TodayTask', {
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

  const handleDelete = async (taskId) => {
    const userId = localStorage.getItem('user_id');
    try {
      await deleteTask(userId, taskId);
      removeTask(taskId); // Remove task from context
      await Swal.fire({
        title: 'Success!',
        text: 'Task deleted successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error deleting task:', error.message);
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to delete task.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
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
      await Swal.fire({
        title: 'Success!',
        text: 'Task updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error updating task:', error.message);
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to update task.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  // Mark a task as complete/incomplete
  const handleCheckboxChange = async (taskId, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      await updateCheckboxTask(taskId, newStatus); // Update task status in the backend
      updateTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed: newStatus } : task
        )
      );
      if (newStatus) {
        Swal.fire('Good job!', 'You completed the task!', 'success');
      } else {
        Swal.fire('Info', 'Task marked as incomplete.', 'info');
      }
    } catch (error) {
      console.error('Error updating task status:', error.message);
      alert('Failed to update task status.');
    }
  };

  // Separate completed and uncompleted tasks
  const completedTasks = tasks.filter(task => task.completed);
  const uncompletedTasks = tasks.filter(task => !task.completed);

  return (
    <div className="max-w-lg mx-auto mt-5 p-5 bg-gray-200 rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Today Tasks</h2>
      {completedTasks.length > 0 && (
        <div>
          {/* <h3 className="font-semibold m-2">Completed Tasks</h3> */}
          <ul className="space-y-2">
            {completedTasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between bg-white p-3 rounded -md shadow-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(task.id, task.completed)}
                    className="mr-3 w-3 h-3"
                  />
                  <span className="line-through text-gray-500">{task.title}</span>
                </div>
                <div className="flex space-x-2">  

                  <button
                      onClick={() => handleEdit(task)}
                      className="px-3 py-1 rounded bg-gray-300 text-gray-500 cursor-not-allowed text-gray"
                      disabled
                    >
                      Edit
                    </button>
                  
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-3 py-1 rounded bg-gray-300 text-gray-500 cursor-not-allowed"
                    disabled
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {uncompletedTasks.length > 0 ? (
        <div className='mt-2'>
          {/* <h3 className="font-semibold m-2">Uncompleted Tasks</h3> */}
          <ul className="space-y-2">
            {uncompletedTasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(task.id, task.completed)}
                    className="mr-3 w-3 h-3"
                  />
                  {editingTaskId === task.id ? (
                    <input
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      className="border border-gray-300 p-1 rounded w-44"
                    />
                  ) : (
                    <span>{task.title}</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  {editingTaskId === task.id ? (
                    <button
                      onClick={() => handleSaveEdit(task.id)}
                      className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(task)}
                      className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No uncompleted tasks available</p>
      )}
    </div>
  );
};

export default TodayTask;