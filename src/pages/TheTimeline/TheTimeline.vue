<script setup>
import TimelineItem from '@/components/TimelineItem/TimelineItem.vue'
import { onActivated } from 'vue'
import { scrollToCurrentHour, timelineItemRefs, timelineItems } from '@/activities'
import TheTimelineIndicator from '@/components/TheTimelineIndicator/TheTimelineIndicator.vue'

onActivated(scrollToCurrentHour)
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
