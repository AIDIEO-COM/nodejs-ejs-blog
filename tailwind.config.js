/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        "primary-300": "#C8C6FE",
        "primary-400": "#9695CA",
        primary: "#666798",
        "primary-600": "#3D406E",
        "primary-700": "#393C6A",
        "primary-800": "#0B163E",

        "dark-primary-50": "#eaeaec",
        "dark-primary-100": "#dfe0e3",
        "dark-primary-200": "#bdbec4",
        "dark-primary-300": "#2b2d42",
        "dark-primary-400": "#27293b",
        "dark-primary": "#222435",
        "dark-primary-600": "#202232",
        "dark-primary-700": "#1a1b28",
        "dark-primary-800": "#13141e",
        "dark-primary-900": "#0f1017",

        "secondary-100": "#DCCAFF",
        "secondary-200": "#B1A1DA",
        "secondary-300": "#A999D2",
        "secondary-400": "#8879B0",
        secondary: "#615387",
        "secondary-600": "#4E4274",
        "secondary-700": "#3B3060",
        "secondary-800": "#211946",
        "secondary-900": "#1F1743",

        error: "#D30F0F",
        "error-hover": "#A90000",
        "error-hover-light": "#F83F2A",

        warning: "#FFCA36",
        "warning-hover": "#F8B112",

        success: "#006B60",
        "success-light": "#12B76A",
      },
    },
    screens: {
      xs: "375px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xll: "1440px",

      "3xl": "1920px",
    },
  },
  plugins: [],
}
