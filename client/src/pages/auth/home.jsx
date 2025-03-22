import React, { useEffect } from 'react';
import { SiDrone } from 'react-icons/si';
import { useProductStore } from '../../component/product';
import { ToastContainer } from 'react-toastify';
import ProductContainer from '../../component/productContainer';
import { useAuth } from '../../context/AuthContext';

const AuthHome = () => {
  const { fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-[1600px] min-h-[80vh] pt-12 lg:pt-16 md:px-0 mx-auto">
      <ToastContainer />
      <div className="fixed left-0  right-0 bg-background backdrop-blur-md py-[12px] z-30">
        <h1 className="lg:text-2xl text-center  font-bold sm:text-lg text-base flex items-center justify-center gap-2  uppercase">
          <span>Current Products AuthHomepage</span>
          <SiDrone />
        </h1>
      </div>

      {/* Show "No product found" message if success is false */}

      <div className=" pt-12 pb-8 px-4">
        <ProductContainer />
      </div>
    </div>
  );
};

export default AuthHome;
