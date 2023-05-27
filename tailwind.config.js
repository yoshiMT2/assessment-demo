/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#94BDC9',
          2: '#4D90A4',
          3: '#90D0D9'
        }
      },
      extend: {},
    }
  },
  plugins: [],
}

