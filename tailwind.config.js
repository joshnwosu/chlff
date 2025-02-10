/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'white-to-black':
          'linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1))',
        // 'white-to-black': 'linear-gradient(to right, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.3))',
      },
    },
  },
  plugins: [],
};
