<script setup lang="ts">
import { Label } from '@/components/ui/label'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'

import PremadeImages from './PremadeImages.vue';
import { useconv2dStore } from '@/stores/conv2d';
import { useVisualsStore } from '@/stores/visuals.ts';
import ImageUpload from './ImageUpload.vue';
import Checkbox from '../ui/checkbox/Checkbox.vue';

const conv2dStore = useconv2dStore()
const visualsStore = useVisualsStore()

</script>

<template>

  <div class="space-y-4">
      <h3 class="text-center text-3xl font-bold text-carbon">Input Settings</h3>
      <NumberField id="padding" :default-value="0" :min="0" :max="7" :model-value="conv2dStore.padding">
        <Label for="padding">Padding</Label>
        <NumberFieldContent>
          <NumberFieldDecrement @click="conv2dStore.decrementPadding()" />
          <NumberFieldInput />
          <NumberFieldIncrement @click="conv2dStore.incrementPadding()" />
        </NumberFieldContent>
      </NumberField>
      <div class="flex items-center gap-3">
        <Checkbox id="showPixelValues" v-model="visualsStore.showPixelValues" :disabled="conv2dStore.input.width > 32" />
        <Label for="showPixelValues">Show pixel values</Label>
      </div>
      <div class="flex items-center gap-3">
        <Checkbox id="showPixelBorders" v-model="visualsStore.showPixelBorders" />
        <Label for="showPixelBorders">Show pixel borders</Label>
      </div>
      <PremadeImages />
      <ImageUpload />
  </div>
</template>
