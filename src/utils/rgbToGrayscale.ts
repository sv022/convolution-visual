// Качественный перевод с учетом гамма-коррекции sRGB
export default function rgbToGrayscale(rgbArray: Uint8Array): number[] {
  const grayscale = new Array(rgbArray.length / 3)

  for (let i = 0, j = 0; i < rgbArray.length; i += 3, j++) {
    let r = rgbArray[i] / 255
    let g = rgbArray[i + 1] / 255
    let b = rgbArray[i + 2] / 255

    r = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)
    g = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)
    b = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4)

    const y = 0.2126 * r + 0.7152 * g + 0.0722 * b

    grayscale[j] = y <= 0.0031308 ? 12.92 * y : 1.055 * Math.pow(y, 1 / 2.4) - 0.055
  }

  return grayscale
}
