import React, { useEffect, useState } from 'react';
import { BsFillSunFill } from 'react-icons/bs';
import { FaMoon } from 'react-icons/fa';
import '../App.css';
import { themeChanger } from './product';

const DarkMode = () => {
  const { themeToggle, dark } = themeChanger();
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem('selectedTheme') || 'light'
  );

  console.log(dark);

  useEffect(() => {
    // Apply the selected theme on component mount
    document.querySelector('html').setAttribute('data-theme', selectedTheme);
    localStorage.setItem('selectedTheme', selectedTheme);
  }, [selectedTheme]);

  return (
    <button className="p-1 text-center rounded-sm shadow-sm  bg-gray-600/20 hover:bg-gray-600/30  text-[var(--text)]">
      {selectedTheme === 'light' && (
        <BsFillSunFill
          onClick={() => {
            setSelectedTheme('dark');
            themeToggle('dark');
          }}
        />
      )}
      {selectedTheme === 'dark' && (
        <FaMoon
          onClick={() => {
            setSelectedTheme('light');
            themeToggle('light');
          }}
        />
      )}
    </button>
  );
};

export default DarkMode;
