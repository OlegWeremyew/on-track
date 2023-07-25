<script setup>
import BaseSelect from '@/components/common/BaseSelect/BaseSelect.vue'
import { isTimelineItemValid, isUndefined, } from '@/validators'
import TimelineHour from '@/components/TimelineItem/TimelineHour/TimelineHour.vue'
import TimelineStopwatch from '@/components/TimelineStopwatch/TimelineStopwatch.vue'
import { inject } from 'vue'
import { activitySelectOptionsKey, setTimelineItemActivityKey } from '@/constants/keys'

const activitySelectOptions = inject(activitySelectOptionsKey)
const setTimelineItemActivity = inject(setTimelineItemActivityKey)

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
})

const emit = defineEmits({
  scrollToHour: isUndefined,
})

</script>

<template>
  <li class='relative flex flex-col border-t border-gray-200 py-10 px-4'>
    <TimelineHour
      :hour='timelineItem.hour'
      @click.prevent="emit('scrollToHour')"
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
