import { computed } from "vue"
import {
  calculateActivityCompletionPercentage,
  calculateTrackedActivitySeconds,
  timelineItems,
} from "@/app-activities"
import { getProgressColorClass } from "@/utils"

export function useProgress(activity) {
  const trackedActivitySeconds = computed(() => {
    return calculateTrackedActivitySeconds(timelineItems.value, activity)
  })

  const percentage = computed(() =>
    calculateActivityCompletionPercentage(activity, trackedActivitySeconds.value),
  )

  const colorClass = computed(() => getProgressColorClass(percentage.value))

  return {
    percentage,
    trackedActivitySeconds,
    colorClass,
  }
}
