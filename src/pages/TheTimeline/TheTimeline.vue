<script setup>
import TimelineItem from '@/components/TimelineItem/TimelineItem.vue'
import { onActivated } from 'vue'
import { scrollToCurrentHour, scrollToHour, timelineItemRefs, timelineItems } from '@/activities'

onActivated(scrollToCurrentHour)
</script>

<template>
  <div class='mt-7'>
    <ul>
      <TimelineItem
        v-for='timelineItem in timelineItems'
        :key='timelineItem.hour'
        ref='timelineItemRefs'
        :timeline-item='timelineItem'
        @scroll-to-hour='scrollToHour(timelineItem.hour)'
      />
    </ul>
  </div>
</template>
