/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '1280': '1280px',
        '45': '45px',
        '90': '90px',
        "70%": "70%",
        "30%": "30%",
        "7%": "7%",
        "594": "594px",
        "36": "36px",
        "230px": "230px",
      },
      colors: {
        "darkModeBG": "#14142C",
        "darkModeBorderBG": "#2A2A44"
      }
    },
  },
  plugins: [],
}