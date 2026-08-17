/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { 900: '#0f1e3d', 800: '#1a2e5e', 700: '#1e3a73', 600: '#2563eb', 500: '#3b82f6', 400: '#60a5fa', 50: '#eff6ff' },
        accent: { 600: '#ea6c0a', 500: '#f97316', 400: '#fb923c', 50: '#fff7ed' }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
