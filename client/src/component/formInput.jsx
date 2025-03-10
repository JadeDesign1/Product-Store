import React from 'react';

const FormInput = ({ label, placeholder, onChange, error, onBlur }) => {
  return (
    <>
      <div className="flex flex-row justify-between pt-2">
        <label className=" font-bold text-xl lg:text-2xl tracking-wider capitalize">
          {label}
        </label>
        {error ? (
          <span className=" text-red-500 text-base">{error}</span>
        ) : null}
      </div>
      <input
        className="outline-none pl-2 bg-transparent border border-gray-600  shadow shadow-neutral-800 font-semibold rounded-sm text-base sm:text-lg lg:text-xl py-2"
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
    </>
  );
};

export default FormInput;
