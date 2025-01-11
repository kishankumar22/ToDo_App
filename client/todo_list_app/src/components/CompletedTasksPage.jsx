import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTask, updateUnCheckboxTask } from '../api/TaskApi'; // Import updateUnCheckboxTask

const CompletedTasksPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const getTaskData = async () => {
    const userId = localStorage.getItem('user_id'); // Get user_id from localStorage

    if (!userId) {
      alert('User ID not found. Please log in again.');
      navigate('/login'); // Redirect to login if user_id is missing
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/completed?user_id=${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch tasks');
      }

      setTasks(data); // Update state with fetched tasks
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
      alert(error.message || 'An error occurred while fetching tasks');
    }
  };

  // Delete completed task
  const handleDeleteTask = async (id) => {
    const userId = localStorage.getItem('user_id'); // Get user_id from localStorage
    if (!userId) {
      alert('User ID not found. Please log in again.');
      navigate('/login'); // Redirect to login if user_id is missing
      return;
    }

    try {
      await deleteTask(userId, id); // Call the deleteTask function
      setTasks(tasks.filter((task) => task.id !== id)); // Update local state to remove the deleted task
      alert('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error.message);
      alert('Failed to delete task. Please try again.');
    }
  };

  // Mark task as uncompleted
  const handleUncompleteTask = async (id) => {
    try {
      await updateUnCheckboxTask(id, false); // Call the API to mark task as uncompleted
      setTasks(tasks.filter((task) => task.id !== id)); // Remove task from completed list
      alert('Task marked as incomplete');
    } catch (error) {
      console.error('Error marking task as incomplete:', error.message);
      alert('Failed to update task status. Please try again.');
    }
  };

  useEffect(() => {
    getTaskData(); // Fetch tasks on component mount
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-5 p-5 bg-gray-200 rounded-md shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Completed Tasks</h1>
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
                  className="mr-3 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={task.completed}
                  onChange={() => handleUncompleteTask(task.id)} // Toggle task status
                />
                <p className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDeleteTask(task.id)} // Call handleDeleteTask on click
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
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

      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CompletedTasksPage;
