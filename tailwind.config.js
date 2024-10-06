/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary-color)',
        'secondary': 'var(--secondary-color)',
        'background': 'var(--background-color)',
        'text': 'var(--text-color)',
        'text-light': 'var(--text-color-light)',
        'text-dark': 'var(--text-color-dark)',
        'income': 'var(--income)',
        'expense': 'var(--expense)',
      },
      backgroundImage: theme => ({
        'gradient': 'linear-gradient(135deg, #0b0c10 0%, #1d1e30 50%, #0b0c10 100%)',
      }),
    },
  },
  plugins: [],
}