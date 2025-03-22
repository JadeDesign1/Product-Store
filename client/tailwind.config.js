/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      // // neutral
      // colors: {
      //   primary: {
      //     DEFAULT: '#4caf50',
      //     light: '#e5e1a2',
      //     dark: '#4e4a0c',
      //   },
      //   secondary: '#ff9800',
      //   background: '#777777',
      //   text: '#333333',
      //   accent: '#8bc34a',
      // },
      // light
      colors: {
        primary: {
          DEFAULT: '#3498db',
          light: '#e5e1a2',
          dark: '#4e4a0c',
        },
        secondary: '#f1c40f',
        background: '#f9f9f9',
        text: '#333333',
        accent: '#2ecc71',
      },
      // dark
      // colors: {
      //   primary: {
      //     DEFAULT: '#9b59b6',
      //     light: '#e5e1a2',
      //     dark: '#4e4a0c',
      //   },
      //   secondary: '#1abc9c',
      //   background: '#212121',
      //   text: '#ffffff',
      //   accent: '#f39c12',
      // },
    },
  },
  plugins: [],
};
