// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // You can change these colors to match your preferred theme
        primary: {
          DEFAULT: '#4F46E5', // Indigo
          dark: '#4338CA',
          light: '#E0E7FF'
        },
        secondary: {
          DEFAULT: '#10B981', // Emerald
          dark: '#059669'
        },
        backgroundImage: {
          'gradient-primary': 'linear-gradient(to right, var(--tw-gradient-stops))',
        },
        textPrimary: '#1F2937',  // Dark gray for main text
        textSecondary: '#4B5563', // Medium gray for secondary text
        background: '#F9FAFB', // Light gray background

        
      }
    }
  },
  plugins: [],
}