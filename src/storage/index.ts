import { LOCAL_STORAGE_KEY } from "@/constants"
import { endOfHour, isToday, today, toSeconds } from "@/time"
import {
  activeTimelineItem,
  activities,
  timelineItems,
  startTimelineItemTimer,
  stopTimelineItemTimer,
  resetTimelineItems,
  initializeActivities,
} from "@/app-activities"

export function saveState() {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({
      timelineItems: timelineItems.value,
      activities: activities.value,
      lastActiveAt: today(),
    }),
  )
}

export function loadState() {
  const state = loadFromLocalStorage()

  initializeActivities(state)

  const lastActiveAt = new Date(state.lastActiveAt)

  timelineItems.value = state.timelineItems ?? timelineItems.value

  if (activeTimelineItem.value && isToday(lastActiveAt)) {
    timelineItems.value = syncIdleSeconds(state.timelineItems, lastActiveAt)
  } else if (state.timelineItems && !isToday(lastActiveAt)) {
    timelineItems.value = resetTimelineItems(state.timelineItems)
  }
}

function syncIdleSeconds(timelineItems: any, lastActiveAt: Date) {
  const activeTimelineItem = timelineItems.find(({ isActive }: {isActive: boolean}): boolean => isActive)

  if (activeTimelineItem) {
    activeTimelineItem.activitySeconds += calculateIdleSeconds(lastActiveAt)
  }

  return timelineItems
}

function calculateIdleSeconds(lastActiveAt: Date): number {
  return lastActiveAt.getHours() === today().getHours()
    ? toSeconds(+today() - +lastActiveAt)
    : toSeconds(+endOfHour(lastActiveAt) - +lastActiveAt)
}

export function syncState(shouldLoad: boolean) {
  shouldLoad ? loadState() : saveState()

  if (activeTimelineItem.value) {
    shouldLoad
      ? startTimelineItemTimer(activeTimelineItem.value)
      : stopTimelineItemTimer(activeTimelineItem.value)
  }
}

function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}")
}
