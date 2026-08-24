<script setup lang="ts">
import { cn } from '@/lib/utils';
import { useVisualsStore } from '@/stores/visuals';
import grayscaleToHex from '@/utils/grayscaleToHex';
import invertGrayscaleToHex from '@/utils/invertGrayscale';

const props = defineProps<{
  value: number
  size: string
  highlight: boolean
}>();

const visualsStore = useVisualsStore()
</script>

<template>
  <div
    :class="cn('flex justify-center items-center border', props.size, { 'border-red-500': props.highlight })"
    :style="{ backgroundColor: grayscaleToHex(props.value), color: invertGrayscaleToHex(props.value) }">
    <p v-if="visualsStore.showPixelValues">{{ props.value ? props.value.toFixed(2) : '0' }}</p>
  </div>
</template>
