<script setup lang="ts">
import { cn } from '@/lib/utils';
import { useVisualsStore } from '@/stores/visuals';
import grayscaleToHex from '@/utils/grayscaleToHex';
import invertGrayscaleToHex from '@/utils/invertGrayscale';

const props = defineProps<{
  value: number
  size: string
}>();

const visualsStore = useVisualsStore()
</script>

<template>

<div
  :class="cn('flex justify-center items-center size-10 text-[7px]', props.size, {'border' : visualsStore.showPixelBorders})"
  :style="{ backgroundColor: grayscaleToHex(props.value), color: invertGrayscaleToHex(props.value) }">
  {{ props.value ? props.value.toFixed(2) : '0' }}
</div>

</template>
