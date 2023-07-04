<script setup>
const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>

<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="mx-auto p-6 flex flex-col xs:flex-row items-center gap-4 text-white max-w-4xl"
    >
      <a href="/">
        <div class="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m18.35 19.775l-1.4-1.425q-.275-.3-.275-.713t.275-.687q.275-.275.688-.275t.712.275l1.425 1.4q.3.3.3.713t-.3.712q-.3.3-.712.3t-.713-.3ZM6 20q-1.65 0-2.825-1.175T2 16q0-1.65 1.175-2.825T6 12q1.2 0 2.212.65t1.463 1.775l.25.575h.6q1.05 0 1.763.725T13 17.5q0 1.05-.725 1.775T10.5 20H6Zm8.975-2.8q-.1-1.575-1.137-2.725t-2.613-1.425q-.775-1.35-2.087-2.138T6.25 10q.65-1.825 2.225-2.913T12 6q2.5 0 4.25 1.75T18 12q0 1.625-.8 3.013T14.975 17.2ZM20 13q-.425 0-.713-.287T19 12q0-.425.288-.713T20 11h2q.425 0 .713.288T23 12q0 .425-.288.713T22 13h-2ZM5.65 7.05L4.225 5.625q-.275-.275-.275-.7t.275-.7q.3-.3.713-.3t.712.3l1.4 1.425q.275.3.275.713t-.275.687q-.275.275-.7.275t-.7-.275Zm11.3 0q-.275-.275-.275-.687t.275-.713l1.4-1.425q.3-.3.713-.3t.712.3q.275.275.275.7t-.275.7L18.35 7.05q-.275.275-.7.275t-.7-.275ZM12 5q-.425 0-.712-.288T11 4V2q0-.425.288-.713T12 1q.425 0 .713.288T13 2v2q0 .425-.288.713T12 5Z"
            />
          </svg>
          <p class="text-2xl">Nuxt Weather</p>
        </div>
      </a>

      <div class="flex gap-3 flex-1 justify-end">
        <!-- Info icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          class="text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        >
          <path
            fill="currentColor"
            d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.713T12 11q-.425 0-.713.288T11 12v4q0 .425.288.713T12 17Zm0-8q.425 0 .713-.288T13 8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8q0 .425.288.713T12 9Zm0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
          />
        </svg>
        <!-- Plus icon -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          class="text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        >
          <path
            fill="currentColor"
            d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
          />
        </svg>
      </div>

      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            Nuxt Weather allows you to track the current and future weather of
            cities of your choosing.
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within
            the home page. At the bottom of the page, there will be am option to
            delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>
