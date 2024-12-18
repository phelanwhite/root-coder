/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xm: "0.8125rem",
      },
      colors: {
        "bg-color": `var(--bg-color)`,
        "text-color": `var(--text-color)`,
        "text-secondary-color": `var(--text-secondary-color)`,
        "box-color": `var(--box-color)`,
        "box-color-hover": `var(--box-color-hover)`,
        "auth-menu-bg-color": `var(--auth-menu-bg-color)`,
      },
      keyframes: {},
      animation: {},
    },
  },
  important: true,
  plugins: [],
};
