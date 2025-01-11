import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Registration from './components/Registration';
import CompletedTasksPage from './components/CompletedTasksPage';
import Login from './components/Login';
import Homepage from './pages/Homepage';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';


function App() {
  return (
    <AuthProvider>
      <TaskProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/tasklist" element={<TaskList />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/completed" element={<CompletedTasksPage />} />
        </Routes>
      </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
