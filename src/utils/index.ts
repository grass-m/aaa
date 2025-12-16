
export const addZero = (n: number) => {
  return n >= 10 ? ('' + n) : ('0' + n)
}

export const format = (second: number) => {
  const h = addZero(Math.floor(second / 60 / 60))
  const m = addZero(Math.floor(second / 60 % 60))
  const s = addZero(Math.floor(second % 60))
  return `${h}:${m}:${s}`
}