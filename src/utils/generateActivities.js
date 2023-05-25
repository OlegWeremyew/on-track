import { SECONDS_IN_HOUR } from '@/constans'
import { generateId } from '@/utils/generateId'

export const generateActivities = () => {
  return [
    {
      id: generateId(),
      name: 'Coding',
      secondsToComplete: 0 * SECONDS_IN_HOUR,
    },
    {
      id: generateId(),
      name: 'Training',
      secondsToComplete: 1 * SECONDS_IN_HOUR,
    },
    {
      id: generateId(),
      name: 'Reading',
      secondsToComplete: 2 * SECONDS_IN_HOUR,
    },
  ]
}
