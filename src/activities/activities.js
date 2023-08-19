import { computed, ref } from 'vue'
import { generateId } from '@/utils'
import { HUNDRED_PERCENT, SECONDS_IN_HOUR } from '@/constants'

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

function generateActivities() {
  return ['Coding', 'Training', 'Reading']
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

export const trackedActivities = computed(() =>
  activities.value.filter(({ secondsToComplete }) => secondsToComplete),
)

export function calculateActivityCompletionPercentage({ secondsToComplete }, trackedSeconds) {
  return Math.floor(
    (trackedSeconds * HUNDRED_PERCENT) / secondsToComplete,
  )
}
