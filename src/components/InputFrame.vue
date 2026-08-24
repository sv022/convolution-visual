<script setup lang="ts">

import PixelsMatrix from './PixelsMatrix/PixelsMatrix.vue';
import OutputMatrix from './OutputMatrix/OutputMatrix.vue';
import KernelView from './Kernel/KernelView.vue';

</script>

<template>
  <div class="flex flex-col items-center space-y-10 md:flex-row md:justify-around md:p-4 md:min-w-285">
    <PixelsMatrix />
    <KernelView />
    <OutputMatrix />
  </div>
</template>
