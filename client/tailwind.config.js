/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'sidebar-gradient': 'linear-gradient(to right, #1E40AF, #9333EA)',
        'nav-gradient': 'linear-gradient(to right, #4ADE80, #3B82F6)'
      },
    },
  },
  plugins: [],
}