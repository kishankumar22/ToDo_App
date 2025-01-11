import {react,useState} from 'react';
import AddTask from '../components/AddTask';
import { useAuth } from '../context/AuthContext';
import TaskList from '../components/TaskList';
import Layout from '../components/layout/Layout';
import { useNavigate, Link } from 'react-router-dom';

const Homepage = () => {
  const { user } = useAuth(); // Get user info from AuthContext
  const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);

  return (
    <Layout>
      <div className="p-5">
        {user ? (
          // If user is logged in
          <div>
            <h1 className="text-2xl font-bold capitalize mb-4">Welcome, {user.username} !</h1>
            <AddTask />
            <TaskList />
            
          </div>
        ) : (
          // If user is not logged in
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Task Manager</h1>
            <p className="text-lg mb-6">Sign up to start managing your tasks efficiently!</p>
            <div    onClick={() => navigate('/register')}>
               <AddTask/>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Homepage;
