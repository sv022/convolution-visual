<script setup lang="ts">
import { useconv2dStore } from '@/stores/conv2d';
import getPixelSize from '@/utils/pixelSize';
import { computed } from 'vue';
import KernelFeatureMapPixel from './KernelFeatureMapPixel.vue';
import { LucideDot } from 'lucide-vue-next';
import { useVisualsStore } from '@/stores/visuals';

const conv2dstore = useconv2dStore()
const visualsStore = useVisualsStore()

const width = computed(() => {
  return conv2dstore.kernel.width
})
const height = computed(() => {
  return conv2dstore.kernel.height
})

const pixelSize = computed(() => {
  return getPixelSize(width.value, height.value)
})

</script>
<template>
  <div class="flex items-center space-x-2">
    <div>
      <div v-for="i in conv2dstore.kernel.height" v-bind:key="i" class="flex">
          <KernelFeatureMapPixel v-for="j in conv2dstore.kernel.height" v-bind:key="i * conv2dstore.kernel.height + j"
            :value="visualsStore.framePixelValues[((j - 1) * conv2dstore.kernel.width) + (i - 1)]" :size="pixelSize" />
        </div>
    </div>
    <LucideDot />
    <div>
        <div v-for="i in conv2dstore.kernel.height" v-bind:key="i" class="flex">
          <KernelFeatureMapPixel v-for="j in conv2dstore.kernel.height" v-bind:key="i * conv2dstore.kernel.height + j"
            :value="conv2dstore.kernel.pixels[((i - 1) * conv2dstore.kernel.width) + (j - 1)]" :size="pixelSize" />
        </div>
      </div>
  </div>
</template>
