module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}', './public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "xs": "360px",
      // => @media (min-width: 428px) { ... }
      
      "sm": '640px',
      // => @media (min-width: 640px) { ... }

      "md": '768px',
      // => @media (min-width: 768px) { ... }

      "lg": '1024px',
      // => @media (min-width: 1024px) { ... }

      "xl": '1280px',
      // => @media (min-width: 1280px) { ... }

      "2xl": '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        "dark-lava": "#463f3a",
        "middle-gray": "#8a817c",
        "pale-silver": "#bcb8b1",
        "alabaster": "#f4f3ee",
        "melon": "#e0afa0",
      },
      fontFamily: {
        abril: ["Abril Fatface", "cursive"],
        lato: ["Lato", "sans-serif"],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
