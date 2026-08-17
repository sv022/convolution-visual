<script setup lang="ts">
import { useconv2dStore } from '@/stores/conv2d'
import KernelPixelItem from './KernelPixelItem.vue'
import { useVisualsStore } from '@/stores/visuals'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const conv2dstore = useconv2dStore()

const visualsStore = useVisualsStore()

const { kernel } = storeToRefs(conv2dstore)
const { framePixelValues } = storeToRefs(visualsStore)

const kernelPixelSize = computed(() => {
  if (conv2dstore.kernel.width === 7) return 'size-7'
  if (conv2dstore.kernel.width === 5) return 'size-13'
  return 'size-15'
})

const pixelSpacing = computed(() => {
  if (kernel.value.height == 7) return 'flex space-x-7'
  if (kernel.value.height == 5) return 'flex space-x-10'
  return 'flex space-x-11'
})
</script>

<template>
  <div>
    <div v-for="i in conv2dstore.kernel.height" v-bind:key="i" :class="pixelSpacing">
      <KernelPixelItem v-for="j in conv2dstore.kernel.height" v-bind:key="conv2dstore.kernel.height * (i - 1) + j"
        :value="kernel.pixels[(i - 1) * kernel.width + (j - 1)]"
        :pixel-value="framePixelValues[(j - 1) * conv2dstore.kernel.width + (i - 1)]" :pos-x="i" :pos-y="j"
        :size="kernelPixelSize" />
    </div>
  </div>
</template>
