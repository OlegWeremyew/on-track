<script setup>
import { onActivated, onDeactivated } from "vue"
import { TimelineItem, TheTimelineIndicator } from "@/components"
import { scrollToCurrentHour, timelineItemRefs, timelineItems } from "@/app-activities"
import { startCurrentDateTimer, stopCurrentDateTimer } from "@/time"

onActivated(() => {
  scrollToCurrentHour()
  startCurrentDateTimer()
})

onDeactivated(stopCurrentDateTimer)
</script>

<template>
  <div class="relative mt-7">
    <TheTimelineIndicator />
    <ul>
      <TimelineItem
        v-for="timelineItem in timelineItems"
        :key="timelineItem.hour"
        ref="timelineItemRefs"
        :timeline-item="timelineItem"
      />
    </ul>
  </div>
</template>
