/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard-Regular', 'sans-serif'],
        uhbee: ['UhBeeSe_hyun', 'sans-serif'],
      },
      colors: {
        primary: '#79b2d1',
        secondary: '#6391aa',
        tertiary: '#719cf7',
        notice: '#b5c2c9',
        negative: '#e11900',
        background: '#ffffff',
        black: '#000000',
        white: '#ffffff',
        'gray-100': '#ebecf0',
        'gray-200': '#a7a7a7',
        'gray-300': '#919191',
        'gray-400': '#515462',
      },
      fontSize: {
        xs: '0.625rem',
        sm: '0.656rem',
        base: '0.875rem',
        lg: '1.166rem',
        xl: '1.555rem',
        '2xl': '2.072rem',
        '3xl': '2.763rem',
      },
      spacing: {
        1.5: '6px',
        2.5: '10px',
      },
    },
  },
  plugins: [],
};
