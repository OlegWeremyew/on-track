import { computed, ref } from 'vue'
import { generateId } from '@/utils'
import { SECONDS_IN_HOUR } from '@/constants'

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
        secondsToComplete: hours * SECONDS_IN_HOUR,
      }),
    )
}

const generateActivitiesSelectOptions = (activities) => {
  return activities.map((activity) => ({
    label: activity.name,
    value: activity.id,
  }))
}
