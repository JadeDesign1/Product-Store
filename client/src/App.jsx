import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Createpage from './pages/createpage';
import Navbar from './component/navbar';
import { themeChanger } from './component/product';
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import AuthHome from './pages/auth/home';
import Homepage from './pages/homepage';
import ProtectedRoute from './component/protectedRoute';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { dark } = themeChanger;

  return (
    <div
      className={`w-full ${dark ? 'bg-[var(--bg)]' : 'bg-[var(--bg)]'} min-h-[100vh] pt-24 text-[var(--text2)]`}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <AuthHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-product"
          element={
            <ProtectedRoute>
              <Createpage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
