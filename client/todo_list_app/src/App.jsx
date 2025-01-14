import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Registration from './components/Registration';
import CompletedTasksPage from './components/CompletedTasksPage';
import Login from './components/Login';
import Homepage from './pages/Homepage';
import { TaskProvider } from './context/TaskContext';
import TodayTask from './components/TodayTask';
import AddTask from './components/AddTask';


function App() {
  return (
    <AuthProvider>
      <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/todaytask" element={<TodayTask />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/completed" element={<CompletedTasksPage />} />
        </Routes>
      </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
