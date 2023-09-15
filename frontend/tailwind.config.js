/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgprimary: "#3c4c5d",
        textprimary: "#7b8a8b",
      },
    },
  },

  plugins: [require("daisyui")],
};
