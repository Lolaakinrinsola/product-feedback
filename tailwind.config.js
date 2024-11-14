/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#AD1FEA', // Custom primary color
        darkblue: 'rgb(70, 97, 230)', // RGB format
        darkpurple: 'rgb(70, 97, 230)', // RGB format
        darkwhite: 'rgb(242, 244, 255)', // RGB format
        lightwhite: 'rgb(247, 248, 253)', // RGB format
        lightpurple: 'rgb(58, 67, 116)', // RGB format
        grey: 'rgb(100, 113, 150)', // RGB format
        orange: 'rgb(244, 159, 133)', // RGB format
        lightBlue: 'rgb(98, 188, 250)', // RGB format
      },
      fontFamily: {
        sans: ['Jost', 'sans-serif'], // Add Jost as the default sans-serif font
      },
      backgroundImage: {
        'custom-radial': 'radial-gradient(128.88% 128.88% at 103.9% -10.39%, #E84D70 0%, #A337F6 53.09%, #28A7ED 100%)',
      },
    },
  },
  plugins: [],
}
