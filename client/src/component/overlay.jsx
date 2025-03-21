import React, { useState } from 'react';
import { useProductStore } from './product';
import { FaClosedCaptioning } from 'react-icons/fa';

const Overlay = ({ isOpen, onClose, product }) => {
  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState(product);
  const { updateProduct, fetchProducts } = useProductStore();

  const productTitle = [
    { title: 'name' },
    { title: 'price' },
    { title: 'image' },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateProduct(productInfo); // Ensure update completes

      // ✅ Refetch the products before closing the form
      await fetchProducts();

      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center">
      <div className="px-4 py-5 flex flex-col gap-2 rounded-md mx-auto bg-[var(--text)] text-white/80 mt-12 w-4/5 sm:w-[550px] relative ">
        <h2 className="text-2xl lg:text-3xl text-center text-white/80 font-bold pb-4 ">
          Update Product
        </h2>
        <section className="flex flex-col gap-2">
          {productTitle.map((pTitle, i) => {
            const { title } = pTitle;

            return (
              <div
                key={i}
                className="flex flex-row gap-4 items-center justify-between pt-2"
              >
                <label className="font-bold text-xl lg:text-2xl tracking-wider w-[30%] capitalize">
                  {title}:
                </label>{' '}
                <input
                  className="outline-none pl-2 w-full bg-neutral-500/60 font-semibold rounded-sm text-base sm:text-lg lg:text-xl py-2"
                  value={productInfo[title] || ''} // ✅ Dynamically access the object's property
                  onChange={
                    (e) =>
                      setProductInfo({
                        ...productInfo,
                        [title]: e.target.value,
                      }) // ✅ Correctly update the property
                  }
                />
              </div>
            );
          })}
        </section>
        <section className="flex  gap-4 items-center justify-between flex-row">
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-400 text-white px-4 py-2 rounded "
          >
            {loading ? 'Updating....' : ' Update'}
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
