import { HOURS_IN_DAY, MINUTES_IN_HOUR, SECONDS_IN_HOUR } from '@/constants'

export const generateTimelineItems = (activities) => {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: [0, 1, 2, 3, 4, 5].includes(hour) ? activities[hour % 3]?.id : null,
    activitySeconds: [0, 1, 2, 3, 4, 5].includes(hour) ? hour * 600 : 0,

    // activityId: hour % 4 === 0 ? null : activities[hour % 2]?.id,
    // activitySeconds: hour % 4 === 0 ? 0 : (15 * hour * MINUTES_IN_HOUR) % SECONDS_IN_HOUR,
  }))
}
