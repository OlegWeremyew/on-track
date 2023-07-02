<script setup>
import BaseSelect from '@/components/common/BaseSelect/BaseSelect.vue'
import {
  isActivityValid,
  isHourValid,
  isTimelineItemValid,
  validateActivities,
  validateSelectOptions,
} from '@/validators'
import TimelineHour from '@/components/TimelineItem/TimelineHour/TimelineHour.vue'
import { NULLABLE_ACTIVITY } from '@/constants'
import TimelineStopwatch from '@/components/TimelineStopwatch/TimelineStopwatch.vue'

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
  activities: {
    type: Array,
    required: true,
    validator: validateActivities,
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateSelectOptions,
  },
})

const emit = defineEmits({
  selectActivity: isActivityValid,
  scrollToHour: isHourValid,
})

const findActivityById = (id) => {
  return props.activities.find((activity) => activity.id === id) || NULLABLE_ACTIVITY
}

const selectActivity = (id) => {
  emit(
    'selectActivity',
    findActivityById(id),
  )
}
</script>

<template>
  <li class='relative flex flex-col border-t border-gray-200 py-10 px-4'>
    <TimelineHour
      :hour='timelineItem.hour'
      @click.prevent="emit('scrollToHour', timelineItem.hour)"
    />
    <BaseSelect
      placeholder='Rest'
      :options='activitySelectOptions'
      :selected='timelineItem.activityId'
      @select='selectActivity'
    />
    <TimelineStopwatch
      :seconds='timelineItem.activitySeconds'
      :hour='timelineItem.hour'
    />
  </li>
</template>
