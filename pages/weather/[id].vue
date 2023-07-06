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
    <div v-if="weatherData" class="flex flex-col">
      <!-- Banner -->
      <!-- <div class="text-white p-4 bg-weather-primary w-full text-center">
        <p>
          You are currently previewing this city, click the "+" icon to start
          tracking this city.
        </p>
      </div> -->
      <!-- Weather Overview -->
      <div class="flex flex-col items-center text-white py-12">
        <h1 class="text-4xl mb-4 capitalize">{{ name }}</h1>
        <div class="flex flex-col items-center">
          <p class="text-8xl mb-8">
            {{ Math.round(weatherData.value.current.temp) }}&deg;
          </p>
          <p class="">
            Feels like
            {{ Math.round(weatherData.value.current.feels_like) }}&deg;
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
      </div>
      
      <hr class="border-white border-opacity-10 border w-full" />

      <!-- Hourly Forecast -->
      <div class="flex flex-col items-center text-white pt-12 text-3xl">
        Hourly forecast
      </div>
      <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hour in weatherData.value.hourly"
            :key="hour.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hour.dt * 1000).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="
                `http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`
              "
              alt=""
            />
            <p class="text-xl">
              {{ Math.round(hour.temp) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>

      <hr class="border-white border-opacity-10 border w-full" />

      <!-- Weekly Forecast -->
      <div class="flex flex-col items-center text-white pt-12 text-3xl">
        Weekly forecast
      </div>
      <div class="max-w-screen-md w-full py-12">
        <div class="mx-8 text-white">
          <div
            v-for="day in weatherData.value.daily"
            :key="day.dt"
            class="flex items-center"
          >
            <p class="flex-1">
              {{
                new Date(day.dt * 1000).toLocaleDateString("en-us", {
                  weekday: "short",
                })
              }}
            </p>
            <img
              class="w-[50px] h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
              alt=""
            />
            <div class="flex gap-6 flex-1 justify-end">
              <p>
                <Icon
                  name="material-symbols:arrow-upward-alt-rounded"
                  size="1.5rem"
                />
                {{ Math.round(day.temp.max) }}
              </p>
              <p>
                <Icon
                  name="material-symbols:arrow-downward-alt-rounded"
                  size="1.5rem"
                />
                {{ Math.round(day.temp.min) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center text-white py-12 text-3xl">
      <p>Loading weather data...</p>
    </div>

  </div>
</template>
