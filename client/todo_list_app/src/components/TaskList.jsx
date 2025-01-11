import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTask, updateTask, updateCheckboxTask } from '../api/TaskApi'; // Import API functions

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null); // Track which task is being edited
  const [editingTitle, setEditingTitle] = useState(''); // Track the title being edited
  

  const getTaskData = async () => {
    const userId = localStorage.getItem('user_id'); // Get user_id from localStorage
    if (!userId) {
      alert('User  ID not found. Please log in again.');
      navigate('/login'); // Redirect to login if user_id is missing
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/taskslist?user_id=${userId}`);
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

  const handleDeleteTask = async (id) => {
    const userId = localStorage.getItem('user_id'); // Get user_id from localStorage
    if (!userId) {
      alert('User  ID not found. Please log in again.');
      navigate('/login'); // Redirect to login if user_id is missing
      return;
    }

    try {
      await deleteTask(userId, id); // Call the deleteTask function
      setTasks(tasks.filter(task => task.id !== id)); // Update local state to remove the deleted task
      alert('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error.message);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id); // Set the task ID being edited
    setEditingTitle(task.title); // Set the current title for editing
  };

  const handleUpdateTask = async (id) => {
    try {
      await updateTask(id, editingTitle); // Call the updateTask function
      setTasks(tasks.map(task => (task.id === id ? { ...task, title: editingTitle } : task))); // Update local state
      setEditingTaskId(null); // Clear editing state
      setEditingTitle(''); // Clear editing title
      alert('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error.message);
      alert('Failed to update task. Please try again.');
    }
  };

  const handleCheckboxChange = async (id, currentStatus) => {
    const newCompletedStatus = !currentStatus; // Toggle the completed status
    const userId = localStorage.getItem('user_id'); // Get user_id from localStorage
    if (!userId) {
      alert('User ID not found. Please log in again.');
      navigate('/login'); // Redirect to login if user_id is missing
      return;
    }

    try {
      await updateCheckboxTask(id, newCompletedStatus); // Update task status in the backend

      // Remove task from current list and refresh tasks
      setTasks(tasks.filter(task => task.id !== id));

      // Alert message for the update
      if (newCompletedStatus) {
        alert('Task moved to Completed Tasks!');
      } else {
        alert('Task moved back to Task List.');
      }
    } catch (error) {
      console.error('Error updating task status:', error.message);
      alert('Failed to update task status. Please try again.');
    }
  };

  useEffect(() => {
    getTaskData(); // Fetch tasks on component mount
  }, []);

  return (
    <>
      <div className="max-w-lg mx-auto mt-5 p-5 bg-gray-200 rounded-md hover:">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Tasks</h2>
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
                    onChange={() => handleCheckboxChange(task.id, task.completed)} // Toggle task status
                  />


                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)} // Update title as user types
                      className="border border-gray-300 rounded p-1"
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
                      onClick={() => handleUpdateTask(task.id)} // Save updated title
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditTask(task)} // Enable editing
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteTask(task.id)} // Delete task
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                  {/* date  */}
                  {/* <button
                  onClick={() => { alert("Date: " + task.date); }} // Show the date in the alert
                  className="bg-green-200 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  {task.date}
                </button> */}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No tasks available</p>
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
    </>
  );
};

export default TaskList;
