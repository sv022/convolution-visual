<script setup
  lang="ts">
  import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="md:flex justify-center space-x-10 items-center md:py-[20dvh]">
    <RouterLink to="/conv2d">
      <div class="border p-2 border-gray-500 rounded-md">
        <img src="../assets/homepage_demo2.png" alt="demo" width="600" />
        <h2 class="text-2xl font-bold text-center">Convolution Grayscale</h2>
      </div>
    </RouterLink>
    <RouterLink to="/convrgb">
      <div class="border p-2 border-gray-500 rounded-md">
        <img src="../assets/homepage_demo3.png" alt="demo" width="600" />
        <h2 class="text-2xl font-bold text-center">Convolution RGB</h2>
      </div>
    </RouterLink>
  </main>
</template>
