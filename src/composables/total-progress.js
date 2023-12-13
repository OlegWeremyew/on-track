import { computed } from "vue"
import {
  calculateCompletionPercentage,
  calculateTrackedActivitySeconds,
  timelineItems,
  trackedActivities,
} from "@/app-activities"
import { getProgressColorClass } from "@/utils"

export function useTotalProgress() {
  const percentage = computed(() => calculateCompletionPercentage(totalTrackedSeconds.value))

  const totalTrackedSeconds = computed(() => {
    return trackedActivities.value
      .map((activity) =>
        Math.min(
          calculateTrackedActivitySeconds(timelineItems.value, activity),
          activity.secondsToComplete,
        ),
      )
      .reduce((total, seconds) => total + seconds, 0)
  })

  const colorClass = computed(() => getProgressColorClass(percentage.value))

  return {
    percentage,
    colorClass,
  }
}
