/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '360px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },

      backgroundImage: {
        "gradient-horizontal": "linear-gradient(270deg,#cc6aa5,#3e91cc,#2dcca7)",
        "gradient-vertical": "linear-gradient(0deg,#cc6aa5,#3e91cc,#2dcca7)",
        "gradient-diagonal": "linear-gradient(315deg,#cc6aa5,#3e91cc,#2dcca7)"
      },

      colors: {
        navbar: "#3e3e3e",
        lightred: "#ff6060",
        bgcolor: "#ebebeb",
        icons: "#585858",
        copied: "#2dccb8"

      },
      fontFamily: {
        text: ["TexGyreAdventor", "sans-serif"],
      },

      scrollbar: {
        NONE: 'none',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          'scrollbar-width': 'none',
        },
        '.scrollbar-none::-webkit-scrollbar': {
          'display': 'none',
        },
      });
    },
  ],
}

