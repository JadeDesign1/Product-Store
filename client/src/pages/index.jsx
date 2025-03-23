import React from 'react';
import { SiDrone } from 'react-icons/si';
import { ToastContainer } from 'react-toastify';
import ProductContainer from '../component/productContainer';

const Homepage = () => {
  return (
    <div className="max-w-[1600px] min-h-[100vh] md:px-0 mx-auto">
      <ToastContainer />
      <div className=" w-full flex flex-col items-center">
        <div className=" pt-[48px] lg:pt-[60px] pb-4 z-10 w-full fixed ">
          <h1 className="lg:text-xl text-center font-bold sm:text-lg text-base bg-white/80 backdrop-blur-sm pt-4 mb-4 pb-3 flex items-center justify-center gap-2 uppercase">
            <span>Current Products</span>
            <SiDrone />
          </h1>{' '}
        </div>
        <div className="pt-[115px] lg:pt-[130px]">
          <ProductContainer />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
