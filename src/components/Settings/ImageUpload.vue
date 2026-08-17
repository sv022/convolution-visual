<script setup lang="ts">
  import {
      Dialog,
      DialogTrigger,
      DialogContent,
      DialogHeader,
      DialogTitle,
      DialogDescription,
      DialogFooter
  } from '@/components/ui/dialog'
  import Button from '../ui/button/Button.vue'
  import { Upload } from 'lucide-vue-next';
  import jpegUint8ArrayToRgb from '@/utils/uInt8ToRGB';
  import rgbToGrayscale from '@/utils/rgbToGrayscale';
  import { resizeImage } from '@/utils/imageformat';

  import { useDropZone } from '@vueuse/core'
  import { ref } from 'vue'
  import type { Image } from '@/types/image';
  import UploadPreview from './UploadPreview.vue';
  import { useconv2dStore } from '@/stores/conv2d';
  import DialogClose from '../ui/dialog/DialogClose.vue';

  const uploadedImage = ref<Image>()

  const conv2dStore = useconv2dStore()

  async function onDrop(files : File[] | null) {
    if (!files) return
    const resizeTo = 64
    const imageBlob = await (files[0].bytes())
    const pixelsRGB = await (jpegUint8ArrayToRgb(imageBlob))
    const pixelsGrayscale = rgbToGrayscale(Uint8Array.from(pixelsRGB.data))
    let pixels = []
    if (pixelsRGB.height === resizeTo && pixelsRGB.width === resizeTo){
      pixels = pixelsGrayscale
    } else {
      pixels = resizeImage(pixelsGrayscale, pixelsRGB.width, pixelsRGB.height, resizeTo)
    }
    uploadedImage.value = {
      width : resizeTo,
      height : resizeTo,
      pixels : pixels
    }
  }


  function onSave(){
    conv2dStore.input = uploadedImage.value!
    conv2dStore.isExampleSelected = true
    uploadedImage.value = undefined
  }

  const dropZoneRef = ref<HTMLDivElement>()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isOverDropZone } = useDropZone(dropZoneRef, {
    onDrop,
    dataTypes: ['image/jpeg', 'image/png'],
    multiple: false,
    preventDefaultForUnhandled: false,
  })
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline"  class="mx-2">
        Upload Image
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-106.25 md:max-w-150">
      <DialogHeader>
        <DialogTitle>Image upload</DialogTitle>
        <DialogDescription>
          <p>Upload your image here. Once it's uploaded, click "Save" button.</p>
          <p>Your image will be converted to grayscale resized to 64x64.</p>
          <p>For best result use 64x64 images.</p>
        </DialogDescription>
      </DialogHeader>
      <div ref="dropZoneRef" class="flex items-center justify-center w-full aspect-video border border-emerald-800 border-dashed cursor-pointer">
        <UploadPreview v-if="uploadedImage" :image="uploadedImage" />
        <Upload v-else />
      </div>
      <DialogFooter>
        <DialogClose as-child>
          <Button @click="onSave" type="submit" :disabled="!uploadedImage">
            Save
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
