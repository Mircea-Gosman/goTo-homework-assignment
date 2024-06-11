/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'Inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'mainAccent': '#FFE900',
        'secondaryAccent': '#07CB73',
        'darkBackground': '#000000',
        'lightBackground': '#ffffff',
        'darkText': '#000000',
        'lightText': '#ffffff',
        'warning': '#E92A60',
        'lightGray': '#B2CDDB',
        'mediumGray': '#639BB6',
        'darkGray': '#8CB4C8',
      }
    }
  },
  plugins: [],
}

