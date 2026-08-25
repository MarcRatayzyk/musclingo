/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0B0D10",
        surface: "#141820",
        elevated: "#1C2230",
        border: "#2A3344",
        muted: "#8B95A8",
        accent: "#7CFFB2",
        danger: "#FF6B7A",
      },
    },
  },
  plugins: [],
};
