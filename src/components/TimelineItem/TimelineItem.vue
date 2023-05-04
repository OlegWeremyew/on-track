<script setup>
import BaseSelect from '@/components/common/BaseSelect/BaseSelect.vue'
import { isTimelineItemValid } from '@/validators'
import { ref } from 'vue'
import TimelineHour from '@/components/TimelineItem/TimelineHour/TimelineHour.vue'

const OPTIONS = [
  { value: 1, label: 'Coding' },
  { value: 2, label: 'Reading' },
  { value: 3, label: 'Training' },
]

const selectedActivityId = ref(1)

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
      :options='OPTIONS'
      :selected='selectedActivityId'
      @select='selectedActivityId = $event'
    />
  </li>
</template>
