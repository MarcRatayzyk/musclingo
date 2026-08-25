export const theme = {
  colors: {
    background: "#0B0D10",
    surface: "#141820",
    surfaceElevated: "#1C2230",
    border: "#2A3344",
    text: "#F4F6F8",
    textMuted: "#8B95A8",
    accent: "#7CFFB2",
    accentDim: "#3D8F66",
    danger: "#FF6B7A",
    warning: "#FFB84D",
    categories: {
      anatomie: "#5B8CFF",
      nutrition: "#7CFFB2",
      biomecanique: "#FF8C5B",
      programmation: "#C77DFF",
      recuperation: "#5BE0FF",
    },
  },
  radius: {
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
  },
} as const;

export type Theme = typeof theme;
