/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {colors: {
    bg: '#1A237E',
    primary: '#424242',
    secondary: "#9E9E9E",
  },
    extend: {
      fontFamily: {
        'gaj': ['GAJ', 'cursive']
      }
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
}