/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        flameblue: {
          DEFAULT: '#1e90ff', // flame blue
          dark: '#0a1a2f',   // deep blue for dark mode
          light: '#eaf6ff',  // pale blue for light mode
        },
        black: '#0a0a0a',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
};
