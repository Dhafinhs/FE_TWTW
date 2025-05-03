/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0f172a",   // latar belakang hitam kebiruan
        navy: "#152238",   // biru tua untuk card
        accent: "#f97316", // oranye aksen
      },
    },
  },
  plugins: [],
};
