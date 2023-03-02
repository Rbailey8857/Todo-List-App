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
    bg: '#ECEFF1',
    base: '#424242',
    black: colors.black,
    'white': '#ffffff',
    red: colors.red
  },
    extend: {
      fontFamily: {
        'gaj': ['GAJ', 'cursive']
      }
    },
  },
  plugins: [],
}