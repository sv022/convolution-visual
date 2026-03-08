<script setup
  lang="ts">
  import { ChevronLeft } from 'lucide-vue-next';
  import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink to="/">
    <div class="flex flex-row items-center py-4">
      <ChevronLeft class="inline-block mr-2" :size="32" v-if="$route.path !== '/'" />
      <h1 class="text-2xl font-bold text-nowrap text-center ">Convolution visual</h1>
    </div>
  </RouterLink>
</template>
