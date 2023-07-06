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
  <main class="bg-weather-secondary text-white px-72 sm:px-32">
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
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try again.
        </p>
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
            :href="`/city/${searchResult.id}`"
          >
            <li
              class="py-2 px-2 cursor-pointer hover:bg-weather-secondary active:text-purple-300 active:ease-in-out active:duration-150"
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
    </div>
  </main>
</template>
