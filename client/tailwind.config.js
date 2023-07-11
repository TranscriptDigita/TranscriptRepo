/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#3C1361",
        bgprimary:"#F1F2F5"
      }
    },
  },
  plugins: [],
}

