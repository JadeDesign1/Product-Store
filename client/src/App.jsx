import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './component/navbar';
import ProtectedRoute from './component/protectedRoute';

// Lazy load pages
const LazyHomepage = React.lazy(() => import('./pages'));
const LazyLogin = React.lazy(() => import('./pages/auth/login'));
const LazySignup = React.lazy(() => import('./pages/auth/signup'));
const LazyAuthHome = React.lazy(() => import('./pages/auth/home'));
const LazyCreatepage = React.lazy(() => import('./pages/createpage'));

// Loading state
const LazyLoader = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    <p className="mt-4 text-lg text-gray-600">Loading content...</p>
  </div>
);

const App = () => {
  return (
    <div
      className={`w-full bg-background overflow-hidden min-h-[100vh] text-text`}
    >
      <Navbar />

      <Suspense fallback={<LazyLoader />}>
        <Routes>
          <Route path="/" element={<LazyHomepage />} />
          <Route path="/auth/login" element={<LazyLogin />} />
          <Route path="/auth/signup" element={<LazySignup />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <LazyAuthHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-product"
            element={
              <ProtectedRoute>
                <LazyCreatepage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
