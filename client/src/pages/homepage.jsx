import React, { useEffect } from 'react';
import { SiDrone } from 'react-icons/si';
import ProductCard from '../component/productCard';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useProductStore } from '../component/product';
import { useAuth } from '../context/AuthContext';

const Homepage = () => {
  const navigate = useNavigate();
  const { fetchProducts, products, success } = useProductStore();
  const { isAuthenticated } = useAuth(); // Get authentication state from context

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
    fetchProducts();
  }, [isAuthenticated, fetchProducts, navigate]);

  return (
    <div className="max-w-[1600px] min-h-[80vh] px-4 md:px-0 mx-auto">
      <ToastContainer />
      <div className="fixed left-0 right-0 backdrop-blur-md bg-[var(--bg)] py-2 z-30">
        <h1 className="lg:text-2xl text-center font-bold sm:text-lg text-base flex items-center justify-center gap-2 uppercase">
          <span>Current Products</span>
          <SiDrone />
        </h1>
      </div>

      <div className="pt-12">
        <div className="flex flex-row items-center justify-center md:text-base text-sm font-bold">
          {products.length === 0 && (
            <div className="flex flex-row justify-center gap-3">
              <h2 className="text-gray-500">No product found 😎</h2>
              {isAuthenticated && (
                <Link
                  to="/create-product"
                  className="text-[var(--text)] hover:underline"
                >
                  Create a Product
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Render products if available */}
        <div className="grid grid-cols-1 lg:px-20 pt-8 duration-300 gap-4 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center md:px-4">
          {success &&
            products.length > 0 &&
            products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
