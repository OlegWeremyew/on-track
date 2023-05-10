<script setup>
import BaseSelect from '@/components/common/BaseSelect/BaseSelect.vue'
import { isTimelineItemValid, validateSelectOptions } from '@/validators'
import { ref } from 'vue'
import TimelineHour from '@/components/TimelineItem/TimelineHour/TimelineHour.vue'

const selectedActivityId = ref(0)

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
  activitySelectOptions: {
    type: Array,
    required: true,
    validator: validateSelectOptions,
  },
})

</script>

<template>
  <li class='relative flex flex-col border-t border-gray-200 py-10 px-4'>
    <TimelineHour :hour='timelineItem.hour' />
    <BaseSelect
      placeholder='Rest'
      :options='activitySelectOptions'
      :selected='selectedActivityId'
      @select='selectedActivityId = $event'
    />
  </li>
</template>
