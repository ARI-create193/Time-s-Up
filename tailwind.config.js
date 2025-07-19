/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lightbluebg: '#f3f6fb',
        primary: '#0a33ad',
        'primary-dark': '#07257a',
      },
    },
  },
  plugins: [],
};
