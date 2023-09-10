import { ref } from 'vue'
import { MILLISECONDS_IN_SECONDS } from '@/constants'

export const useStopWatch = (initialSeconds) => {
  const seconds = ref(initialSeconds)
  const isRunning = ref()
  const temp = 120

  function start() {
    isRunning.value = setInterval(() => {
      seconds.value += temp
    }, MILLISECONDS_IN_SECONDS)
  }

  function stop() {
    clearInterval(isRunning.value)
    isRunning.value = false
  }

  function reset() {
    stop()
    seconds.value = 0
  }

  return {
    start,
    stop,
    reset,
    isRunning,
    seconds,
  }
}
