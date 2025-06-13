/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: '#0B0B1A',
        sun: '#FFD700',
        mercury: '#A9A9A9',
        venus: '#E6E6FA',
        earth: '#4169E1',
        mars: '#CD5C5C',
        jupiter: '#DEB887',
        saturn: '#F4A460',
        uranus: '#87CEEB',
        neptune: '#1E90FF'
      }
    },
  },
  plugins: [],
} 