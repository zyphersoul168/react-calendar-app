module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}', './public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
