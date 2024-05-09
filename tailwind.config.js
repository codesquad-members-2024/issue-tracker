/** @type {import('tailwindcss').Config} */
export default {
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
        "7%": "7%"

      }
    },
  },
  plugins: [],
}