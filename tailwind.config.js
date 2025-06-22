/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "components/**/*.{ts,tsx}",
    "./index.html",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canadianRed: "#D32F2F",
        iceWhite: "#F5F5F5",
        coolBlue: "#1976D2",
        successGreen: "#43A047",
        charcoal: "#212121",
        grayText: "#616161",
      },
      fontFamily: {
        onest: ["Onest", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
