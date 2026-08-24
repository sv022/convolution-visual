<script setup lang="ts">

import PixelsMatrix from './PixelsMatrix/PixelsMatrix.vue';
import OutputMatrix from './OutputMatrix/OutputMatrix.vue';
import KernelView from './Kernel/KernelView.vue';

</script>

<template>
  <div class="flex flex-col items-center space-y-10 md:flex-row md:justify-around md:p-4 md:min-h-128 md:min-w-285">
    <div class="flex items-center justify-center">
      <PixelsMatrix />
    </div>
    <div class="flex min-w-100 items-center justify-center">
      <KernelView />
    </div>
    <div class="flex items-center justify-center">
      <OutputMatrix />
    </div>
  </div>
</template>
