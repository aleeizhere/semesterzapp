/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      height: {
        100: "30rem",
      },
      fontFamily: {
        logo: ["Quicksand"],
      },
      fontSize: {
        tiny: "8px",
      },
    },
  },
  plugins: [],
};
