/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}" // Code fix: Bahar rakhi hui saari files ko scan karega
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
      },
      colors: {
        dark: '#0C0C0C',
        light: '#D7E2EA'
      }
    },
  },
  plugins: [],
}
