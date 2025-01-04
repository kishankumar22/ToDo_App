import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Homepage from './pages/Homepage';
import CompletedTasks from './components/CompletedTasks';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/completed" element={<CompletedTasks />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/" element={<Homepage />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;