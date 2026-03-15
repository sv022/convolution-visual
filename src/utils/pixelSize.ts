export default function getPixelSize(width: number, height: number) {
  let sizeRound = 2
  if (width > 4) {
    sizeRound = 4
  }
  if (width > 6) {
    sizeRound = 6
  }
  if (width > 8) {
    sizeRound = 8
  }
  if (width > 12) {
    sizeRound = 12
  }
  if (width > 16) {
    sizeRound = 16
  }
  if (width > 24) {
    sizeRound = 24
  }
  if (width > 32) {
    sizeRound = 32
  }
  const pixelSizeMap: { [key: number]: string } = {
    32: 'size-2',
    24: 'size-4',
    16: 'size-5',
    12: 'size-6',
    8: 'size-8',
    6: 'size-9',
    4: 'size-12',
    2: 'size-14',
  }
  return pixelSizeMap[sizeRound]
}
