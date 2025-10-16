/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1", // Indigo moderna
        accent: "#a855f7",  // Roxo vibrante
        glassWhite: "rgba(255, 255, 255, 0.2)",
      },
      boxShadow: {
        float: "0 8px 32px rgba(0, 0, 0, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
}; 
