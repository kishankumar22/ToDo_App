import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use Auth Context
export const useAuth = () => useContext(AuthContext);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing login session on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Login Function
  const login = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  // Logout Function
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
