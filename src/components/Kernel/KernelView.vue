<script setup lang="ts">
import { useconv2dStore } from '@/stores/conv2d'
import { useVisualsStore } from '@/stores/visuals'
import { computed } from 'vue'
import grayscaleToHex from '@/utils/grayscaleToHex'
import invertGrayscaleToHex from '@/utils/invertGrayscale'
import { cn } from '@/lib/utils.ts'
import KernelMatrix from './KernelMatrix.vue'
import KernelFeatureMap from './KernelFeatureMap.vue'


const conv2dstore = useconv2dStore()
const visualsStore = useVisualsStore()

const outputPixelValue = computed<string>(() => {
  if (visualsStore.highlightPixel.length === 0) {
    return '-'
  }
  if (conv2dstore.output.pixels.length === 0) {
    return '-'
  }
  const w = visualsStore.highlightPixel[0]
  const h = visualsStore.highlightPixel[1]

  try {
    return conv2dstore.output.pixels[(w - 1) * conv2dstore.output.width + (h - 1)].toFixed(2)
  } catch {
    return '-'
  }
})

const outputPixelBGColor = computed<string>(() => {
  if (outputPixelValue.value === '-') {
    return '#FFFFFF'
  }
  return grayscaleToHex(Number(outputPixelValue.value))
})
const outputPixelTextColor = computed<string>(() => {
  if (outputPixelValue.value === '-') {
    return '#000000'
  }
  return invertGrayscaleToHex(Number(outputPixelValue.value))
})

const kernelPixelSize = computed(() => {
  if (conv2dstore.kernel.width === 7) return 'size-7'
  if (conv2dstore.kernel.width === 5) return 'size-13'
  return 'size-15'
})

const kernelSum = computed(() => {
  return conv2dstore.kernel.pixels.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  )
})
</script>

<template>

<div class="space-y-2 translate-y-4 min-w-100">
  <div class="text-center">
      Kernel sum:
      <mark class="bg-transparent font-bold text-emerald-800">{{
        Math.round(kernelSum * 100) / 100
      }}</mark>
  </div>
  <div class="flex space-x-4 items-center justify-center">
    <KernelMatrix v-if="visualsStore.kernelViewType === 'matrix'" />
    <KernelFeatureMap v-else />
  </div>
  <div class="flex flex-col items-center justify-center text-center space-y-2">
      <div class="font-bold text-2xl">=</div>
      <div :class="cn('flex items-center justify-center border', kernelPixelSize)"
        :style="{ backgroundColor: outputPixelBGColor, color: outputPixelTextColor }">
        {{ outputPixelValue }}
      </div>
      <div>
        <p class="text-xs font-semibold">
          At ({{ visualsStore.highlightPixel[0] || '-' }}, {{ visualsStore.highlightPixel[1] || '-' }})
        </p>
      </div>
    </div>
</div>

</template>
