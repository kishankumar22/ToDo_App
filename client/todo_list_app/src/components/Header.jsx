import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Do you want to logout from this device?');
    if (confirmLogout) {
      logout();
      // alert('You have been logged out successfully!');
      navigate('/');
    }
  };
  // search task
  const searchTask = async () => {
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

  return (
    <header className="bg-gray-100 h-16 flex items-center px-4 shadow-md">
      <div className="flex justify-between w-full max-w-7xl mx-auto items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          My To-Do App
        </Link>

        {/* Search bar */}
        {/* <div className="hidden md:block">
          <input
            type="search"
            placeholder="Search your tasks"
            className="p-2 rounded-md bg-gray-200 focus:outline-none"
          />
        </div> */}

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          {/* Dynamic Login/Logout */}
          {isLoggedIn ? (
            <>
              <p className="hidden sm:block capitalize text-sm font-semibold">{user?.username || 'User'}</p>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      {/* <div className="block md:hidden w-full mt-2">
        <input
          type="search"
          placeholder="Search tasks"
          className="p-2 rounded-md bg-gray-200 w-full focus:outline-none"
        />
      </div> */}
    </header>
  );
};

export default Header;
