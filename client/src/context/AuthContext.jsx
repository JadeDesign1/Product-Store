import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthContext = createContext();
const apiUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (loginDetails) => {
    try {
      const res = await axios.post(`${apiUrl}/api/user/sign-in`, loginDetails);

      toast.success(`✅ ${res.data.message}! Redirecting...`, {
        position: 'top-right',
        autoClose: 2000,
      });

      // ✅ Store token and user info in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: res.data.user._id,
          username: res.data.user.username,
          email: res.data.user.email,
        })
      );

      setIsAuthenticated(true);
      setUser(res.data.user);

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
