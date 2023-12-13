import { computed, ref } from "vue"
import {
  HUNDRED_PERCENT,
  MILLISECONDS_IN_SECOND,
  SECONDS_IN_DAY,
  SECONDS_IN_HOUR,
  SECONDS_IN_MINUTE,
} from "@/constants"

let currentDateTimer = null

export function today() {
  const date = new Date()
  date.setHours(0, 0)

  return date
}

export function tomorrow() {
  const tomorrow = today()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return tomorrow
}

export function isToday(data) {
  return data.toDateString() === today().toDateString()
}

export const currentTime = ref(today())

const midnight = computed(() => new Date(currentTime.value).setHours(0, 0, 0, 0))

const secondsSinceMidnight = computed(() => {
  return (currentTime.value - midnight.value) / MILLISECONDS_IN_SECOND
})

export const secondsSinceMidnightInPercentage = computed(() => {
  return (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
})

export function startCurrentDateTimer() {
  currentTime.value = today()

  currentDateTimer = setInterval(() => {
    currentTime.value = new Date(
      currentTime.value.getTime() + SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND,
    )
  }, MILLISECONDS_IN_SECOND)
}

export function stopCurrentDateTimer() {
  clearInterval(currentDateTimer)
}

export function endOfHour(data) {
  const endOfeHour = new Date(data)

  endOfeHour.setTime(endOfeHour.getTime() + SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND)

  endOfeHour.setMinutes(0, 0, 0)

  return endOfeHour
}

export function toSeconds(milliseconds) {
  return Math.round(milliseconds / MILLISECONDS_IN_SECOND)
}
