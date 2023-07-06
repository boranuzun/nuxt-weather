<script setup>
const route = useRoute();
</script>

<template>
  <div>
    <div v-if="!route.params.id" class="flex flex-col items-center text-white py-12 text-3xl">
      <p>No city was provided, please go back and try again.</p>
    </div>
  </div>
</template>
