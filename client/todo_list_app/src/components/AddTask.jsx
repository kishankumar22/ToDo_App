import React, { useState } from 'react';
import Swal from 'sweetalert2'
import './../App.css'
import { useTask } from '../context/TaskContext';
import { postTask } from '../api/TaskApi'; // Import the postTask function

const AddTask = () => {
  const { addTask } = useTask(); // Assuming addTask is a context function
  const [task, setTask] = useState('');
  const [showInput, setShowInput] = useState(false);
  // Get user ID from local storage

  const handleSaveTask = async () => {
    if (task.trim() === "") {
       await Swal.fire('Warning!', 'Please enter some text.', 'warning'); // Alert for empty task
      return; // Prevent saving empty tasks
    }
     

    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert('User  ID not found. Please log in again.');
      return;
    }

    try {
      // Fetch existing tasks to check their completion status
      const response = await fetch(`http://localhost:3000/api/lasttwodays?user_id=${userId}`);
      const data = await response.json();

      // Check if all tasks are completed
      const allTasksCompleted = data.every(task => task.completed);

      if (!allTasksCompleted) {
        await Swal.fire('Warning!', 'You cannot add a new task until all existing tasks are completed.', 'warning');
        return; // Exit the function if not all tasks are completed
      }

      // If all tasks are completed, proceed to add the new task
      await postTask(userId, task); // Call the postTask function
      await Swal.fire('Success!', 'Task added successfully', 'success');
      setTask(''); // Clear the input field
      setShowInput(false); // Hide the input field
      addTask(task); // Optionally call addTask if you want to update local state
    } catch (error) {
      console.error('Error adding task:', error);
      await Swal.fire('Error!', 'Failed to add task. Please try again.', 'error');
    }
};
  return (
    <div className="max-w-lg mx-auto h-12 rounded-md">
      {/* <span className="text-xl font-bold mb-4 p-2 float-left">Add Your Task :</span> */}
      {!showInput && (
        <button
          onClick={() => setShowInput(true)}
          className="block  bg-blue-500 text-white px-4 py-2 m-auto rounded-md border-2  hover:bg-blue-600"
        >
          Add Task
        </button>
      )}
      {showInput && (
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="Enter Your Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button
            onClick={handleSaveTask}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTask;