import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "Roboto", "Helvetica", "Arial", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"],
      },
      colors: {
        primary_color: "#343758",
        primary_gray: "#A8AEB6",
        stroke_color: "#E0E0E0",
        card_bg: "#F4F4F4",
        in_progress: "#5AC29E",
        untouched: "#E20074",
      },
    },
  },
  plugins: [],
};
export default config;
