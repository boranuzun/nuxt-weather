<script setup>
const searchQuery = ref("");
const searchResults = ref(null);

const fetchGeocodes = async () => {
  if (searchQuery.value.length >= 2) {
    const { data: geocodes } = await useFetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery.value}&count=10&language=en&format=json`,
      {
        lazy: true,
      }
    );
    // console.log("Query: ", searchQuery.value);
    // console.log("Geocodes: ", toRaw(geocodes.value?.results));
    searchResults.value = toRaw(geocodes.value?.results);
    console.log("Search results: ", searchResults.value);
    return;
  }
  searchResults.value = null;
};
</script>

<template>
  <main class="bg-weather-secondary text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="fetchGeocodes"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-primary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        class="absolute bg-weather-primary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="searchResults"
      >
        <li
          v-for="searchResult in searchResults"
          :key="searchResult.admin1_id"
          class="py-2 px-2 cursor-pointer hover:bg-weather-secondary"
        >
          <span v-if="searchResult.admin1">
            {{ searchResult.name }}, {{ searchResult.admin1 }},
            {{ searchResult.country }}
          </span>
          <span v-else>
            {{ searchResult.name }}, {{ searchResult.country }}
          </span>
        </li>
      </ul>
    </div>
  </main>
</template>
