import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
  
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Login Success:', data);
      alert("welcome to ",username);

      // If login is successful, redirect to home page
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Invalid credentials. Please try again.');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleFormSubmit} className="max-w-md w-full bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Username (Email or Mobile)</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username or email/mobile"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>

        <p className="mt-4 text-center text-gray-600">
          <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
