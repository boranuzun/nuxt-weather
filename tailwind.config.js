module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#28518a",
        "weather-secondary": "#366dba",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    backgroundImage: {
      //The background image is provided by loading.io
      'clouds': "url('/assets/clouds.svg')",
    }
  },
};
