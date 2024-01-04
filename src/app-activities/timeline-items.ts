import { computed, ref } from 'vue'
import type { ComputedRef } from 'vue'
import { HOURS_IN_DAY, MIDNIGHT_HOUR } from "@/constants"
import { currentTime } from "@/time"
import type { TimelineItemType, Undetectable } from '@/types'

export const timelineItems = ref(generateTimelineItems())
export const timelineItemRefs = ref<any[]>([])

export const activeTimelineItem: ComputedRef<Undetectable<TimelineItemType>> = computed(() =>
  timelineItems.value.find(({ isActive }) => isActive),
)

export function updateTimelineItem(timelineItem: TimelineItemType, fields: object) {
  return Object.assign(timelineItem, fields)
}

export const resetTimelineItemsActivities = (timelineItems: TimelineItemType[], activity: any) => {
  return filterTimelineItemsByActivity(timelineItems, activity).forEach((timelineItem: TimelineItemType) =>
    updateTimelineItem(timelineItem, {
      activityId: null,
      activitySeconds:
        timelineItem.hour === currentTime.value.getHours() ? timelineItem.activitySeconds : 0,
    }),
  )
}

export const calculateTrackedActivitySeconds = (timelineItems: TimelineItemType[], activity: any) => {
  return filterTimelineItemsByActivity(timelineItems, activity)
    .map(({ activitySeconds }) => activitySeconds)
    .reduce((total, seconds) => Math.round(total + seconds), 0)
}

function filterTimelineItemsByActivity(timelineItems: TimelineItemType[], activity: any) {
  return timelineItems.filter((timelineItem: TimelineItemType) => timelineItem.activityId === activity.id)
}

export const scrollToCurrentHour = (isSmooth: boolean = false): void => {
  scrollToHour(currentTime.value.getHours(), isSmooth)
}

export function scrollToHour(hour: number, isSmooth: boolean = true): void {
  const scrollElement =
    hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el

  scrollElement.scrollIntoView({
    behavior: isSmooth ? "smooth" : "instant",
  })
}

function generateTimelineItems(): TimelineItemType[] {
  return [...Array(HOURS_IN_DAY).keys()].map((hour: number) => ({
    hour,
    activityId: null,
    activitySeconds: 0,
    isActive: false,
  }))
}
