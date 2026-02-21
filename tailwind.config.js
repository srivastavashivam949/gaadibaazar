/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff8f0',
          100: '#ffefd6',
          200: '#ffd9a3',
          300: '#ffbc65',
          400: '#ff9a27',
          500: '#f97c00',
          600: '#dc6200',
          700: '#b64800',
          800: '#913900',
          900: '#762f00',
        },
      },
    },
  },
  plugins: [],
};
