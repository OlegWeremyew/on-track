import { computed } from 'vue'
import { calculateActivityCompletionPercentage, calculateTrackedActivitySeconds, timelineItems } from '@/activities'
import { getProgressColorClass } from '@/utils'

export function useProgress(activity){

  const trackedSeconds = computed(() => {
    return calculateTrackedActivitySeconds(timelineItems.value, activity)
  })

  const percentage = computed(() =>
    calculateActivityCompletionPercentage(
      activity,
      trackedSeconds.value,
    ),
  )

  const colorClass = computed(()=>getProgressColorClass(percentage.value))

  return {
    percentage,
    trackedSeconds,
    colorClass,
  }
}
