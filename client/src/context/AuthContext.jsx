import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(isAuthenticated);

  // Check if user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (loginDetails) => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/user/sign-in',
        loginDetails
      );

      toast.success(`✅ ${res.data.message}! Redirecting...`, {
        position: 'top-right',
        autoClose: 2000,
      });

      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      setUser(res.data.user);
      console.log(user);

      return true;
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(`❌ ${error.response?.data?.message || 'Login failed'}`, {
        position: 'top-right',
        autoClose: 3000,
      });

      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easy access
export const useAuth = () => useContext(AuthContext);
