/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
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
        'mediumDarkText': '#639BB6',
        'lightText': '#ffffff',
        'warning': '#E92A60',
        'border': '#B2CDDB',
        'mediumDarkBackground': '#B2CDDB',
        'darkGray': '#8CB4C8',
      }
    }
  },
  plugins: [
      require('flowbite/plugin')
  ]
}

