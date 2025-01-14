import { react, useState } from 'react';
import AddTask from '../components/AddTask';
import { useAuth } from '../context/AuthContext';
import TodayTask from '../components/TodayTask';
import Layout from '../components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import YesterDayTask from '../components/YesterDayTask';
import LastTwoDays from '../components/LastTwodays';

const Homepage = () => {
  const { user } = useAuth(); // Get user info from AuthContext
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="p-2 bg-gray-50 min-h-screen">
        {user ? (
          // If user is logged in
          <div>
            {/* <h1 className="text-3xl font-bold text-gray-800 capitalize mb-6">
              Welcome, {user.username}!
            </h1> */}
            <div className="mb-4">
              <AddTask />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">

              <div className="bg-white rounded-lg shadow-md p-2">
                {/* <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Tasks</h2> */}
                <TodayTask />
              </div>
              <div className="bg-white rounded-lg shadow-md p-2">
                {/* <h2 className="text-2xl font-semibold text-gray-700 mb-4">Today's Tasks</h2> */}
                <YesterDayTask />
              </div>

              <div className="bg-white rounded-lg shadow-md p-2">
                {/* <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tasks from the Last Two Days</h2> */}
                <LastTwoDays />
              </div>
            </div>
          </div>
        ) : (
          // If user is not logged in
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Task Manager</h1>
            <p className="text-lg text-gray-600 mb-8">
              Sign up to start managing your tasks efficiently!
            </p>
          
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Homepage;
