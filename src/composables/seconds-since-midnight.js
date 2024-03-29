import { computed, onActivated, onDeactivated, ref, watchEffect } from "vue"
import {
  HUNDRED_PERCENT,
  MILLISECONDS_IN_SECOND,
  MINUTES_IN_HOUR,
  SECONDS_IN_DAY,
  SECONDS_IN_MINUTE,
} from "@/constants"

function calculateSecondsSinceMidnight() {
  const now = new Date()

  return (
    SECONDS_IN_MINUTE * MINUTES_IN_HOUR * now.getHours() +
    SECONDS_IN_MINUTE * now.getMinutes() +
    now.getSeconds()
  )
}

export const useSecondsSinceMidnight = () => {
  const secondsSinceMidnight = ref(calculateSecondsSinceMidnight())

  const secondsSinceMidnightInPercentage = computed(() => {
    return (HUNDRED_PERCENT * secondsSinceMidnight.value) / SECONDS_IN_DAY
  })

  watchEffect(() => {
    if (secondsSinceMidnight.value > SECONDS_IN_DAY) {
      secondsSinceMidnight.value = 0
    }
  })

  let timer = null

  // page is active
  onActivated(() => {
    timer = setInterval(() => (secondsSinceMidnight.value += 5 * 60), MILLISECONDS_IN_SECOND)

    secondsSinceMidnight.value = calculateSecondsSinceMidnight()
  })

  // page is inactive
  onDeactivated(() => clearInterval(timer))

  return {
    secondsSinceMidnightInPercentage,
  }
}
