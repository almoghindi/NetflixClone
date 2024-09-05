import scrollbarHide from "tailwind-scrollbar-hide";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        netflix: ["NetflixSans", "sans-serif"],
      },
    },
  },
  variants: {
    transitionProperty: ["respoWnsive", "motion-safe", "motion-reduce"],
  },
  extend: {
    // ...
    transitionProperty: ["hover", "focus"],
  },
  plugins: [scrollbarHide],
};
