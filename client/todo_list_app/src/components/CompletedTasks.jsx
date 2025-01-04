import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CompletedTasks = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tasks = location.state?.tasks || [];

  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="max-w-lg mx-auto mt-10 text-center p-5 bg-gray-200 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Completed Tasks</h2>
      
      {completedTasks.length > 0 ? (
        <ul className="mt-6 space-y-2">
          {completedTasks.map((task, index) => (
            <li
              key={index}
              className="p-2 bg-green-100 rounded-md"
            >
              {task.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No completed tasks available.</p>
      )}

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Back to Task Manager
      </button>
    </div>
  );
};

export default CompletedTasks;
