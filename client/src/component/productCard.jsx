import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useProductStore, useUserStore } from './product';
import Overlay from './overlay';

const ProductCard = ({ product }) => {
  const { isLogged } = useUserStore();
  // eslint-disable-next-line react/prop-types
  const { image, name, price, _id: id } = product;
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { deleteProduct } = useProductStore();
  return (
    <div className="w-full shadow-lg duration-300 transition-all rounded-lg pb-2 overflow-hidden hover:shadow-xl  bg-[#312d6d1c]">
      <img
        className="h-[250px] w-full object-cover object-full"
        src={image}
        alt=""
      />
      <div className="flex pt-2 px-4 flex-col font-semibold leading-tight gap-1">
        <h2 className="text-base lg:text-lg capitalize font-bold">{name}</h2>
        <p className="text-sm lg:text-base">${price}</p>
      </div>
      {isLogged && (
        <div className="flex pt-2 gap-2 px-4 text-[#3b3c3d]">
          <button
            className="p-2 text-xl bg-blue-300 hover:bg-blue-400 rounded-md text-center"
            onClick={() => setIsOverlayOpen(true)}
          >
            <FaEdit />
          </button>
          <button
            onClick={() => deleteProduct(id)}
            className="p-2  hover:bg-red-400 text-base lg:text-lg bg-red-300 rounded-md text-center"
          >
            <MdDelete />
          </button>
        </div>
      )}
      <Overlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
        product={product}
      />
    </div>
  );
};

export default ProductCard;
