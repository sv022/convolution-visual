<script setup lang="ts">
import { cn } from '@/lib/utils'
import { computed, ref, watch } from 'vue'
import grayscaleToHex from '@/utils/grayscaleToHex'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import Label from '../ui/label/Label.vue'
import Slider from '../ui/slider/Slider.vue'
import Button from '../ui/button/Button.vue'
import invertGrayscaleToHex from '@/utils/invertGrayscale'
import { useconv2dStore } from '@/stores/conv2d'

const conv2dStore = useconv2dStore()

const props = defineProps<{
  value: number
  pixelValue: number
  posX: number
  posY: number
  size: string
}>()

const val = ref<number[]>([Math.round(props.value * 100) / 100])
const pixelVal = computed<number>(() => props.pixelValue || 0)

const step = 0.01

const pixelValue = computed({
  get() {
    return [Math.round(props.value * 100) / 100]
  },
  set(newValue) {
    val.value = newValue
  },
})

const pixelFontSize = computed<string>(() => {
  if (props.size == 'size-7') return 'text-[12px]'
  return 'text-md'
})

const kernelValueTextStyle = computed<string>(() => {
  if (props.value > 0) return 'text-emerald-700'
  else if (props.value < 0) return 'text-rose-700'
  return 'text-neutral-700'
})

const bgColor = computed<string>(() => {
  return grayscaleToHex(pixelVal.value)
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
    <div class="flex flex-col items-center">

      <div :class="cn('flex justify-center items-center border text-gray-500', props.size, pixelFontSize)
        " :style="{ backgroundColor: bgColor, color: invertGrayscaleToHex(pixelVal) }">
        {{ pixelVal.toFixed(2) }}
      </div>
      <ContextMenuTrigger>
        <div class="flex items-center justify-center h-10 w-10 text-nowrap text-md">
          <mark>x <wbr /></mark><mark :class="kernelValueTextStyle">{{ props.value.toFixed(2) }}</mark>
        </div>
      </ContextMenuTrigger>
    </div>
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

<style scoped>
mark {
  background-color: transparent;
}
</style>
