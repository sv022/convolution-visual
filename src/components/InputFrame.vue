<script setup
  lang="ts">

  import PixelsMatrix from './PixelsMatrix/PixelsMatrix.vue';
  import KernelMatrix from './KernelMatrix/KernelMatrix.vue';
  import OutputMatrix from './OutputMatrix/OutputMatrix.vue';
</script>

<template>
  <div class="w-full space-y-10 md:flex">
    <div class="flex flex-1/3 items-center justify-center">
      <PixelsMatrix />
    </div>
    <div class="flex flex-1/3 min-w-[200px] items-center justify-center">
      <KernelMatrix />
    </div>
    <div class="flex flex-1/3 items-center justify-center">
      <OutputMatrix />
    </div>
  </div>
</template>
