<script setup>
const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>

<template>
  <header class="bg-weather-primary bg-opacity-30 shadow-lg">
    <nav
      class="max-w-7xl mx-auto p-6 flex flex-row items-center gap-4 text-white"
    >
      <a href="/" class="flex items-center gap-3">
        <Icon name="material-symbols:partly-cloudy-day" size="2rem" />
        <p class="text-2xl font-semibold">Nuxt Weather</p>
      </a>
    </nav>
  </header>
</template>
