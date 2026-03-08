<script setup
  lang="ts">
  import { useVisualsStore } from '@/stores/visuals';
  import KernelMatrix from './KernelMatrix/KernelMatrixRGB.vue';
  import PixelsMatrixRGB from './PixelsMatrixRGB/PixelsMatrixRGB.vue';
  import Toggle from './ui/toggle/Toggle.vue';
  import { ref } from 'vue';
  import { cn } from '@/lib/utils';
  import OutputMatrixRGB from './OutputMatrixRGB/OutputMatrixRGB.vue';

  const visualsStore = useVisualsStore()

  const modelR = ref(true)
  const modelG = ref(true)
  const modelB = ref(true)

  function updateChannel(channel: 'R' | 'G' | 'B') {
    if (visualsStore.channels.includes(channel)) {
      visualsStore.channels = visualsStore.channels.filter(c => c !== channel)
      return
    }
    visualsStore.channels.push(channel)
  }

</script>

<template>
  <div class="w-full space-y-10 md:flex">
    <div class="flex flex-col space-y-4 flex-1/3 items-center justify-center">
      <PixelsMatrixRGB />
      <div class="flex space-x-2">
        <Toggle variant="outline" :class="cn('!bg-transparent', modelR ? '!text-emerald-700' : '!text-rose-700')"
          @update:model-value="updateChannel('R')" v-model="modelR">
          R
        </Toggle>
        <Toggle variant="outline" :class="cn('!bg-transparent', modelG ? '!text-emerald-700' : '!text-rose-700')"
          label="G" @update:model-value="updateChannel('G')" v-model="modelG">
          G
        </Toggle>
        <Toggle variant="outline" :class="cn('!bg-transparent', modelB ? '!text-emerald-700' : '!text-rose-700')"
          label="B" @update:model-value="updateChannel('B')" v-model="modelB">
          B
        </Toggle>
      </div>

    </div>
    <div class=" flex flex-1/3 min-w-[200px] items-center justify-center">
      <KernelMatrix />
    </div>
    <div class="flex flex-col space-y-2 flex-1/3 items-center justify-center">
      <OutputMatrixRGB />
    </div>
  </div>
</template>
