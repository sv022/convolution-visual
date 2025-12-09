import type { Image } from '@/types/image'

export default function correlate(
  image: Image,
  kernel: Image,
  padding: number = 0,
  stride: number = 1,
): Image {
  if (kernel.width % 2 !== 1 || kernel.height % 2 !== 1) {
    throw new Error('Kernel dimensions should be odd numbers')
  }

  if (stride <= 0) {
    throw new Error('Stride should be a positive number')
  }

  const paddedWidth = image.width + 2 * padding
  const paddedHeight = image.height + 2 * padding
  const paddedImage = new Array(paddedWidth * paddedHeight).fill(0)

  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const newX = x + padding
      const newY = y + padding
      paddedImage[newY * paddedWidth + newX] = image.pixels[y * image.width + x]
    }
  }

  const resultWidth = Math.floor((image.width + 2 * padding - kernel.width) / stride) + 1
  const resultHeight = Math.floor((image.height + 2 * padding - kernel.height) / stride) + 1

  if (resultWidth <= 0 || resultHeight <= 0) {
    return {
      pixels: [],
      width: 0,
      height: 0,
    }
  }

  const resultPixels = new Array(resultWidth * resultHeight).fill(0)

  for (let y = 0; y < resultHeight; y++) {
    for (let x = 0; x < resultWidth; x++) {
      let sum = 0

      const origY = y * stride
      const origX = x * stride

      for (let ky = 0; ky < kernel.height; ky++) {
        for (let kx = 0; kx < kernel.width; kx++) {
          const imageX = origX + kx
          const imageY = origY + ky
          const imageValue = paddedImage[imageY * paddedWidth + imageX]
          const kernelValue = kernel.pixels[ky * kernel.width + kx]

          sum += imageValue * kernelValue
        }
      }

      resultPixels[y * resultWidth + x] = sum
    }
  }

  return {
    pixels: resultPixels,
    width: resultWidth,
    height: resultHeight,
  }
}
