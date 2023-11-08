import { ref } from 'vue'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from '@/constants'
import { currentTime } from '@/time'

export const timelineItems = ref(generateTimelineItems())
export const timelineItemRefs = ref([])

export function updateTimelineItem(timelineItem, fields) {
  return Object.assign(timelineItem, fields)
}

export const resetTimelineItemsActivities = (timelineItems, activity) => {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .forEach((timelineItem) => updateTimelineItem(timelineItem, {
      activityId: null,
      activitySeconds: timelineItems.hour === currentTime.value.getHours() ? timelineItems.activitySeconds : 0,
    }))
}

export const calculateTrackedActivitySeconds = (timelineItems, activity) => {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0)
}

function filterTimelineItemsByActivity(timelineItems, activity) {
  return timelineItems.filter((timelineItem) => timelineItem.activityId === activity.id)
}

export const scrollToCurrentHour = (isSmooth = false) => {
  scrollToHour(currentTime.value.getHours(), isSmooth)
}

export function scrollToHour(hour, isSmooth = true) {
  const scrollElement = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el

  scrollElement.scrollIntoView({
    behavior: isSmooth ? 'smooth' : 'instant',
  })
}

function generateTimelineItems() {
  return [...Array(HOURS_IN_DAY).keys()].map((hour) => ({
    hour,
    activityId: null, //  [0, 1, 2, 3, 4].includes(hour) ? activities.value[hour % 3].id : null,
    activitySeconds: 0, //  [0, 1, 2, 3, 4].includes(hour) ? hour * 600 : 0

    // activityId: hour % 4 === 0 ? null : activities[hour % 2].id,
    // activitySeconds: hour % 4 === 0 ? 0 : (15 * SECONDS_IN_MINUTE * hour) % SECONDS_IN_HOUR
  }))
}
