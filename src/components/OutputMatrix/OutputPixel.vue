<script setup
  lang="ts">
  import { cn } from '@/lib/utils';
  import grayscaleToHex from '@/utils/grayscaleToHex';
  import invertGrayscaleToHex from '@/utils/invertGrayscale';

  const props = defineProps<{
    value: number
    size: string
    highlight: boolean
  }>();

</script>

<template>

  <div
    :class="cn('flex justify-center items-center size-10 border text-[7px]', props.size, { 'border-red-500': props.highlight })"
    :style="{ backgroundColor: grayscaleToHex(props.value), color: invertGrayscaleToHex(props.value) }">
    {{ props.value ? props.value.toFixed(2) : '0' }}
  </div>

</template>
