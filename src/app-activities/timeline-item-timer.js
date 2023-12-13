import { ref, watchEffect } from "vue"
import { MILLISECONDS_IN_SECOND } from "@/constants"
import { activeTimelineItem, updateTimelineItem } from "@/app-activities"
import { currentTime } from "@/time"

export const timelineItemTimer = ref(null)

export function startTimelineItemTimer(timelineItem) {
  updateTimelineItem(timelineItem, { isActive: true })

  timelineItemTimer.value = setInterval(() => {
    updateTimelineItem(timelineItem, {
      activitySeconds: timelineItem.activitySeconds + 1,
    })
  }, MILLISECONDS_IN_SECOND)
}

export function stopTimelineItemTimer(timelineItem) {
  updateTimelineItem(timelineItem, { isActive: false })

  clearInterval(timelineItemTimer.value)

  timelineItemTimer.value = null
}

export function resetTimelineItem(timelineItem) {
  updateTimelineItem(timelineItem, { activitySeconds: 0 })
  stopTimelineItemTimer(timelineItem)
}

export function resetTimelineItems(timelineItems) {
  return timelineItems.map((timelineItem) => ({
    ...timelineItem,
    activitySeconds: 0,
    isActive: false,
  }))
}

watchEffect(() => {
  if (activeTimelineItem.value && activeTimelineItem.value.hour !== currentTime.value.getHours()) {
    stopTimelineItemTimer(activeTimelineItem.value)
  }
})
