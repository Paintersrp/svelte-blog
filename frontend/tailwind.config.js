/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        lime: {
          50: 'hsl(82, 80%, 96%)',
          100: 'hsl(84, 65%, 92%)',
          200: 'hsl(85, 55%, 87%)',
          300: 'hsl(86, 53%, 78%)',
          400: 'hsl(87, 52%, 68%)',
          500: 'hsl(88, 50%, 53%)',
          600: 'hsl(88, 60%, 39%)',
          700: '#4b7520',
          800: 'hsl(90, 71%, 23%)',
          900: 'hsl(92, 61%, 20%)'
        }
      }
    }
  },
  plugins: []
};
