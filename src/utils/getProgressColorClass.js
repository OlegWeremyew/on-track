import { HUNDRED_PERCENT, LOW_PERCENT, MEDIUM_PERCENT } from '@/constants'

export function getProgressColorClass(percentage) {
  if (percentage < LOW_PERCENT) return 'bg-red-500'
  if (percentage < MEDIUM_PERCENT) return 'bg-orange-400'
  if (percentage < HUNDRED_PERCENT) return 'bg-yellow-500'

  return 'bg-green-500'
}
