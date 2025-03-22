import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CiSquarePlus } from 'react-icons/ci';
import { MdLocalGroceryStore } from 'react-icons/md';
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const signoutHandler = () => {
    logout();
    setMenuOpen(false); // Close menu after logout
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <nav className="fixed z-50 bg-background w-full text-white shadow-md">
      <div className="  rounded-xl mx-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2 lg:py-3">
          {/* Left Logo */}
          <Link
            to={isAuthenticated ? '/home' : '/'}
            className="flex items-center gap-2 font-bold text-2xl sm:text-3xl"
          >
            <MdLocalGroceryStore className="text-secondary" />
            <span className=" text-primary">Product Store</span>
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
                  className="flex items-center gap-2 px-4 py-2 border-2 hover:bg-secondary duration-200 border-secondary/70 bg-stone-600 rounded-lg transition"
                >
                  <span className="hidden sm:block">Login</span>
                </Link>
                <Link
                  to="/auth/signup"
                  className="flex items-center gap-2 px-4 py-2 border-2 bg-secondary duration-200 border-secondary/70 hover:bg-stone-600 rounded-lg transition"
                >
                  <span className="hidden sm:block">Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl text-text"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX /> : <HiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-background text-white flex flex-col space-y-4 px-6 py-4"
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
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
