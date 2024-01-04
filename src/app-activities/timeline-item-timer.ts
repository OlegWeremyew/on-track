import { ref, watchEffect } from 'vue'
import { MILLISECONDS_IN_SECOND } from '@/constants'
import { activeTimelineItem, updateTimelineItem } from '@/app-activities/index'
import { currentTime } from '@/time'
import type { IntervalType, TimelineItemType } from '@/types'

export const timelineItemTimer = ref<IntervalType>(undefined)

export function startTimelineItemTimer(timelineItem: TimelineItemType): void {
  updateTimelineItem(timelineItem, { isActive: true })

  timelineItemTimer.value = setInterval(() => {
    updateTimelineItem(timelineItem, {
      activitySeconds: timelineItem.activitySeconds + 1,
    })
  }, MILLISECONDS_IN_SECOND)
}

export function stopTimelineItemTimer(timelineItem: TimelineItemType): void {
  updateTimelineItem(timelineItem, { isActive: false })

  clearInterval(timelineItemTimer.value)

  timelineItemTimer.value = undefined
}

export function resetTimelineItem(timelineItem: TimelineItemType): void {
  updateTimelineItem(timelineItem, { activitySeconds: 0 })
  stopTimelineItemTimer(timelineItem)
}

export function resetTimelineItems(timelineItems: TimelineItemType[]): TimelineItemType[] {
  return timelineItems.map((timelineItem: TimelineItemType) => ({
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
