import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
  const [showInput, setShowInput] = useState(false); // Toggle input visibility
  const [task, setTask] = useState(''); // Store current task input
  const [tasks, setTasks] = useState([]); // Store list of tasks
  const [editIndex, setEditIndex] = useState(null); // Track the task being edited

  const navigate = useNavigate();

  // Handle adding/updating a task
  const handleSaveTask = () => {
    if (!task.trim()) return; // Prevent empty tasks

    if (editIndex !== null) {
      // Edit existing task
      const updatedTasks = tasks.map((t, index) =>
        index === editIndex ? { ...t, name: task } : t
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      // Add new task
      setTasks([...tasks, { name: task, completed: false }]);
    }

    setTask(''); // Clear input
    setShowInput(false); // Hide input box
  };

  // Handle editing a task
  const handleEditTask = (index) => {
    setTask(tasks[index].name); // Set the task in input
    setEditIndex(index); // Mark as editing
    setShowInput(true); // Show input box
  };

  // Handle deleting a task
  const handleDeleteTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };

  // Handle marking a task as completed
  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Navigate to Completed Tasks page
  const goToCompletedTasks = () => {
    navigate('/completed', { state: { tasks } });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 text-center p-5 bg-gray-200 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Task Manager</h2>
      
      {/* Add Task Button */}
      {!showInput && (
        <button
          onClick={() => setShowInput(true)}
          className="block w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mx-auto"
        >
          Add Task
        </button>
      )}
      
      {/* Input and Save Button */}
      {showInput && (
        <div className="flex items-center gap-2 mt-4">
          <input
            type="text"
            placeholder="Enter Your task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSaveTask}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Save
          </button>
        </div>
      )}

      {/* Task List */}
      <ul className="mt-6 space-y-2">
        {tasks.map((taskItem, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-2 bg-gray-100 rounded-md"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={taskItem.completed}
                onChange={() => handleToggleComplete(index)}
                className="cursor-pointer"
              />
              <span className={taskItem.completed ? 'line-through text-gray-500' : ''}>
                {taskItem.name}
              </span>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEditTask(index)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Go to Completed Tasks */}
      <button
        onClick={goToCompletedTasks}
        className="mt-6 w-full bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
      >
        View Completed Tasks
      </button>
    </div>
  );
};

export default AddTask;
