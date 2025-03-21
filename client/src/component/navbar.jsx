import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CiSquarePlus } from 'react-icons/ci';
import { MdLocalGroceryStore } from 'react-icons/md';
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import DarkMode from './DarkMode';
import { useAuth } from '../context/AuthContext'; // Use authentication context

const Navbar = () => {
  const { isAuthenticated, signOut } = useAuth(); // Get authentication state
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const signoutHandler = () => {
    signOut();
    setMenuOpen(false); // Close menu after logout
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <nav className="fixed z-50 top-2 left-2 right-2 rounded-xl backdrop-blur-md bg-black/70 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Left Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-yellow-400 font-bold text-2xl sm:text-3xl"
        >
          <MdLocalGroceryStore className="text-yellow-500" />
          <span>Product Store</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link
                to="/create-product"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
              >
                <CiSquarePlus className="text-xl" />
                <span className="hidden sm:block">Add Product</span>
              </Link>
              <button
                onClick={signoutHandler}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
              >
                <span className="hidden sm:block">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              >
                <span className="hidden sm:block">Login</span>
              </Link>
              <Link
                to="/auth/signup"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
              >
                <span className="hidden sm:block">Sign Up</span>
              </Link>
            </>
          )}

          <DarkMode />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-gray-800 text-white flex flex-col space-y-4 px-6 py-4"
        >
          {isAuthenticated ? (
            <>
              <Link
                to="/create-product"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
                onClick={() => setMenuOpen(false)}
              >
                <CiSquarePlus className="text-xl" />
                <span>Add Product</span>
              </Link>
              <button
                onClick={signoutHandler}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
              >
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                onClick={() => setMenuOpen(false)}
              >
                <span>Login</span>
              </Link>
              <Link
                to="/auth/signup"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
                onClick={() => setMenuOpen(false)}
              >
                <span>Sign Up</span>
              </Link>
            </>
          )}

          <DarkMode />
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
