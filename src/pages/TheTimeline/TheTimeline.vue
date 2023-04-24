<script setup>
import {generateTimelineItems} from "@/utils/generateTimelineItems";
import TimelineItem from "@/components/TimelineItem/TimelineItem.vue";

const timelineItems = generateTimelineItems()
</script>

<template>
  <div class="mt-7">
    <ul>
      <TimelineItem
          v-for="timelineItem in timelineItems"
          :key="timelineItem.hour"
          :timeline-item="timelineItem"
      />
    </ul>
  </div>
</template>
