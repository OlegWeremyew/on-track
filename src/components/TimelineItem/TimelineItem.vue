<script setup>
import BaseSelect from '@/components/common/BaseSelect/BaseSelect.vue'
import {
  isHourValid,
  isTimelineItemValid,
} from '@/validators'
import TimelineHour from '@/components/TimelineItem/TimelineHour/TimelineHour.vue'
import TimelineStopwatch from '@/components/TimelineStopwatch/TimelineStopwatch.vue'
import { inject } from 'vue'

const activitySelectOptions = inject('activitySelectOptions')
const setTimelineItemActivity = inject('setTimelineItemActivity')

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
})

const emit = defineEmits({
  scrollToHour: isHourValid,
})

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
      @select='setTimelineItemActivity(timelineItem, $event)'
    />
    <TimelineStopwatch
      :timeline-item='timelineItem'
    />
  </li>
</template>
