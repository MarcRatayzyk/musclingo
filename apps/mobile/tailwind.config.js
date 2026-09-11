/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0A0F14",
        surface: "#121A22",
        elevated: "#1A2430",
        border: "#2A3848",
        muted: "#8A96A6",
        accent: "#7CFFB2",
        danger: "#E85D6C",
        chalk: "#E9E4DA",
        copper: "#D4894A",
      },
    },
  },
  plugins: [],
};
