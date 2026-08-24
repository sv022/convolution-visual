<script setup lang="ts">
import { cn } from '@/lib/utils';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import grayscaleToHex from '@/utils/grayscaleToHex';
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { computed, ref } from 'vue';
import { useconv2dStore } from '@/stores/conv2d';
import { useVisualsStore } from '@/stores/visuals';
import { Button } from '../ui/button';
import invertGrayscaleToHex from '@/utils/invertGrayscale';

const conv2dStore = useconv2dStore()
const visualsStore = useVisualsStore()

const props = defineProps<{
  value: number
  size: string
  highlight: boolean
  posX: number
  posY: number
}>();

const step = 0.01

const pixelValue = ref<number[]>([Math.round(props.value * 100) / 100])

const width = computed(() => {
  return conv2dStore.input.width + conv2dStore.padding * 2
})
const height = computed(() => {
  return conv2dStore.input.height + conv2dStore.padding * 2
})

const updatePixel = (posX: number, posY: number, value: number) => {
  if (value > 1) value = 1
  if (value < 0) value = 0
  pixelValue.value[0] = Math.round(value * 100) / 100
  conv2dStore.setImagePixel(posX - 1 - conv2dStore.padding, posY - 1 - conv2dStore.padding, value)
  const r = Math.floor(conv2dStore.kernel.width / 2)

  let w = posX;
  let h = posY;

  if (w <= r) {
    w = Math.round(r / 2);
  } else if (w >= width.value - r) {
    w = width.value - (r * 2)
  } else {
    w--
  }

  if (h <= r) {
    h = Math.round(r / 2);
  } else if (h >= height.value - r) {
    h = height.value - (r * 2)
  } else {
    h--
  }
  // visualsStore.getHighlightFrame(w, h, r, conv2dStore.input)
}

</script>

<template>
  <div>
    <ContextMenu :open-delay="1500" :close-delay="1000">
      <ContextMenuTrigger>
        <div
          :class="cn('flex items-center justify-center', props.size, { 'border border-red-500': props.highlight }, {'border' : visualsStore.showPixelBorders})"
          :style="{ backgroundColor: grayscaleToHex(props.value), color: invertGrayscaleToHex(props.value) }">
          <p v-if="visualsStore.showPixelValues">{{ props.value ? props.value.toFixed(2) : '0' }}</p>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <div>
          <Label class="flex justify-center w-full p-2 font-bold text-xl" for="slider">
            <p>{{ pixelValue ? pixelValue[0].toFixed(2) : '0' }}</p>
          </Label>
          <span class="flex">
            <Button variant="ghost" @click="updatePixel(props.posX, props.posY, pixelValue[0] - step)"
              @click.shift.stop="updatePixel(props.posX, props.posY, pixelValue[0] - step * 10)">-</Button>
            <Slider id="slider" v-model="pixelValue" :min="0" :max="1" :step="0.05"
              @update:model-value="updatePixel(props.posX, props.posY, pixelValue[0])" />
            <Button variant="ghost" @click="updatePixel(props.posX, props.posY, pixelValue[0] + step)"
              @click.shift.stop="updatePixel(props.posX, props.posY, pixelValue[0] + step * 10)">+</Button>
          </span>
          <Label class="flex justify-center w-full p-2">
            <p>({{ props.posX }}, {{ props.posY }})</p>
          </Label>
        </div>
      </ContextMenuContent>
    </ContextMenu>
  </div>

</template>
