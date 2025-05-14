/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ethiopianBlue: '#0047AB',
        ethiopianGreen: '#009739',
        ethiopianYellow: '#FFC107',
        ethiopianRed: '#D81B60',
      },
    },
  },
  plugins: [],
}