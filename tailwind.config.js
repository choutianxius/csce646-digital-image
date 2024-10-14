/** @type {import('tailwindcss').Config} */
import tailwindTypography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./pr01/index.html"],
  theme: {
    extend: {},
  },
  plugins: [tailwindTypography],
};
