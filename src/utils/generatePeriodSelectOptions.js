import { SECONDS_IN_MINUTE } from '@/constants'
import { generatePeriodSelectOptionsLabel } from '@/utils/generatePeriodSelectOptionsLabel'

export const generatePeriodSelectOptions = () => {

  const PERIOD_IN_MINUTES = [
    15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480,
  ]

  return PERIOD_IN_MINUTES.map((periodInMinutes) => ({
    value: periodInMinutes * SECONDS_IN_MINUTE,
    label: generatePeriodSelectOptionsLabel(periodInMinutes),
  }))
}
