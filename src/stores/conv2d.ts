import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Image } from '@/types/image'
import imageformat from '@/utils/imageformat'
import convolve from '@/utils/convolve'
import getRandomKernel from '@/utils/randomKernel'
import getKernel from '@/utils/exampleKernels'
import type { Kernels } from '@/types/kernels'
import correlate from '@/utils/correlate'

export const useconv2dStore = defineStore('conv2d', () => {
  const input = ref<Image>({
    pixels: [],
    width: 8,
    height: 8,
  })
  const kernel = ref<Image>(getRandomKernel(3))

  const operation = ref<'convolution' | 'correlation'>('correlation')

  const padding = ref<number>(0)
  const stride = ref<number>(1)
  const isKernelSelected = ref<boolean>(false)

  const userKernels = ref<Image[]>([])
  const userKernelsNames = ref<string[]>([])

  function setImage(pixels: number[], widthNew: number, heightNew: number) {
    padding.value = 0
    input.value = imageformat(pixels, widthNew, heightNew, padding.value)
  }
  const incrementPadding = () => {
    padding.value++
  }
  const decrementPadding = () => {
    padding.value--
  }
  const incrementKernelSize = () => {
    kernel.value.height += 2
    kernel.value.width += 2
    kernel.value = getRandomKernel(kernel.value.height)
  }
  const decrementKernelSize = () => {
    kernel.value.height -= 2
    kernel.value.width -= 2
    kernel.value = getRandomKernel(kernel.value.height)
  }

  const setKernel = (kernelType: Kernels) => {
    isKernelSelected.value = true
    kernel.value = getKernel(kernelType)
  }

  const setUserKernel = (name: string) => {
    const index = userKernelsNames.value.indexOf(name)
    kernel.value = userKernels.value[index]
    isKernelSelected.value = true
  }

  const setOperation = (op: 'convolution' | 'correlation') => {
    if (op === operation.value) return
    operation.value = op
    rotateKernel()
  }

  const rotateKernel = () => {
    const { width, height, pixels } = kernel.value

    const temp = [...pixels]

    kernel.value.width = height
    kernel.value.height = width

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const newIndex = i * height + j
        const oldIndex = (width - i - 1) * height + j

        kernel.value.pixels[newIndex] = temp[oldIndex]
      }
    }
  }

  const resetKernel = () => {
    kernel.value = getRandomKernel(3)
    isKernelSelected.value = false
  }

  const saveKernel = (name: string) => {
    if (userKernelsNames.value.includes(name)) {
      userKernels.value[userKernelsNames.value.indexOf(name)] = { ...kernel.value }
    } else {
      userKernels.value.push({ ...kernel.value })
      userKernelsNames.value.push(name)
    }
    localStorage.setItem(
      'userKernels',
      JSON.stringify({ userKernels: userKernels.value, userKernelsNames: userKernelsNames.value }),
    )
  }

  const deleteKernel = (name: string) => {
    const index = userKernelsNames.value.indexOf(name)
    userKernelsNames.value.splice(index, 1)
    userKernels.value.splice(index, 1)
    localStorage.setItem(
      'userKernels',
      JSON.stringify({ userKernels: userKernels.value, userKernelsNames: userKernelsNames.value }),
    )
  }

  const loadKernels = () => {
    const storedKernels = localStorage.getItem('userKernels')
    if (storedKernels) {
      const { userKernels: parsedKernels, userKernelsNames: parsedNames } =
        JSON.parse(storedKernels)
      userKernelsNames.value = parsedNames
      userKernels.value = parsedKernels
    }
  }

  function setImagePixel(i: number, j: number, value: number) {
    input.value.pixels[i * input.value.width + j] = value
  }

  function setKernelPixel(i: number, j: number, value: number) {
    kernel.value.pixels[i * kernel.value.width + j] = value
  }

  const inputResult = computed<Image>(() =>
    imageformat(input.value.pixels, input.value.width, input.value.height, padding.value),
  )

  const output = computed(() => {
    return operation.value === 'convolution'
      ? convolve(input.value, kernel.value, padding.value, stride.value)
      : correlate(input.value, kernel.value, padding.value, stride.value)
  })

  return {
    operation,
    kernel,
    input,
    padding,
    stride,
    inputResult,
    isKernelSelected,
    userKernels,
    userKernelsNames,
    output,
    setImage,
    incrementKernelSize,
    decrementKernelSize,
    incrementPadding,
    decrementPadding,
    setKernel,
    setUserKernel,
    setOperation,
    resetKernel,
    saveKernel,
    deleteKernel,
    loadKernels,
    setImagePixel,
    setKernelPixel,
  }
})
