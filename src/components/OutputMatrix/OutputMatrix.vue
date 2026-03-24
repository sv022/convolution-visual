<script setup
  lang="ts">
  import { useconv2dStore } from '@/stores/conv2d';
  import OutputPixel from './OutputPixel.vue';
  import { useVisualsStore } from '@/stores/visuals';
  import { computed } from 'vue';
  import getPixelSize from '@/utils/pixelSize';

  const conv2dstore = useconv2dStore()
  const visualsStore = useVisualsStore()

  function getHighlightFrame(w: number, h: number) {
    visualsStore.getHighlightFrame(w, h, conv2dstore.kernel.width, conv2dstore.inputResult, conv2dstore.padding, conv2dstore.stride)
  }

  const width = computed(() => {
    return conv2dstore.inputResult.width
  })
  const height = computed(() => {
    return conv2dstore.inputResult.height
  })

  const pixelSize = computed(() => {
    return getPixelSize(width.value, height.value)
  })

  const checkHighlightPixel = (i: number, j: number) => {
    return visualsStore.highlightPixel[0] === i && visualsStore.highlightPixel[1] === j
  }

</script>

<template>
  <div>
    <div>
      <div v-for="i in conv2dstore.output.height" v-bind:key="i" class="flex">
        <OutputPixel v-for="j in conv2dstore.output.height" v-bind:key="i * conv2dstore.output.height + j"
          :value="conv2dstore.output.pixels[((i - 1) * conv2dstore.output.width) + (j - 1)]" :size="pixelSize"
          :highlight="checkHighlightPixel(i, j)" @click="getHighlightFrame(i, j)" />
      </div>
    </div>
    <div class="w-full mt-1">
      <p class="font-semibold text-xs text-center">{{ conv2dstore.output.width }}x{{
        conv2dstore.output.height }}</p>
    </div>
  </div>
</template>
