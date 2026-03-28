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
        // Primary palette
        'slate-deep': '#2D4F5C',
        'teal-primary': '#1A8080',
        'teal-light': '#7ECECE',
        'teal-mid': '#4A9B8E',
        // Secondary palette
        'orange-burnt': '#B85C38',
        'orange-warm': '#E07B45',
        'sand': '#F5ECD7',
        'offwhite': '#F8F4EE',
        'grey-mid': '#9BA8A8',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        mono: ['Courier Prime', 'Courier New', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      backgroundImage: {
        'grid-naval': "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h80v80H0z' fill='none'/%3E%3Cpath d='M0 40h80M40 0v80' stroke='%237ECECE' stroke-width='0.5' stroke-dasharray='4,8' opacity='0.15'/%3E%3C/svg%3E\")",
      },
      animation: {
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'sonar-pulse': 'sonarPulse 4s ease-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'fade-in': 'fadeIn 0.6s ease forwards',
      },
      keyframes: {
        sonarPulse: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
