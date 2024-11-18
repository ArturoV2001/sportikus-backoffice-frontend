/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#1E40AF', // Color para bg-primary-600
          700: '#1E3A8A', // Color para hover:bg-primary-700
          300: '#93C5FD', // Color para focus:ring-primary-300
        },
      },
    },
  },
  plugins: [],
}

