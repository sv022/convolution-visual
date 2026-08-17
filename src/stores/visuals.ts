import type { Image } from '@/types/image'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getFrame,
  getPixelValuesForFrame,
  getPixelValuesForFrameRGB,
} from '@/utils/framePixelsMapping'
import type { ImageRGB } from '@/types/imageRGB'

export const useVisualsStore = defineStore('visuals', () => {
  const highlightFrame = ref<number[][]>([])
  const highlightPixel = ref<number[]>([])
  const framePixelValues = ref<number[]>(Array.from({ length: 3 * 3 }, () => 0))
  const framePixelValuesRGB = ref<number[][]>(Array.from({ length: 3 * 3 }, () => [0, 0, 0]))
  const channels = ref<('R' | 'G' | 'B' | 'GS')[]>(['GS'])
  const kernelViewType = ref<'matrix' | 'features'>('matrix')

  function getHighlightFrame(
    w: number,
    h: number,
    size: number,
    inputPixels: Image,
    padding: number,
    stride: number,
  ) {
    const frame: number[][] = getFrame(w, h, size, padding, stride, inputPixels.width)
    if (frame.length < size * size) return
    framePixelValues.value = getPixelValuesForFrame(inputPixels, frame)

    highlightFrame.value = frame
    highlightPixel.value = [w, h]
  }
  function getHighlightFrameRGB(
    w: number,
    h: number,
    size: number,
    inputPixels: ImageRGB,
    padding: number,
    stride: number,
  ) {
    const frame: number[][] = getFrame(w, h, size, padding, stride, inputPixels.width)
    if (frame.length < size * size) return
    framePixelValuesRGB.value = getPixelValuesForFrameRGB(inputPixels, frame)

    highlightFrame.value = frame
    highlightPixel.value = [w, h]
  }

  function checkHighlight(i: number, j: number, kernelSize: number): boolean {
    if (highlightFrame.value.length === 0) return false
    for (let k = 0; k < highlightFrame.value.length; k++) {
      if (highlightFrame.value[k][0] == i && highlightFrame.value[k][1] == j) return true
    }
    return false
  }

  function clearHighlight() {
    highlightFrame.value = []
    highlightPixel.value = []
    framePixelValues.value = Array.from({ length: 7 * 7 }, () => 0)
    framePixelValuesRGB.value = Array.from({ length: 7 * 7 }, () => [0, 0, 0])
  }

  function toggleKernelView() {
    kernelViewType.value = kernelViewType.value === 'matrix' ? 'features' : 'matrix'
  }

  return {
    channels,
    highlightFrame,
    highlightPixel,
    framePixelValues,
    framePixelValuesRGB,
    getHighlightFrame,
    getHighlightFrameRGB,
    clearHighlight,
    checkHighlight,
    toggleKernelView,
    kernelViewType,
  }
})
