import React, { useEffect } from 'react';
import { SiDrone } from 'react-icons/si';
import { useProductStore } from '../../component/product';
import ProductCard from '../../component/productCard';
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

const AuthHome = () => {
  const { fetchProducts, products, success } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);

  return (
    <div className="max-w-[1600px] min-h-[80vh]  px-4 md:px-0 mx-auto">
      <ToastContainer />
      <div className="fixed  left-0 right-0 bg-[var(--bg)] py-[4px] z-30">
        <h1 className="lg:text-2xl text-center  font-bold sm:text-lg text-base flex items-center justify-center gap-2  uppercase">
          <span>Current Products AuthHomepage</span>
          <SiDrone />
        </h1>
      </div>

      {/* Show "No product found" message if success is false */}

      <div className=" pt-12">
        <div className="flex flex-row items-center justify-center md:text-base text-sm font-bold">
          {success === false && products.length < 1 && (
            <h2 className="text-gray-500 text-center">
              Opps!!!!!!! <br />
              Server is down, try again later
            </h2>
          )}
          {success === true && products.length < 1 && (
            <div className="flex flex-row justify-center gap-3">
              <h2 className="text-gray-500">No product found 😎</h2>
              <Link
                to="/create-product"
                className="text-[var(--text2)] hover:underline"
              >
                Add Product
              </Link>
            </div>
          )}
        </div>

        {/* Render products if available */}
        <div className="grid grid-cols-1 pt-12 duration-300 gap-4 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center md:px-4">
          {success === true &&
            products.length > 0 &&
            products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AuthHome;
