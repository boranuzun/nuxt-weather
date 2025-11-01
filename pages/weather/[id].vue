<script setup>
import moment from "moment";

const config = useRuntimeConfig();
const owmToken = config.owmToken;
// console.log("Runtime config: ", owmToken);

const route = useRoute();
// console.log("Route id: ", route.params.id); 

const cityData = ref(null);
const latitude = ref(null);
const longitude = ref(null);
const name = ref(null);
const weatherData = ref(null);

const fetchGeocodes = async () => {
  try {
    const { data: geocodes } = await useFetch(
      `https://geocoding-api.open-meteo.com/v1/get?id=${route.params.id}`
    );
    cityData.value = geocodes.value;
    latitude.value = cityData.value.latitude;
    longitude.value = cityData.value.longitude;
    name.value = `${cityData.value.name}, ${cityData.value.admin1}`;

    // Debugging
    // console.log("CityData: ", toRaw(cityData.value));
    // console.log("Latitude: ", latitude.value);
    // console.log("Longitude: ", longitude.value);
    weatherForecast();
  } catch (error) {
    console.warn("Error - fetchGeocodes: ", error);
  }
};

const weatherForecast = async () => {
  try {
    const { data: forecast } = await useFetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude.value}&lon=${longitude.value}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric`
    );
    weatherData.value = forecast;
    // console.log("Forecast: ", forecast);
    // console.log("Weather data: ", toRaw(weatherData.value));
  } catch (error) {
    console.log("Error - weatherForecast: ", error);
  }
  return;
};

fetchGeocodes();
</script>

<template>
  <div
    v-if="weatherData"
    class="flex flex-col items-center justify-center my-1 p-10 text-gray-700 gap-10"
  >
    <div
      class="w-full bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40"
    >
      <!-- Banner -->
      <div class="flex justify-between">
        <div class="flex flex-col">
          <span class="text-6xl font-bold"
            >{{ Math.round(weatherData.value.current.temp) }}°C</span
          >
          <span class="font-semibold mt-1 text-gray-500 text-lg">{{
            name
          }}</span>
          <span class="font-semibold text-gray-500 text-lg">{{
            moment()
              .utcOffset(weatherData.value.timezone_offset / 60)
              .format("HH:mm")
          }}</span>
          <span
            class="mt-1 text-gray-500 flex flex-col gap-1 lg:gap-2 sm:flex-row"
          >
            <span
              >Sunrise:
              <b>
                {{
                  new Date(
                    weatherData.value.current.sunrise * 1000
                  ).toLocaleTimeString("fr-FR", {
                    hour: "numeric",
                    minute: "numeric",
                  })
                }}
              </b>
            </span>
            <span class="hidden sm:inline">-</span>
            <span
              >Sunset:
              <b>
                {{
                  new Date(
                    weatherData.value.current.sunset * 1000
                  ).toLocaleTimeString("fr-FR", {
                    hour: "numeric",
                    minute: "numeric",
                  })
                }}
              </b>
            </span>
          </span>
          <span
            class="mt-1 text-gray-500 flex flex-col gap-1 lg:gap-2 lg:flex-row"
            ><span class="capitalize"
              ><b>{{ weatherData.value.current.weather[0].description }}</b>
            </span>
            <span class="hidden lg:inline">/</span>
            <span
              >Feels like
              <b>
                {{ Math.round(weatherData.value.current.feels_like) }}°C</b
              > </span
            ><span class="hidden lg:inline">/</span>
            <span
              >Wind:
              <b>{{ weatherData.value.current.wind_speed }} km/h</b></span
            ></span
          >
        </div>
        <img
          class="h-32 w-32 fill-current"
          :src="`http://openweathermap.org/img/wn/${weatherData.value.current.weather[0].icon}@2x.png`"
          alt=""
        />
      </div>

      <!-- Hourly Forecast -->
      <div class="flex justify-between mt-12">
        <div class="flex flex-row gap-10 overflow-auto">
          <div
            class="flex flex-col items-center text-center"
            v-for="hour in weatherData.value.hourly"
            :key="hour.dt"
          >
            <span class="font-semibold text-lg"
              >{{ Math.round(hour.temp) }}°C</span
            >
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`"
              alt=""
            />
            <span class="font-semibold mt-1">{{
              new Date(hour.dt * 1000).toLocaleTimeString("fr-FR", {
                hour: "numeric",
                minute: "numeric",
              })
            }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Weekly Forecast -->
    <div
      class="flex flex-col space-y-6 w-full bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40"
    >
      <div
        v-for="day in weatherData.value.daily"
        :key="day.dt"
        class="flex justify-between items-center"
      >
        <span class="font-semibold text-lg w-1/6 flex flex-row gap-1"
          ><span>
            {{
              new Date(day.dt * 1000).toLocaleDateString("en-us", {
                weekday: "short",
              })
            }}
          </span>
          <span>
            {{
              new Date(day.dt * 1000).toLocaleDateString("en-us", {
                day: "numeric",
              })
            }}
          </span>
        </span>
        <div class="items-center justify-end pr-10 gap-2 hidden sm:inline">
          <Icon
            name="material-symbols:water-drop-outline-rounded"
            size="1.6rem"
            class="mb-1"
          />
          <span class="font-semibold">{{ day.humidity }}%</span>
        </div>
        <img
          class="w-[50px] h-[50px] object-cover"
          :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
          alt=""
        />
        <span
          class="font-semibold text-lg text-right flex flex-col sm:flex-row sm:gap-1"
          ><span>{{ Math.round(day.temp.min) }}° </span
          ><span class="hidden sm:inline">/</span>
          <span>{{ Math.round(day.temp.max) }}°</span>
        </span>
      </div>
    </div>
  </div>

  <div v-else class="flex flex-col items-center py-12 text-3xl">
    <div role="status">
      <svg
        aria-hidden="true"
        class="w-8 h-8 mr-2 text-gray-200 animate-spin fill-weather-primary"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<!--Weather widget from https://codepen.io/robstinson/ -->
