import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  console.log(isAuthenticated);

  if (loading) return <p>Loading...</p>; // Prevents flicker on refresh
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
