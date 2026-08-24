<script setup lang="ts">
import InputFrame from '@/components/InputFrame.vue'
import SettingsFrame from '@/components/SettingsFrame.vue'
import { useVisualsStore } from '@/stores/visuals'
import { onMounted } from 'vue'

const visualsStore = useVisualsStore()
onMounted(() => {
  visualsStore.highlightFrame = [[]]
  visualsStore.highlightPixel = [0, 0]
  visualsStore.channels = ['GS']
})
</script>

<template>
  <main>
    <InputFrame />
    <div class="flex justify-center p-2 md:p-0">
      <SettingsFrame />
    </div>
  </main>
</template>
