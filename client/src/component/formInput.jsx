import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormInput = ({ label, name, placeholder, onChange, error, onBlur }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="flex flex-row justify-between pt-2">
        <label className="font-bold text-base lg:text-lg tracking-wider capitalize">
          {name === 'confirm-password' ? 'Confirm Password' : label}
        </label>
        {error && <span className="text-red-500 text-base">{error}</span>}
      </div>
      <div className="relative w-full">
        <input
          type={label === 'password' && !show ? 'password' : 'text'} // ✅ Toggles input type
          className="outline-none pl-2  w-full bg-gray-200  rounded-md text-base lg:py-2 py-1"
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
        {label === 'password' && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute text-2xl z-30 lg:top-3 lg:right-4 top-1 right-2 text-gray-500 hover:text-gray-300"
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    </>
  );
};

export default FormInput;
