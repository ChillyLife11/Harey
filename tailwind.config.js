const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary:   colors.blue,
      secondary: colors.slate,
      warning:   colors.amber,
      danger:    colors.rose
    }
  },
  plugins: [],
}