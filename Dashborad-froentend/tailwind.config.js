// dashboard-frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  // O Tailwind irá escanear esses arquivos por classes como "bg-blue-500"
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Escaneia todos os arquivos dentro de src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}