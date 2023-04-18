/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dyna: ['"DynaPuff"', 'cursive'],
      },
    },
    fontFamily: {
      sans: ['"Poppins"', 'sans-serif'],
    },
  },
  plugins: [],
}
