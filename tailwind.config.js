/** @type {import('tailwindcss').Config} */
import tailwindTypography from "@tailwindcss/typography";

export default {
  content: [
    "./index.html",
    "./pr01/index.html",
    "./pr02/index.html",
    "./pr03/index.html",
    "./pr03/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindTypography],
};
