import React, { createContext, useContext, useState, useEffect } from 'react';
import { IdleTimerProvider } from 'react-idle-timer';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Logout Function
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    alert('Session expired due to inactivity.');
    window.location.href = '/'; // Redirect to home page
  };

  // Initialize on mount
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

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      <IdleTimerProvider
        timeout={10 * 50 * 1000} // 10 minutes in milliseconds
        onIdle={logout} // Call logout when idle
        debounce={500} // Debounce time for events
      >
        {children}
      </IdleTimerProvider>
    </AuthContext.Provider>
  );
};
