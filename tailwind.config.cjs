/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        accent: '#aa3bff'
      }
    }
  },
  plugins: []
}
