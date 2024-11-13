/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'card-img-1': "url('./src/assets/labtop.svg')",
        'card-img-2': "url('./src/assets/maninsuit.svg')",
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
  darkMode: ['selector', '[data-theme="dark"]']
}