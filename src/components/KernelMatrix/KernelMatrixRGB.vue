<script setup
  lang="ts">
  import { useVisualsStore } from '@/stores/visuals';
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import grayscaleToHexChannel from '@/utils/grayscaleToRGB';
  import { useconvRGBStore } from '@/stores/convRGB';
  import KernelPixelItemRGB from './KernelPixelItemRGB.vue';

  const convRGBStore = useconvRGBStore()
  const visualsStore = useVisualsStore()

  const outputPixel = computed<number[]>(() => {
    if (visualsStore.highlightPixel.length === 0) {
      return [0, 0, 0]
    }
    if (convRGBStore.outputR.pixels.length === 0) {
      return [0, 0, 0]
    }
    const w = visualsStore.highlightPixel[0]
    const h = visualsStore.highlightPixel[1]

    if (w > convRGBStore.outputR.width || h > convRGBStore.outputR.height) {
      return [0, 0, 0]
    }

    const r = visualsStore.channels.includes('R') ? convRGBStore.outputR.pixels[((w - 1) * convRGBStore.outputR.width) + (h - 1)] : 0
    const g = visualsStore.channels.includes('G') ? convRGBStore.outputG.pixels[((w - 1) * convRGBStore.outputG.width) + (h - 1)] : 0
    const b = visualsStore.channels.includes('B') ? convRGBStore.outputB.pixels[((w - 1) * convRGBStore.outputB.width) + (h - 1)] : 0

    return [r, g, b]
  })

  const outputPixelValue = computed<string>(() => {
    if (outputPixel.value.every(v => v === 0)) return "-"
    return (outputPixel.value.reduce((a, b) => a + b, 0) / outputPixel.value.length).toFixed(2)
  })

  const outputPixelBGColor = computed<string>(() => {
    if (outputPixelValue.value === "-") {
      return "#FFFFFF"
    }
    return grayscaleToHexChannel(outputPixel.value)
  })
  const outputPixelTextColor = computed<string>(() => {
    if (outputPixelValue.value === "-") {
      return "#000000"
    }
    return '#FFFFFF'
  })

  const { kernel } = storeToRefs(convRGBStore)
  const { framePixelValuesRGB } = storeToRefs(visualsStore)

  const kernelPixelSize = computed(() => {
    if (convRGBStore.kernel.width === 7) return 'size-7'
    if (convRGBStore.kernel.width === 5) return 'size-13'
    return 'size-15'
  })

  const pixelSpacing = computed(() => {
    if (kernel.value.height == 7) return 'flex space-x-7'
    if (kernel.value.height == 5) return 'flex space-x-10'
    return 'flex space-x-11'
  })

  const kernelSum = computed(() => {
    return convRGBStore.kernel.pixels.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  })


</script>

<template>
  <div class="space-y-5">
    <div class="text-center">
      Kernel sum: <mark class="bg-transparent font-bold text-emerald-800">{{ Math.round(kernelSum * 100) / 100
        }}</mark>
    </div>
    <div>
      <div v-for="i in convRGBStore.kernel.height" v-bind:key="i" :class="pixelSpacing">
        <KernelPixelItemRGB v-for="j in convRGBStore.kernel.height"
          v-bind:key="convRGBStore.kernel.height * (i - 1) + j"
          :pixel-value="framePixelValuesRGB[((j - 1) * convRGBStore.kernel.width) + (i - 1)]"
          :value="kernel.pixels[((i - 1) * kernel.width) + (j - 1)]" :pos-x="i" :pos-y="j" :size="kernelPixelSize" />
      </div>
    </div>
    <div class="flex flex-col items-center justify-center text-center space-y-4">
      <div class="font-bold text-2xl">
        =
      </div>
      <div class="flex size-15 items-center justify-center"
        :style="{ backgroundColor: outputPixelBGColor, color: outputPixelTextColor }">
        {{ outputPixelValue }}
      </div>
      <div>
        <p class="text-xs font-semibold">At ({{ visualsStore.highlightPixel[0] || '-' }}, {{
          visualsStore.highlightPixel[1] || '-' }})
        </p>
      </div>
    </div>
  </div>


</template>
