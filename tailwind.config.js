/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js}", // Adjust the path if your HTML and JS files are elsewhere
    "./public/**/*.html", // Include additional paths if necessary
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3C6D79",
        secondary: "#F9AE65",
      },
    },
  },
  plugins: [],
};
