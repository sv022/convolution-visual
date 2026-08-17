import type { Image } from '@/types/image'

export default function imageformat(
  pixels: number[],
  width: number,
  height: number,
  padding: number,
): Image {
  const newWidth = width + 2 * padding
  const newHeight = height + 2 * padding

  const newImage = {
    pixels: new Array(newWidth * newHeight).fill(0),
    width: newWidth,
    height: newHeight,
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const originalPos = y * width + x

      const newPos = (y + padding) * newWidth + (x + padding)

      newImage.pixels[newPos] = pixels[originalPos]
    }
  }

  return newImage
}

export function resizeImage(
  pixels: number[],
  width: number,
  height: number,
  newSize: number,
): number[] {
  const resizedPixels = new Array(newSize * newSize).fill(0)

  const xRatio = width / newSize
  const yRatio = height / newSize

  for (let y = 0; y < newSize; y++) {
    for (let x = 0; x < newSize; x++) {
      const srcX = x * xRatio
      const srcY = y * yRatio

      const x1 = Math.floor(srcX)
      const y1 = Math.floor(srcY)

      const xDiff = srcX - x1
      const yDiff = srcY - y1

      const x2 = Math.min(x1 + 1, width - 1)
      const y2 = Math.min(y1 + 1, height - 1)

      const a = pixels[y1 * width + x1]
      const b = pixels[y1 * width + x2]
      const c = pixels[y2 * width + x1]
      const d = pixels[y2 * width + x2]

      const interpolatedValue =
        a * (1 - xDiff) * (1 - yDiff) +
        b * xDiff * (1 - yDiff) +
        c * (1 - xDiff) * yDiff +
        d * xDiff * yDiff

      resizedPixels[y * newSize + x] = interpolatedValue
    }
  }

  return resizedPixels
}
