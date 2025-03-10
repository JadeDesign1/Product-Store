import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/productpage';
import Createpage from './pages/createpage';
import Navbar from './component/navbar';
import { themeChanger } from './component/product';

const App = () => {
  const { dark } = themeChanger;
  return (
    <div
      className={`w-full ${dark ? 'bg-[var(--bg)]' : 'bg-[var(--bg)]'} min-h-[100vh]`}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-product" element={<Createpage />} />
      </Routes>
    </div>
  );
};

export default App;
