/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#ECCB9A",
        grey: "#343534",
      },
      fontFamily: {
        dancing: ["Dancing Script", "serif"],
        montserrat: ["Montserrat", "serif"],
      },
    },
  },
  plugins: [],
};
