<script setup
  lang="ts">
  import OutputPixel from './OutputPixelRGB.vue';
  import { useVisualsStore } from '@/stores/visuals';
  import { computed } from 'vue';
  import getPixelSize from '@/utils/pixelSize';
  import { useconvRGBStore } from '@/stores/convRGB';

  const convRGBStore = useconvRGBStore()
  const visualsStore = useVisualsStore()

  function getHighlightFrame(w: number, h: number) {
    visualsStore.getHighlightFrameRGB(w, h, convRGBStore.kernel.width, convRGBStore.inputResult, convRGBStore.padding, convRGBStore.stride)
  }

  const width = computed(() => {
    return convRGBStore.outputR.width
  })
  const height = computed(() => {
    return convRGBStore.outputR.height
  })

  const pixelSize = computed(() => {
    return getPixelSize(width.value, height.value)
  })

  function getRGBValues(index: number) {
    const r = visualsStore.channels.includes('R') ? convRGBStore.outputR.pixels[index] : 0
    const g = visualsStore.channels.includes('G') ? convRGBStore.outputG.pixels[index] : 0
    const b = visualsStore.channels.includes('B') ? convRGBStore.outputB.pixels[index] : 0
    return [r, g, b]
  }

  const checkHighlightPixel = (i: number, j: number) => {
    return visualsStore.highlightPixel[0] === i && visualsStore.highlightPixel[1] === j
  }

</script>

<template>
  <div>
    <div>
      <div v-for="i in convRGBStore.outputR.height" v-bind:key="i" class="flex">
        <OutputPixel v-for="j in convRGBStore.outputR.height" v-bind:key="i * convRGBStore.outputR.height + j"
          channel="R" :values="getRGBValues(((i - 1) * convRGBStore.outputR.width) + (j - 1))" :size="pixelSize"
          :highlight="checkHighlightPixel(i, j)" @click="getHighlightFrame(i, j)" />
      </div>
    </div>
    <div class="w-full mt-2">
      <p class="font-semibold text-xs text-center">{{ convRGBStore.outputR.width }}x{{ convRGBStore.outputR.height }}
      </p>
    </div>
  </div>
</template>
