/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
        shake: "shake 0.5s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        shake: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "25%": {
            transform: "translateX(-2px)",
          },
          "75%": {
            transform: "translateX(2px)",
          },
        },
      },
    },
  },
  plugins: [],
}
