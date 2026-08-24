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
  if (width >= 32) {
    sizeRound = 32
  }
  if (width >= 64) {
    sizeRound = 64
  }
  const pixelSizeMap: { [key: number]: string } = {
    64: 'size-2 text-[0px]',
    32: 'size-3 text-[4px]',
    24: 'size-4 text-[7px]',
    16: 'size-5 text-[7px]',
    12: 'size-6 text-[8px]',
    8: 'size-8 text-[10px]',
    6: 'size-9 text-[12px]',
    4: 'size-12 text-[12px]',
    2: 'size-14 text-[14px]',
  }
  return pixelSizeMap[sizeRound]
}
