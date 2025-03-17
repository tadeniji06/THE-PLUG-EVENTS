/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#07009C",
        "footer-bg":"#07009C",
        "primary-yellow":"#FFA500"
      },
    },
  },
  plugins: [],
};
