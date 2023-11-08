import { computed, ref } from 'vue'
import { HUNDRED_PERCENT, MILLISECONDS_IN_SECONDS, SECONDS_IN_DAY } from '@/constants'

export const currentTime = ref(new Date())

const midnight = computed(() => new Date(currentTime.value).setHours(0, 0, 0, 0))

const secondsSinceMidnight = computed(() => {
  return (currentTime.value - midnight.value) / MILLISECONDS_IN_SECONDS
})

export const secondsSinceMidnightInPercentage = computed((() => {
  return (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
}))

let timer = null

export function startTimer() {
  currentTime.value = new Date()

  timer = setInterval(() => {
    currentTime.value = new Date(currentTime.value.getTime() + 5 * 60 * 1000)
    secondsSinceMidnight.value += 5 * 60
  }, MILLISECONDS_IN_SECONDS)
}

export function stopTimer() {
  clearInterval(timer)
}
