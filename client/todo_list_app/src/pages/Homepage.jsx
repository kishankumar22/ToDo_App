// Homepage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import AddTask from '../components/AddTask';
import TodayTask from '../components/TodayTask';
import Layout from '../components/layout/Layout';
import YesterDayTask from '../components/YesterDayTask';
import LastTwoDays from '../components/LastTwodays';

const Homepage = () => {
  const { user } = useAuth(); // Get user info from AuthContext

  return (
    <Layout>
      <div className="p-2 bg-gray-50 min-h-screen">
        {user ? (
          <div>
            <div className="mb-4">
              <AddTask />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="bg-white rounded-lg shadow-md p-2">
                <TodayTask />
              </div>
              <div className="bg-white rounded-lg shadow-md p-2">
                <YesterDayTask />
              </div>
              <div className="bg-white rounded-lg shadow-md p-2">
                <LastTwoDays />
              </div>
            </div>
          </div>
        ) : (
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