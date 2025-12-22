import { useEffect, useRef, useState } from "react"
import { format } from "../utils"

export const useCountDown = (s: number, immediate: boolean = false, onFinish?:() => void) => {
  const [second, setSecond] = useState(s)
  const timeId = useRef<number | null>(null)
  const onFinishCallback = useRef(onFinish)

  useEffect(() => {
    onFinishCallback.current = onFinish
  }, [onFinish])

  const start = () => {
    timeId.current = setInterval(() => {
      setSecond(s => {
        const curSecond = s -1
        if (curSecond === 0) {
          stop()
          onFinishCallback.current?.()
        }
        return curSecond
      })
    }, 1000);
  }

  const stop = () => clearInterval(timeId.current!)

  useEffect(() => {
    if (immediate) {
      start()
    }
    return stop
  }, [])

  return {
    timeStr: format(second),
    start,
    stop,
    second
  }
}