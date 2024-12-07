/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
          light: '#818cf8'
        },
        secondary: {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#34d399'
        },
        dark: '#0f172a',
        light: '#f8fafc',
        accent: '#f472b6'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('https://replicate.delivery/pbxt/IJe0XFuBkPWoZPkqxPWMGBDwkQK9J5Ptr9c6oRWrxwrOeHHE/out-0.png')",
      },
      boxShadow: {
        'neon': '0 0 20px rgba(99, 102, 241, 0.5)',
        'neon-strong': '0 0 30px rgba(99, 102, 241, 0.8)',
      },
    },
  },
  plugins: [],
}