<script setup>
const searchQuery = ref("");
const searchResults = ref(null);
const searchError = ref(null);

const fetchGeocodes = async () => {
  if (searchQuery.value.length >= 2) {
    try {
      const { data: geocodes } = await useFetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery.value}&count=10&language=en&format=json`,
        {
          lazy: true,
        }
      );
      // console.log("Query: ", searchQuery.value);
      // console.log("Geocodes: ", toRaw(geocodes.value?.results));
      searchResults.value = geocodes.value?.results;
      console.warn("Search results lenght: ", searchResults.value.length);
      console.log("Search results: ", searchResults.value);
    } catch {
      searchError.value = true;
    }
    return;
  }
  searchResults.value = null;
};
</script>

<template>
  <form class="mt-20 mx-2">
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only"
      >Search</label
    >
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <svg
          class="w-4 h-4 text-gray-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search for a city or state"
        v-model="searchQuery"
        @input="fetchGeocodes"
      />
    </div>
    <ul
      class="bg-weather-primary bg-opacity-70 text-white w-full rounded-md shadow-md top-[66px] my-2"
      v-if="searchResults"
    >
      <!-- <p class="py-2" v-if="searchError">
              Sorry, something went wrong, please try again.
            </p> -->
      <p
        class="py-2"
        v-if="
          !searchError &&
          (searchResults.value === null || searchResults.length === 0)
        "
      >
        No results match your query, try a different term.
      </p>
      <template v-else>
        <a
          v-for="searchResult in searchResults"
          :key="searchResult.id"
          :href="`/weather/${searchResult.id}`"
        >
          <li
            class="py-3 px-4 cursor-pointer hover:bg-weather-secondary active:text-purple-300 active:ease-in-out active:duration-150 rounded-md"
          >
            <span v-if="searchResult.admin1">
              {{ searchResult.name }}, {{ searchResult.admin1 }},
              {{ searchResult.country }}
            </span>
            <span v-else>
              {{ searchResult.name }}, {{ searchResult.country }}
            </span>
          </li>
        </a>
      </template>
    </ul>
  </form>
</template>
