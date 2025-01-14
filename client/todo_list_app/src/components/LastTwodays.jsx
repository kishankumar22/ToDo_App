import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTask, updateTask, updateCheckboxTask } from '../api/TaskApi'; // API functions
import Swal from 'sweetalert2';

const LastTwoDays = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  const getTaskData = async () => {
    const userId = localStorage.getItem('user_id');

    if (!userId) {
      alert('User ID not found. Please log in again.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/lasttwodays?user_id=${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch tasks');
      }

      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
      alert(error.message || 'An error occurred while fetching tasks');
    }
  };

  const handleDeleteTask = async (id) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert('User ID not found. Please log in again.');
      navigate('/login');
      return;
    }

    try {
      await deleteTask(userId, id);
      setTasks(tasks.filter((task) => task.id !== id));
      Swal.fire('Deleted!', 'Task deleted successfully.', 'success');
    } catch (error) {
      console.error('Error deleting task:', error.message);
      Swal.fire('Error!', 'Failed to delete task.', 'error');
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  };

  const handleSaveEdit = async (taskId) => {
    try {
      await updateTask(taskId, editingTitle);
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, title: editingTitle } : task
        )
      );
      setEditingTaskId(null);
      setEditingTitle('');
      Swal.fire('Success!', 'Task updated successfully.', 'success');
    } catch (error) {
      console.error('Error updating task:', error.message);
      Swal.fire('Error!', 'Failed to update task.', 'error');
    }
  };

  const handleCheckboxChange = async (taskId, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      await updateCheckboxTask(taskId, newStatus);
      setTasks(
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
      Swal.fire('Error!', 'Failed to update task status.', 'error');
    }
  };

  useEffect(() => {
    getTaskData();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-5 p-5 bg-gray-200 rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">day after tomorrow Tasks</h1>
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
                  className="mr-3 w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={task.completed}
                  onChange={() => handleCheckboxChange(task.id, task.completed)}
                />
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-44"
                  />
                ) : (
                  <p className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
                    {task.title}
                  </p>
                )}
              </div>
              <div className="flex space-x-2">
                {editingTaskId === task.id ? (
                  <button
                    onClick={() => handleSaveEdit(task.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
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
                    disabled={task.completed}
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className={`px-3 py-1 rounded ${
                    task.completed
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                  disabled={task.completed}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No tasks available</p>
      )}

      {/* <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Back to Home
        </button>
      </div> */}
    </div>
  );
};

export default LastTwoDays;
