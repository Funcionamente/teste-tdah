/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        orangeGold: "#FFA733"
      },
      boxShadow: {
        float: "0 8px 32px rgba(0,0,0,0.3)"
      }
    },
  },
  plugins: [],
};
