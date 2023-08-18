import { ref } from 'vue'
import { activities } from '@/activities/activities'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants'
import { getCurrentHour } from '@/utils'

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
export const timelineItemRefs = ref([])

export function updateTimelineItem(timelineItem, fields) {
  return Object.assign(timelineItem, fields)
}

export const resetTimelineItemsActivities = (activity) => {
  return timelineItems.value
    .filter((timelineItem) => hasActivity(timelineItem, activity))
    .forEach((timelineItem) => updateTimelineItem(timelineItem, {
      activityId: null,
      activitySeconds: 0,
    }))
}

export const getTotalActivitySeconds = (activity) => {
  return timelineItems.value
    .filter((timelineItem) => hasActivity(timelineItem, activity))
    .reduce((totalSeconds, timelineItem) => Math.round(timelineItem.activitySeconds + totalSeconds), 0)
}


function hasActivity(timelineItem, activity) {
  return timelineItem.activityId === activity.id
}

export const scrollToCurrentHour = (isSmooth = false) => {
  scrollToHour(getCurrentHour(), isSmooth)
}

export function scrollToHour(hour , isSmooth = true) {

  const scrollElement = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el

  scrollElement.scrollIntoView({
    behavior: isSmooth ? 'smooth' : 'instant',
  })
}
