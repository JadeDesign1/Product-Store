import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { useProductStore } from './product';
import Overlay from './overlay';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth();
  // eslint-disable-next-line react/prop-types
  const { image, name, price, _id: id, createdBy } = product;
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const { deleteProduct } = useProductStore();
  console.log(createdBy);

  return (
    <div className=" shadow-sm duration-300 transition-all rounded-lg pb-2 overflow-hidden hover:shadow-md hover:shadow-secondary  shadow-secondary bg-[#312d6d1c]">
      <img className="h-[180px] w-full object-cover " src={image} alt="" />
      <div
        className="
      flex flex-row justify-between px-2 "
      >
        <div className="flex flex-col ">
          <h2 className="text-base  font-semibold capitalize">{name}</h2>
          <p className="text-sm ">${price}</p>
        </div>

        <p className="text-[12px] text-right">
          posted by <br />
          {createdBy ? createdBy.username : 'anonymous'}
        </p>
      </div>
      {isAuthenticated && (
        <div className="flex pt-2 px-2  gap-2 text-[#3b3c3d]">
          <button
            className="p-2 text-base bg-blue-300 hover:bg-primary rounded-md text-center"
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
