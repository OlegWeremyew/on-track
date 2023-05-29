<script setup>
import BaseSelect from '@/components/common/BaseSelect/BaseSelect.vue'
import { isActivityValid, isTimelineItemValid, validateActivities, validateSelectOptions } from '@/validators'
import TimelineHour from '@/components/TimelineItem/TimelineHour/TimelineHour.vue'

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
})

const selectActivity = (id) => {
  emit('selectActivity', props.activities.find((activity) => activity.id === id))
}

</script>

<template>
  <li class='relative flex flex-col border-t border-gray-200 py-10 px-4'>
    <TimelineHour :hour='timelineItem.hour' />
    <BaseSelect
      placeholder='Rest'
      :options='activitySelectOptions'
      :selected='timelineItem.activityId'
      @select='selectActivity'
    />
  </li>
</template>
