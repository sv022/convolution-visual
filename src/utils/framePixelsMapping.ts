import type { Image } from '@/types/image'

export function getFrame(
  outputX: number,
  outputY: number,
  kernelSize: number,
  padding: number,
  stride: number,
  originalWidth: number,
): number[][] {
  const r = Math.floor(kernelSize / 2)
  let centerX = outputX * stride + r
  let centerY = outputY * stride + r

  if (stride > 1) {
    centerX--
    centerY--
  }

  const startX = centerX - r
  const startY = centerY - r

  const inputPixels = []

  for (let ky = 0; ky < kernelSize; ky++) {
    for (let kx = 0; kx < kernelSize; kx++) {
      const paddedX = startX + kx
      const paddedY = startY + ky

      const originalX = paddedX
      const originalY = paddedY

      if (
        originalX >= 0 &&
        originalX <= originalWidth &&
        originalY >= 0 &&
        originalY <= originalWidth
      ) {
        inputPixels.push([originalX, originalY])
      }
    }
  }

  return inputPixels
}

export function getPixelValuesForFrame(image: Image, frame: number[][]): number[] {
  return frame.map((coord) => {
    const x = coord[0] - 1
    const y = coord[1] - 1
    const index = x * image.width + y
    return image.pixels[index]
  })
}
