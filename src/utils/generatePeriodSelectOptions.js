import { PERIOD_IN_MINUTES, SECONDS_IN_MINUTE } from '@/constants'
import { generatePeriodSelectOptionsLabel } from '@/utils/generatePeriodSelectOptionsLabel'

export const generatePeriodSelectOptions = () => {
  return PERIOD_IN_MINUTES.map((periodInMinutes) => ({
    value: periodInMinutes * SECONDS_IN_MINUTE,
    label: generatePeriodSelectOptionsLabel(periodInMinutes),
  }))
}
