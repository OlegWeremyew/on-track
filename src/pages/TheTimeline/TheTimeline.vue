<script setup>
import TimelineItem from '@/components/TimelineItem/TimelineItem.vue'
import {
  isActivityValid,
  isTimelineItemValid,
  validateActivities,
  validateSelectOptions,
  validateTimelineItems,
} from '@/validators'

defineProps({
  timelineItems: {
    type: Array,
    required: true,
    validator: validateTimelineItems,
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateSelectOptions,
  },
  activities: {
    type: Array,
    required: true,
    validator: validateActivities,
  },
})

const emit = defineEmits({
  setTimeLineItemActivity({ timelineItem, activity }) {
    return [
      isTimelineItemValid(timelineItem),
      isActivityValid(activity),
    ].every(Boolean)
  },
})
</script>

<template>
  <div class='mt-7'>
    <ul>
      <TimelineItem
        v-for='timelineItem in timelineItems'
        :key='timelineItem.hour'
        :timeline-item='timelineItem'
        :activities='activities'
        :activity-select-options='activitySelectOptions'
        @select-activity="emit('setTimeLineItemActivity', {timelineItem, activity: $event} )"
      />
    </ul>
  </div>
</template>
