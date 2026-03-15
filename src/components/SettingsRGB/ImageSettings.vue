<script setup
  lang="ts">
  import { Label } from '@/components/ui/label'
  import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
  } from '@/components/ui/number-field'

  import PremadeImages from './PremadeImages.vue';
  import ImageUpload from './ImageUpload.vue';
  import { useconvRGBStore } from '@/stores/convRGB';

  const convRGBStore = useconvRGBStore()

</script>



<template>

  <div class="flex flex-col items-center h-full w-full">
    <div class="w-dvw md:w-[440px] p-2">
      <h3 class="text-center text-3xl font-bold pb-3">Input Settings</h3>
      <NumberField class="p-2" id="size" :disabled="convRGBStore.isExampleSelected" :default-value="8" :min="2"
        :max="32" :model-value="convRGBStore.input.height">
        <Label for="size">Image Size</Label>
        <NumberFieldContent>
          <NumberFieldDecrement @click="convRGBStore.decrementInputSize()" />
          <NumberFieldInput />
          <NumberFieldIncrement @click="convRGBStore.incrementInputSize()" />
        </NumberFieldContent>
      </NumberField>
      <NumberField class="p-2" id="padding" :default-value="0" :min="0" :model-value="convRGBStore.padding">
        <Label for="padding">Padding</Label>
        <NumberFieldContent>
          <NumberFieldDecrement @click="convRGBStore.decrementPadding(); convRGBStore.resetKernel()" />
          <NumberFieldInput />
          <NumberFieldIncrement @click="convRGBStore.incrementPadding(); convRGBStore.resetKernel()" />
        </NumberFieldContent>
      </NumberField>
      <PremadeImages />
      <ImageUpload />
    </div>
  </div>
</template>
