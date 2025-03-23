import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useProductStore } from './product';
import ProductCard from './productCard';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProductContainer = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { fetchProducts, products, success } = useProductStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
    fetchProducts();
  }, []);
  return (
    <>
      <div className="flex flex-row items-center justify-center md:text-base text-sm font-bold">
        <div className="flex flex-row pb-2 justify-center gap-3">
          {products.length < 1 && success && (
            <h2 className="text-gray-500">No product found 😎</h2>
          )}

          {isAuthenticated && (
            <Link to="/create-product" className="hover:underline">
              Add new Product
            </Link>
          )}
          {!isAuthenticated && success && (
            <Link to="/auth/login" className="hover:underline text-right">
              Login to Add a new product
            </Link>
          )}
        </div>
      </div>{' '}
      <div className="grid mx-auto grid-cols-1 max-w-7xl pt-2 duration-300 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center px-4">
        {success &&
          products.length > 0 &&
          products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
      </div>
    </>
  );
};

export default ProductContainer;
