/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ethiopianBlue: '#0047AB',
        ethiopianGreen: '#009739',
        ethiopianYellow: '#FFC107',
        ethiopianRed: '#D81B60',
        neonBlue: '#3b82f6',
        neonGreen: '#10b981',
      },
      animation: {
        'slide-in': 'slideIn 0.6s ease-out',
        'slide-in-delay': 'slideInDelay 0.6s ease-out 0.3s',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        slideIn: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInDelay: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}