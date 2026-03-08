<script setup
  lang="ts">
  import { useconv2dStore } from '@/stores/conv2d'
  import PixelItem from './PixelItem.vue'
  import { computed } from 'vue'
  import { useVisualsStore } from '@/stores/visuals'
  import getPixelSize from '@/utils/pixelSize'

  const conv2dStore = useconv2dStore()
  const visualsStore = useVisualsStore()

  const width = computed(() => {
    return conv2dStore.inputResult.width
  })
  const height = computed(() => {
    return conv2dStore.inputResult.height
  })

  const pixelSize = computed(() => {
    return getPixelSize(width.value, height.value)
  })

  function getHighlightFrame(wIn: number, hIn: number) {
    const r = Math.floor(conv2dStore.kernel.width / 2)

    let w = wIn
    let h = hIn

    w = Math.round(w / conv2dStore.stride)
    h = Math.round(h / conv2dStore.stride)

    if (w <= r) {
      if (r === 1) w = r
      else w = Math.round((r - 0.1) / 2)
    } else if (w >= width.value - r) {
      w = width.value - r * 2
    } else {
      w--
    }

    if (h <= r) {
      if (r === 1) h = r
      else h = Math.round((r - 0.1) / 2)
    } else if (h >= height.value - r) {
      h = height.value - r * 2
    } else {
      h--
    }

    // w = Math.min(w, width.value - r - (conv2dStore.stride - 1) * 4)
    // h = Math.min(h, height.value - r - (conv2dStore.stride - 1) * 4)

    visualsStore.channels = ['GS']
    visualsStore.getHighlightFrame(
      w,
      h,
      conv2dStore.kernel.width,
      conv2dStore.inputResult,
      conv2dStore.padding,
      conv2dStore.stride,
    )
  }
</script>

<template>
  <div>
    <div v-for="i in height" v-bind:key="-i" class="flex">
      <PixelItem v-for="j in width" v-bind:key="i * height + j"
        :value="conv2dStore.inputResult.pixels[(i - 1) * width + (j - 1)]" :size="pixelSize"
        :highlight="visualsStore.checkHighlight(i, j, conv2dStore.kernel.height)" @click.stop="getHighlightFrame(i, j)"
        :pos-x="i" :pos-y="j" />
      <!-- <PixelItem v-for="j in props.item.width + props.padding * 2" v-bind:key="j * i" :value="Math.random()" /> -->
    </div>
    <div class="w-full mt-2">
      <p class="font-semibold text-xs text-center">{{ width }}x{{ height }}</p>
    </div>
  </div>
</template>
