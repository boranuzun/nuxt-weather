<script setup>
const route = useRoute();
console.log("Route id: ", route.params.id);

const cityData = ref(null);
const latitude = ref(null);
const longitude = ref(null);
const name = ref(null);
const weatherData = ref(null);

const fetchGeocodes = async () => {
  const { data: geocodes } = await useFetch(
    `https://geocoding-api.open-meteo.com/v1/get?id=${route.params.id}`
  );
  cityData.value = geocodes.value;
  latitude.value = cityData.value.latitude;
  longitude.value = cityData.value.longitude;
  name.value = cityData.value.name;
  console.log("CityData: ", toRaw(cityData.value));
  console.log("Latitude: ", latitude.value);
  console.log("Longitude: ", longitude.value);
  weatherForecast();
};

const weatherForecast = async () => {
  const { data: forecast } = await useFetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude.value}&lon=${longitude.value}&appid=<API_KEY>&units=metric`
  );
  console.log("Forecast: ", forecast);
  weatherData.value = forecast;
  console.log("Weather data: ", toRaw(weatherData.value));
  return;
};

fetchGeocodes();
</script>

<template>
  <div>
    <div class="flex flex-col flex-1 items-center">
      <!-- Banner -->
      <div class="text-white p-4 bg-weather-primary w-full text-center">
        <p>
          You are currently previewing this city, click the "+" icon to start
          tracking this city.
        </p>
      </div>
      <!-- Weather Overview -->
      <div class="flex flex-col items-center justify-center text-white py-12">
        <h1 class="text-5xl mb-4 capitalize">{{ name }}</h1>
        <div v-if="weatherData">
          <p class="text-8xl mb-8">
            {{ Math.round(weatherData.value.current.temp) }}&deg;
          </p>
          <p class="">
            Feels like
            {{ Math.round(weatherData.value.current.feels_like) }} &deg;
          </p>
          <p class="capitalize">
            {{ weatherData.value.current.weather[0].description }}
          </p>
          <img
            class="w-[150px] h-auto"
            :src="`http://openweathermap.org/img/wn/${weatherData.value.current.weather[0].icon}@2x.png`"
            alt=""
          />
        </div>
        <div v-else>
          <p>Loading weather data...</p>
        </div>
      </div>
      <hr class="border-white border-opacity-10 border w-full" />
    </div>
  </div>
</template>
