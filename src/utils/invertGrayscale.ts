export default function invertGrayscaleToHex(grayscaleValue: number): string {
  if (grayscaleValue < 0) return '#ffffff'
  if (grayscaleValue > 1) return '#000000'

  const invertedValue = 1 - grayscaleValue

  if (invertedValue >= 0.4 && invertedValue <= 0.6) return '#dddddd'

  const byteValue = Math.round(invertedValue * 255)

  const hexByte = byteValue.toString(16).padStart(2, '0')

  return `#${hexByte}${hexByte}${hexByte}`
}
