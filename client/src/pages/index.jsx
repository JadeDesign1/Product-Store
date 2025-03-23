import React from 'react';
import { SiDrone } from 'react-icons/si';
import { ToastContainer } from 'react-toastify';
import ProductContainer from '../component/productContainer';

const Homepage = () => {
  return (
    <div className="max-w-[1600px] min-h-[100vh] md:px-0 mx-auto">
      <ToastContainer />
      <div className="fixed left-0  right-0 bg-background/80 backdrop-blur-md py-[12px] z-30">
        <h1 className="lg:text-2xl text-center  font-bold sm:text-lg text-base flex items-center   justify-center gap-2  uppercase">
          <span>Current Products</span>
          <SiDrone />
        </h1>
      </div>

      {/* Show "No product found" message if success is false */}

      <div className="pt-[54px] lg:pt-[62px]">
        <ProductContainer />
      </div>
    </div>
  );
};

export default Homepage;
