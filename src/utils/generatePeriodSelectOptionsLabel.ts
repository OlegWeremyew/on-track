import { MINUTES_IN_HOUR } from "@/constants"

export const generatePeriodSelectOptionsLabel = (periodInMinutes: number): string => {
  const hours = Math.floor(periodInMinutes / MINUTES_IN_HOUR)
    .toString()
    .padStart(2, '0')
  const minutes = (periodInMinutes % MINUTES_IN_HOUR).toString().padStart(2, '0')

  return `${hours}:${minutes}`
}
