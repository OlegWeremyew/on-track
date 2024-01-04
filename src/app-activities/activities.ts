import { computed, ref } from 'vue'
import { HUNDRED_PERCENT } from '@/constants'

export const activities = ref<any[]>([])

export const activitySelectOptions = computed(() =>
  generateActivitiesSelectOptions(activities.value),
)

export function initializeActivities(state: any): void {
  activities.value = state.activities ?? []
}

export const deleteActivity = (activity: never): void => {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function createActivity(activity: never): void {
  activities.value.push(activity)
}

export function updateActivity(activity: never, fields: object): object {
  return Object.assign(activity, fields)
}

export const trackedActivities = computed(() =>
  activities.value.filter(({ secondsToComplete }) => secondsToComplete),
)

export function calculateActivityCompletionPercentage({ secondsToComplete }: any, trackedSeconds: number) {
  return Math.floor((trackedSeconds * HUNDRED_PERCENT) / secondsToComplete)
}

export function calculateCompletionPercentage(totalTrackedSeconds: number): number {
  return Math.floor((totalTrackedSeconds * HUNDRED_PERCENT) / totalActivitySecondsToComplete.value)
}

const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.value
    .map(({ secondsToComplete }) => secondsToComplete)
    .reduce((total, seconds) => total + seconds, 0)
})

const generateActivitiesSelectOptions = (activities: any[]) => {
  return activities.map((activity: any) => ({
    label: activity.name,
    value: activity.id,
  }))
}
