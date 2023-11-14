import { computed, ref } from 'vue'
import { HUNDRED_PERCENT, MILLISECONDS_IN_SECONDS, SECONDS_IN_DAY, SECONDS_IN_MINUTE } from '@/constants'

export function today(){
  const date = new Date()
  date.setHours(0, 0)

  return date
}

export function tomorrow(){
  const tomorrow = today()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return tomorrow
}

export function isToday(data){
  return data.toDateString() === today().toDateString()
}

export const currentTime = ref(today())

const midnight = computed(() => new Date(currentTime.value).setHours(0, 0, 0, 0))

const secondsSinceMidnight = computed(() => {
  return (currentTime.value - midnight.value) / MILLISECONDS_IN_SECONDS
})

export const secondsSinceMidnightInPercentage = computed((() => {
  return (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
}))

let timer = null

export function startTimer() {
  currentTime.value = today()

  timer = setInterval(() => {
    currentTime.value = new Date(currentTime.value.getTime() + SECONDS_IN_MINUTE * MILLISECONDS_IN_SECONDS)
  }, MILLISECONDS_IN_SECONDS)
}

export function stopTimer() {
  clearInterval(timer)
}
