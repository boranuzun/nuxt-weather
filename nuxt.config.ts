// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-icon", "nuxt-api-party"],
  runtimeConfig: {
    owmToken: process.env.OWM_TOKEN,
  },
  apiParty: {
    endpoints: {
      owmAPI: {
        // Base URL of the API
        url: "https://api.openweathermap.org/data/2.5/onecall?",
        // Global headers sent with each request
        headers: {
          Authorization: `Bearer ${process.env.OWM_TOKEN}`,
        },
      },
    },
  },
});
