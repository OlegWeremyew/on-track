import { ref } from 'vue'
import { activities } from '@/activities/activities'
import { HOURS_IN_DAY } from '@/constants'

const generateTimelineItems = (activities) => {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: [0, 1, 2, 3, 4, 5].includes(hour) ? activities.value[hour % 3]?.id : null,
    activitySeconds: [0, 1, 2, 3, 4, 5].includes(hour) ? hour * 600 : 0,

    // activityId: hour % 4 === 0 ? null : activities[hour % 2]?.id,
    // activitySeconds: hour % 4 === 0 ? 0 : (15 * hour * MINUTES_IN_HOUR) % SECONDS_IN_HOUR,
  }))
}

export const timelineItems = ref(generateTimelineItems(activities))

export function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = activityId
}

export function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}

export const resetTimelineItemsActivities = (activity) => {
  return timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null
      timelineItem.activitySeconds = 0
    }
  })
}
