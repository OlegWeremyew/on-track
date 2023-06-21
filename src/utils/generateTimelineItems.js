import { HOURS_IN_DAY, MINUTES_IN_HOUR, SECONDS_IN_HOUR } from '@/constants'

export const generateTimelineItems = (activities) => {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: hour % 4 === 0 ? null : activities[hour % 2]?.id,
    activitySeconds: hour % 4 === 0 ? 0 : (15 * hour * MINUTES_IN_HOUR) % SECONDS_IN_HOUR,
  }))
}
