/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          navy: '#33435E',    // Navy blue
          black: '#0F1618',   // Dark black
          green: '#28A17D',   // Emerald green
          brown: '#605453',   // Warm brown
          blue: '#566BC8',    // Royal blue
          dark: '#313D37',    // Dark green
        },
        cyber: {
          background: '#0F1618',
          surface: '#1A2023',
          card: '#242A2E',
          accent: {
            primary: '#28A17D',
            secondary: '#566BC8',
          },
          text: {
            primary: '#E5E7EB',
            secondary: '#9CA3AF',
            accent: '#28A17D',
          },
          border: '#33435E',
          hover: {
            primary: '#239171',
            secondary: '#4A5DB4',
          }
        },
        nav: {
          DEFAULT: '#0F1618',
          text: '#E5E7EB',
          hover: '#28A17D',
        },
        button: {
          primary: '#28A17D',
          secondary: '#566BC8',
          hover: {
            primary: '#239171',
            secondary: '#4A5DB4',
          }
        }
      },
      backgroundColor: {
        'white-transparent': 'rgba(255, 255, 255, 0.5)',
        'black-transparent': 'rgba(15, 22, 24, 0.3)',
        'black-transparent-hover': 'rgba(15, 22, 24, 0.5)',
      },
      opacity: {
        '10': '0.1',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(15, 22, 24, 0.1), 0 2px 4px -1px rgba(15, 22, 24, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(15, 22, 24, 0.1), 0 4px 6px -2px rgba(15, 22, 24, 0.05)',
      }
    },
  },
  plugins: [],
}