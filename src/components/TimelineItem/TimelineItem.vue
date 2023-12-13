<script setup>
import { BaseSelect } from "@/components/common"
import { isTimelineItemValid } from "@/validators"
import { TimelineHour } from "@/components/TimelineItem/TimelineHour"
import { TimelineStopwatch } from "@/components/TimelineItem/TimelineStopwatch"
import { activitySelectOptions, updateTimelineItem } from "@/app-activities"

defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator: isTimelineItemValid,
  },
})
</script>

<template>
  <li class="relative flex flex-col border-t border-gray-200 px-4 py-10">
    <TimelineHour :hour="timelineItem.hour" />
    <BaseSelect
      placeholder="Rest"
      :options="activitySelectOptions"
      :selected="timelineItem.activityId"
      @select="updateTimelineItem(timelineItem, { activityId: $event })"
    />
    <TimelineStopwatch :timeline-item="timelineItem" />
  </li>
</template>
