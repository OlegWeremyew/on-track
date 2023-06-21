import { SECONDS_IN_HOUR } from '@/constants'
import { generateId } from '@/utils/generateId'

export const generateActivities = () => {
  return ['Coding', 'Training', 'Reading']
    .map((name, hours) => ({
        id: generateId(),
        name,
        secondsToComplete: hours * SECONDS_IN_HOUR,
      }),
    )
}
