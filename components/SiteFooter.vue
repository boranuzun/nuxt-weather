<script setup>
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer>
    <hr class="border-weather-primary border-opacity-10" />
    <section
      class="mx-auto max-w-7xl lg:py-2 text-weather-primary flex flex-row bg-transparent py-3 self-center px-2"
    >
      <p class="flex-1 my-3">
        <span
          >&copy;<b class="ml-1">{{ currentYear }}</b> —
        </span>
        <span><NuxtLink to="https://boranuzun.ch">Boran UZUN</NuxtLink></span>
      </p>
    </section>
  </footer>
</template>
