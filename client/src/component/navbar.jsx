import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiSquarePlus } from 'react-icons/ci';
import { MdLocalGroceryStore } from 'react-icons/md';

import DarkMode from './darkMode';

const Navbar = () => {
  return (
    <div className="shadow-sm fixed z-50 bg-inherit top-0 right-0  left-0 shadow-slate-400">
      <main className="max-w-[1600px] flex items-center justify-between mx-auto px-4 sm:px-8 pt-5 pb-2 mb-4">
        {/* Left Logo Section */}
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-[var(--primary)] uppercase font-bold lg:text-4xl text-[16px] sm:text-2xl"
          >
            <span>Product Store</span>
            <MdLocalGroceryStore className="text-[var(--secondary)]" />
          </Link>
        </div>

        {/* Right Icons Section */}
        <section className="flex items-center flex-row lg:text-3xl text-[20px] sm:text-[24px] gap-2 font-semibold">
          <Link
            to="/create-product"
            className={`p-1 text-center rounded-sm shadow-sm bg-gray-600/20 hover:bg-gray-600/30 text-[var(--text)]`}
          >
            <CiSquarePlus />
          </Link>

          <DarkMode />
        </section>
      </main>
    </div>
  );
};

export default Navbar;
