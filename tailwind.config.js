/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'g-red-600': '#B9232C'
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "50%": { transform: "translateY(-20px)", opacity: "0.5" },
          "75%": { transform: "translateY(-10px)", opacity: "0.8" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "translateX(-30px)", opacity: "0" },
          "50%": { transform: "translateX(-20px)", opacity: "0.5" },
          "75%": { transform: "translateX(-10px)", opacity: "0.8" },
          "100%": { transform: "translateX(0px)", opacity: "1" },
        },
      },
      animation: {
        "slide-down": "slideDown 0.5s linear",
        "slide-right": "slideRight 0.5s linear",
      },
    },
  },
  plugins: [],
}
