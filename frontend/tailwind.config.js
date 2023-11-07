/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class', // This enables the dark mode feature
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
        },
        dark: {
          50: '#1a1a1a',
          100: '#333',
          200: '#4d4d4d',
          300: '#666',
          400: '#808080',
          500: '#999',
          600: '#b3b3b3',
          700: '#ccc',
          800: '#e6e6e6',
          900: '#fff'
        },
        // Tertiary colors for buttons, borders, etc in light theme
        lightButton: {
          DEFAULT: 'hsl(88, 60%, 39%)', // Lime 600
          hover: 'hsl(88, 60%, 29%)'
        },
        lightBorder: {
          DEFAULT: 'hsl(90, 71%, 23%)' // Lime 800
        },
        // Tertiary colors for buttons, borders, etc in dark theme
        darkButton: {
          DEFAULT: '#444',
          hover: '#555'
        },
        darkBorder: {
          DEFAULT: '#333'
        }
      }
    }
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ['dark', 'hover'], // This enables the dark variant for background color utility and hover state
      borderColor: ['dark'], // This enables the dark variant for border color utility
      textColor: ['dark'] // This enables the dark variant for text color utility
      // ... other utilities where you want to enable the dark variant
    }
  }
};
