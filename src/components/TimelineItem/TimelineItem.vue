<script setup>
import BaseSelect from '@/components/common/BaseSelect/BaseSelect.vue'
import { isTimelineItemValid } from '@/validators'
import TimelineHour from '@/components/TimelineItem/TimelineHour/TimelineHour.vue'
import TimelineStopwatch from '@/components/TimelineStopwatch/TimelineStopwatch.vue'
import { activitySelectOptions, updateTimelineItem } from '@/activities'

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
})

</script>

<template>
  <li class='relative flex flex-col border-t border-gray-200 py-10 px-4'>
    <TimelineHour :hour='timelineItem.hour' />
    <BaseSelect
      placeholder='Rest'
      :options='activitySelectOptions'
      :selected='timelineItem.activityId'
      @select='updateTimelineItem(timelineItem,{activityId: $event})'
    />
    <TimelineStopwatch :timeline-item='timelineItem' />
  </li>
</template>
