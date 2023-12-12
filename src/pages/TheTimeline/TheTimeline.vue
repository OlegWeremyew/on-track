<script setup>
import { onActivated, onDeactivated } from 'vue'
import TimelineItem from '@/components/TimelineItem/TimelineItem.vue'
import { scrollToCurrentHour, stopTimelineItemTimer, timelineItemRefs, timelineItems } from '@/app-activities'
import TheTimelineIndicator from '@/components/TheTimelineIndicator/TheTimelineIndicator.vue'
import { startCurrentDateTimer, stopCurrentDateTimer } from '@/time'

//call once
stopTimelineItemTimer()

onActivated(() => {
  scrollToCurrentHour()
  startCurrentDateTimer()
})

onDeactivated(stopCurrentDateTimer)
</script>

<template>
  <div class='relative mt-7'>
    <TheTimelineIndicator />
    <ul>
      <TimelineItem
        v-for='timelineItem in timelineItems'
        :key='timelineItem.hour'
        ref='timelineItemRefs'
        :timeline-item='timelineItem'
      />
    </ul>
  </div>
</template>
