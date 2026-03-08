<script setup
  lang="ts">
  import { RouterView } from 'vue-router'
  import HeaderLogo from './components/HeaderLogo.vue';
</script>

<template>
  <div class="h-dvh px-10">
    <HeaderLogo />
    <RouterView />
  </div>
</template>

<style scoped></style>
