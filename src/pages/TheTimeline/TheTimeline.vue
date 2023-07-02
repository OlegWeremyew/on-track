<script setup>
import TimelineItem from '@/components/TimelineItem/TimelineItem.vue'
import {
  isActivityValid, isPageValid,
  isTimelineItemValid,
  validateActivities,
  validateSelectOptions,
  validateTimelineItems,
} from '@/validators'
import { nextTick, ref, watchPostEffect } from 'vue'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants'

const props = defineProps({
  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems,
  },
  activities: {
    required: true,
    type: Array,
    validator: validateActivities,
  },
  activitySelectOptions: {
    required: true,
    type: Array,
    validator: validateSelectOptions,
  },
  currentPage: {
    required: true,
    type: String,
    validator: isPageValid,
  },
})

const emit = defineEmits({
  setTimelineItemActivity(timelineItem, activity) {
    return [isTimelineItemValid(timelineItem), isActivityValid(activity)].every(Boolean)
  },
})

const timelineItemRefs = ref([])

function scrollToHour(hour) {
  if (hour === MIDNIGHT_HOUR) {
    document.body.scrollIntoView()
  } else {
    timelineItemRefs.value[hour - 1].$el.scrollIntoView()
  }
}

watchPostEffect(async () => {
  if (props.currentPage === PAGE_TIMELINE) {
    await nextTick()

    const currentHour = new Date().getHours()
    scrollToHour(currentHour)
  }
})

</script>

<template>
  <div class='mt-7'>
    <ul>
      <TimelineItem
        v-for='timelineItem in timelineItems'
        :key='timelineItem.hour'
        ref='timelineItemRefs'
        :timeline-item='timelineItem'
        :activities='activities'
        :activity-select-options='activitySelectOptions'
        @select-activity="emit('setTimelineItemActivity', timelineItem, $event)"
        @scroll-to-hour="scrollToHour"
      />
    </ul>
  </div>
</template>
