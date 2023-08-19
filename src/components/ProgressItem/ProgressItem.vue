<script setup>
import { computed } from 'vue'
import { calculateActivityCompletionPercentage, calculateTrackedActivitySeconds, timelineItems } from '@/activities'
import { formatSeconds, getProgressColorClass } from '@/utils'
import { isActivityValid } from '@/validators'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
})

const trackedActivitySeconds = computed(() => {
  return calculateTrackedActivitySeconds(timelineItems.value, props.activity)
})

const percentage = computed(() => calculateActivityCompletionPercentage(
  props.activity,
  trackedActivitySeconds.value
))
</script>

<template>
  <li class='flex flex-col gap-1 p-4'>
    <div class='truncate text-xl'>{{ activity.name }}</div>
    <div class='flex h-5 overflow-hidden rounded bg-neutral-200'>
      <div :class='getProgressColorClass(percentage)' :style='`width: ${percentage}%`' />
    </div>
    <div class='flex justify-between font-mono text-sm'>
      <span>{{ percentage }}%</span>
      <span>
        {{
          formatSeconds(trackedActivitySeconds)
        }} / {{
          formatSeconds(activity.secondsToComplete)
        }}
      </span>
    </div>
  </li>
</template>
