import React, { useState } from 'react';
import { useProductStore } from './product';

const Overlay = ({ isOpen, onClose, product }) => {
  const [productInfo, setProductInfo] = useState(product);
  const { updateProduct } = useProductStore();

  const handleSubmit = async (productInfo) => {
    try {
      updateProduct(productInfo);
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="px-4 py-5 flex flex-col gap-2 rounded-md mx-auto bg-[var(--bgForm)] mt-12 max-w-3xl relative">
        <h2 className="text-xl font-semibold mb-4">Update Product</h2>
        <section>
          {/* name */}
          <div>
            <div className="flex flex-row justify-between pt-2">
              <label className=" font-bold text-xl lg:text-2xl tracking-wider capitalize">
                Name
              </label>
            </div>
            <input
              className="outline-none pl-2 bg-transparent border border-gray-600  shadow shadow-neutral-800 font-semibold rounded-sm text-base sm:text-lg lg:text-xl py-2"
              value={productInfo.name}
              onChange={(e) =>
                setProductInfo({ ...productInfo, name: e.target.value })
              }
            />
          </div>
          {/* price */}
          <div>
            <div className="flex flex-row justify-between pt-2">
              <label className=" font-bold text-xl lg:text-2xl tracking-wider capitalize">
                Price
              </label>
            </div>
            <input
              className="outline-none pl-2 bg-transparent border border-gray-600  shadow shadow-neutral-800 font-semibold rounded-sm text-base sm:text-lg lg:text-xl py-2"
              value={productInfo.price}
              onChange={(e) =>
                setProductInfo({ ...productInfo, price: e.target.value })
              }
            />
          </div>
          {/* image */}
          <div>
            <div className="flex flex-row justify-between pt-2">
              <label className=" font-bold text-xl lg:text-2xl tracking-wider capitalize">
                Image
              </label>
            </div>
            <input
              className="outline-none pl-2 bg-transparent border border-gray-600  shadow shadow-neutral-800 font-semibold rounded-sm text-base sm:text-lg lg:text-xl py-2"
              value={productInfo.image}
              onChange={(e) =>
                setProductInfo({ ...productInfo, image: e.target.value })
              }
            />
          </div>
        </section>
        <section className="flex justify-between flex-row">
          <button
            onClick={() => {
              handleSubmit(productInfo);
              onclose;
            }}
            className="mt-4 bg-[var(--text)] text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
};

export default Overlay;
