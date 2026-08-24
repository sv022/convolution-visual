<script setup lang="ts">
import { cn } from '@/lib/utils';
import { computed, ref, watch } from 'vue';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import Label from '../ui/label/Label.vue'
import Slider from '../ui/slider/Slider.vue'
import Button from '../ui/button/Button.vue'
import { useVisualsStore } from '@/stores/visuals';
import { useconv2dStore } from '@/stores/conv2d';
import grayscaleToHex from '@/utils/grayscaleToHex';
import invertGrayscaleToHex from '@/utils/invertGrayscale';

const props = defineProps<{
  value: number
  posX: number
  posY: number
  size: string
}>()

const visualsStore = useVisualsStore()
const conv2dStore = useconv2dStore()

const val = ref<number[]>([Math.round(props.value * 100) / 100])
const step = 0.01

const pixelValue = computed({
  get() {
    return [Math.round(props.value * 100) / 100]
  },
  set(newValue) {
    val.value = newValue
  },
})

const setKernelPixel = () => {
  conv2dStore.setKernelPixel(props.posX - 1, props.posY - 1, val.value[0])
  return
}
const incrementKernelPixel = (step: number) => {
  val.value[0] += step
  setKernelPixel()
}

const decrementKernelPixel = (step: number) => {
  val.value[0] -= step
  setKernelPixel()
}

watch(
  () => props.value,
  () => (val.value[0] = props.value),
)
</script>

<template>

  <ContextMenu>
    <ContextMenuTrigger>
      <div
        :class="cn('flex justify-center items-center size-10 text-[7px]', props.size, {'border' : visualsStore.showPixelBorders})"
        :style="{ backgroundColor: grayscaleToHex(props.value), color: invertGrayscaleToHex(props.value) }">
        {{ props.value ? props.value.toFixed(2) : '0' }}
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <div>
        <Label class="flex justify-center w-full p-2 font-bold text-xl" for="slider">
            <p>{{ pixelValue ? pixelValue[0].toFixed(2) : '0' }}</p>
        </Label>
        <span class="flex">
          <Button variant="ghost" @click="decrementKernelPixel(step)"
            @click.shift.stop="decrementKernelPixel(step * 10)">-</Button>
          <Slider id="slider" v-model="pixelValue" :min="-1" :max="1" :step="step"
            @update:model-value="setKernelPixel" />
          <Button variant="ghost" @click="incrementKernelPixel(step)"
            @click.shift.stop="incrementKernelPixel(step * 10)">+</Button>
        </span>
        <Label class="flex justify-center w-full p-2">
          <p>({{ props.posX }}, {{ props.posY }})</p>
        </Label>
      </div>
    </ContextMenuContent>
  </ContextMenu>


</template>
