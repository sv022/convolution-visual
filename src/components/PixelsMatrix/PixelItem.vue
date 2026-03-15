<script setup
  lang="ts">
  import { cn } from '@/lib/utils';
  import HoverCard from '../ui/hover-card/HoverCard.vue';
  import HoverCardContent from '../ui/hover-card/HoverCardContent.vue';
  import HoverCardTrigger from '../ui/hover-card/HoverCardTrigger.vue';
  import grayscaleToHex from '@/utils/grayscaleToHex';
  import { Slider } from '@/components/ui/slider'
  import { Label } from '@/components/ui/label'
  import { computed, ref } from 'vue';
  import { useconv2dStore } from '@/stores/conv2d';
  import { Button } from '../ui/button';
  import invertGrayscaleToHex from '@/utils/invertGrayscale';

  const conv2dStore = useconv2dStore()

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
    <HoverCard :open-delay="1500" :close-delay="1000">
      <HoverCardTrigger>
        <div
          :class="cn('flex items-center justify-center size-5 text-[7px] border', props.size, { 'border-red-500': props.highlight })"
          :style="{ backgroundColor: grayscaleToHex(props.value), color: invertGrayscaleToHex(props.value) }">
          {{ props.value ? props.value.toFixed(2) : '0' }}
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <div class="space-y-2">
          <Label class="p-2" for="slider">Pixel value: {{ pixelValue }}</Label>
          <span class="flex">
            <Button variant="ghost" @click="updatePixel(props.posX, props.posY, pixelValue[0] - step)"
              @click.shift.stop="updatePixel(props.posX, props.posY, pixelValue[0] - step * 10)">-</Button>
            <Slider id="slider" v-model="pixelValue" :min="0" :max="1" :step="0.05"
              @update:model-value="updatePixel(props.posX, props.posY, pixelValue[0])" />
            <Button variant="ghost" @click="updatePixel(props.posX, props.posY, pixelValue[0] + step)"
              @click.shift.stop="updatePixel(props.posX, props.posY, pixelValue[0] + step * 10)">-</Button>
          </span>
          <Label class="p-2">Position: ({{ props.posX }}, {{ props.posY }})</Label>
        </div>
      </HoverCardContent>
    </HoverCard>
  </div>

</template>
