<script setup lang="ts">

import PixelsMatrix from './PixelsMatrix/PixelsMatrix.vue';
import OutputMatrix from './OutputMatrix/OutputMatrix.vue';
import KernelView from './Kernel/KernelView.vue';

</script>

<template>
  <div class="flex flex-col items-center space-y-10 md:flex-row md:justify-around md:h-150 md:min-w-285">
    <div class="flex items-center justify-center w-lg max-h-150">
      <PixelsMatrix />
    </div>
    <div class="flex min-w-50 items-center justify-center max-h-128">
      <KernelView />
    </div>
    <div class="flex items-center justify-center w-lg max-h-128">
      <OutputMatrix />
    </div>
  </div>
</template>
