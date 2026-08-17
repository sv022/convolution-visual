<script setup lang="ts">
import type { Image } from '@/types/image';
import grayscaleToHex from '@/utils/grayscaleToHex';

const props = defineProps<{
  image: Image
}>();
</script>

<template>
  <div>
      <div v-for="i in props.image.height" v-bind:key="i" class="flex">
          <div v-for="j in props.image.height" v-bind:key="i * props.image.height + j"
          class="flex justify-center items-center size-2 text-[8px] text-gray-400"
          :style="{ backgroundColor: grayscaleToHex(props.image.pixels[(i - 1) * props.image.height + (j - 1)]) }">
          <!-- {{ props.image.pixels[(i - 1) * props.image.height + (j - 1)] }} -->
          </div>
      </div>
  </div>
</template>
