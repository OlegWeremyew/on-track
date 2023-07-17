<script setup>
import TimelineItem from '@/components/TimelineItem/TimelineItem.vue'
import { validateTimelineItems } from '@/validators'
import { nextTick, ref, watchPostEffect } from 'vue'
import { MIDNIGHT_HOUR, PAGE_TIMELINE } from '@/constants'
import { currentPage } from '@/router'

defineProps({
  timelineItems: {
    required: true,
    type: Array,
    validator: validateTimelineItems,
  },
})

defineExpose({
  scrollToHour,
})

const timelineItemRefs = ref([])

function scrollToHour(hour = null, isSmooth = true) {
  hour ??= new Date().getHours()

  const scrollElement = hour === MIDNIGHT_HOUR ? document.body : timelineItemRefs.value[hour - 1].$el

  scrollElement.scrollIntoView({
    behavior: isSmooth ? 'smooth' : 'instant',
  })
}

watchPostEffect(async () => {
  if (currentPage.value === PAGE_TIMELINE) {
    await nextTick()

    scrollToHour(null, false)
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
        @scroll-to-hour='scrollToHour'
      />
    </ul>
  </div>
</template>
