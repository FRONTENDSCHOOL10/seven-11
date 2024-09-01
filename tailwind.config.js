/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard-Regular', 'sans-serif'],
        uhbee: ['UhBeeSe_hyun', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
