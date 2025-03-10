import React, { useEffect, useState } from 'react';
import { SiDrone } from 'react-icons/si';
import { useProductStore } from '../component/product';
import { Link } from 'react-router-dom';
import ProductCard from '../component/productCard';
import { ToastContainer } from 'react-toastify';

const Homepage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log(products);
  return (
    <div className="max-w-[1600px] px-4 md:px-0 mx-auto  pt-[96px] md:pt-[105px]">
      <ToastContainer />
      <h1 className="lg:text-4xl font-bold sm:text-3xl text-xl flex items-center pb-4 justify-center gap-2  text-[var(--primary)] uppercase ">
        <span>current product</span>
        <SiDrone />
      </h1>

      {products.length === 0 && (
        <div className="flex flex-row items-center justify-center md:text-lg font-bold gap-3">
          <h2 className="text-gray-500">No product found 😎</h2>
          <Link
            to={'/create-product'}
            className=" text-[var(--text)] hover:underline"
          >
            Create a Product
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 pt-6 duration-300 gap-4 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center md:px-4  ">
        {products.map((product, i) => {
          return <ProductCard key={i} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Homepage;
