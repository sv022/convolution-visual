<script setup
  lang="ts">

  import PixelsMatrix from './PixelsMatrix/PixelsMatrix.vue';
  import KernelMatrix from './KernelMatrix/KernelMatrix.vue';
  import OutputMatrix from './OutputMatrix/OutputMatrix.vue';
</script>

<template>
  <div class="w-full space-y-10 md:flex md:h-[512px] md:min-w-[1140px]">
    <div class="flex flex-1/3 items-center justify-center max-h-[512px] overflow-y-scroll">
      <PixelsMatrix />
    </div>
    <div class="flex flex-1/3 min-w-[200px] items-center justify-center max-h-[512px]">
      <KernelMatrix />
    </div>
    <div class="flex flex-1/3 items-center justify-center max-h-[512px]">
      <OutputMatrix />
    </div>
  </div>
</template>
