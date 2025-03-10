import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          emerald: "#10B981",
          amber: "#F59E0B",
        },
              neutral: {
          coolGray: "#9CA3AF",
          warmGray: "#D1D5DB",
          lightGray: "#F3F4F6",
        },
        background: {
          light: "#F9FAFB",
          dark: "#1F2937",
        },
      },
    },
  },
  plugins: [],
};
export default config;
