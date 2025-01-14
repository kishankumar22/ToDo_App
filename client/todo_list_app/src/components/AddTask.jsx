import React, { useState } from 'react';
import Swal from 'sweetalert2'
import './../App.css'
import { useTask } from '../context/TaskContext';
import { postTask } from '../api/TaskApi'; // Import the postTask function

const AddTask = () => {
  const { addTask } = useTask(); // Assuming addTask is a context function
  const [task, setTask] = useState('');
  const [showInput, setShowInput] = useState(false);
  const userId = localStorage.getItem('user_id'); // Get user ID from local storage

  const handleSaveTask = async () => {
    if (!task.trim()==="") 
      return; // Prevent saving empty tasks

    try {
      await postTask(userId, task); // Call the postTask function
      // alert("TASK ADDED SUCCESSFULLY");
      await Swal.fire({
              title: 'Success!',
              text: 'Task added successfully',
              icon: 'success',
              confirmButtonText: 'OK'
            });
      setTask(''); // Clear the input field
      setShowInput(false); // Hide the input field
      addTask(task); // Optionally call addTask if you want to update local state
    } catch (error) {
      console.error('Error adding task:', error);
      // alert('Failed to add task. Please try again.');
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to add task. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        width: '400px', // Modal width
        customClass: {
          popup: 'my-popup', // Custom popup styling
          title: 'my-title', // Custom title styling
          content: 'my-content', // Custom content styling
      },
    });
    
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-5 p-5 bg-gray-200 rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add Your Task</h2>
      {!showInput && (
        <button
          onClick={() => setShowInput(true)}
          className="block w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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