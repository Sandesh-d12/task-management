/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        navBar: '#111828',
        white: '#ffffff',
        lightBlue:'#3b4b71'
      },
      backgroundImage: {
        'custom-gradient': "linear-gradient(to right, #3c4b72 0%, #9d292c 100%)",
      },
    },
  },
  plugins: [],
}