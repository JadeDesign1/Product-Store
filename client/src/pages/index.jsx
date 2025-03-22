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
  }, []);

  return (
    <div className="max-w-[1600px] min-h-[100vh] md:px-0 mx-auto">
      <ToastContainer />
      <div className=" w-full flex flex-col items-center">
        <div className=" pt-20 lg:pt-24 pb-4 z-10 w-full fixed ">
          <h1 className="lg:text-xl text-center font-bold sm:text-lg text-base flex items-center justify-center gap-2 uppercase">
            <span>Current Products</span>
            <SiDrone />
          </h1>{' '}
        </div>
        <div className="pt-[120px] lg:pt[124px]">
          <div className="flex flex-row items-center justify-center md:text-base text-sm font-bold">
            {products.length === 0 && (
              <div className="flex flex-row justify-center gap-3">
                <h2 className="text-gray-500">No product found 😎</h2>

                <Link
                  to="/create-product"
                  className="text-secondary hover:underline"
                >
                  Add new Product
                </Link>
              </div>
            )}
          </div>

          {/* Render products if available */}
          <div className="grid lg:pt-16 w-screen   grid-cols-1 lg:px-20 px-10  pt-8 duration-300 gap-4 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center md:px-4">
            {success &&
              products.length > 0 &&
              products.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
