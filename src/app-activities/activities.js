import { computed, ref } from 'vue'
import { generateId } from '@/utils'
import { HUNDRED_PERCENT } from '@/constants'

export const activities = ref(generateActivities())

export const activitySelectOptions = computed(() => generateActivitiesSelectOptions(activities.value))

export const deleteActivity = (activity) => {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

export function createActivity(activity) {
  activities.value.push(activity)
}

export function updateActivity(activity, fields) {
  return Object.assign(activity, fields)
}

export const trackedActivities = computed(() =>
  activities.value.filter(({ secondsToComplete }) => secondsToComplete),
)

export function calculateActivityCompletionPercentage({ secondsToComplete }, trackedSeconds) {
  return Math.floor(
    (trackedSeconds * HUNDRED_PERCENT) / secondsToComplete,
  )
}

export function calculateCompletionPercentage(totalTrackedSeconds) {
  return Math.floor((totalTrackedSeconds * HUNDRED_PERCENT) / totalActivitySecondsToComplete.value)
}

const totalActivitySecondsToComplete = computed(() => {
  return trackedActivities.value
    .map(({ secondsToComplete }) => secondsToComplete)
    .reduce((total, seconds) => total + seconds, 0)
})

function generateActivities() {
  return ['Coding', 'Reading', 'Training',]
    .map((name, hours) => ({
        id: generateId(),
        name,
        // secondsToComplete: hours * SECONDS_IN_HOUR,
        secondsToComplete: 15 * 60,
      }),
    )
}

const generateActivitiesSelectOptions = (activities) => {
  return activities.map((activity) => ({
    label: activity.name,
    value: activity.id,
  }))
}