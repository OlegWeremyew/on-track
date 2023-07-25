<script setup>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import TheNav from '@/components/TheNav/TheNav.vue'
import TheTimeline from '@/pages/TheTimeline/TheTimeline.vue'
import TheActivities from '@/pages/TheActivities/TheActivities.vue'
import TheProgress from '@/pages/TheProgress/TheProgress.vue'
import { provide, readonly } from 'vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'
import { generatePeriodSelectOptions } from '@/utils'
import { currentPage, timelineRef } from './router'
import * as keys from '@/constants/keys'
import {
  activities,
  activitySelectOptions,
  createActivity,
  deleteActivity,
  resetTimelineItemsActivities,
  setActivitySecondsToComplete,
  setTimelineItemActivity,
  timelineItems,
  updateTimelineItemActivitySeconds,
} from '@/activities'

//functions
provide(keys.updateTimelineItemActivitySecondsKey, updateTimelineItemActivitySeconds)
provide(keys.setTimelineItemActivityKey, setTimelineItemActivity)
provide(keys.setActivitySecondsToCompleteKey, setActivitySecondsToComplete)
provide(keys.createActivityKey, createActivity)
provide(keys.deleteActivityKey, (activity) => {
  resetTimelineItemsActivities(activity)
  deleteActivity(activity)
})
//variables
provide(keys.timelineItemsKey, readonly(timelineItems))
provide(keys.activitySelectOptionsKey, readonly(activitySelectOptions))
provide(keys.periodSelectOptionsKey, readonly(generatePeriodSelectOptions()))
</script>

<template>
  <TheHeader />

  <main class='flex flex-grow flex-col'>
    <TheTimeline
      v-show='currentPage === PAGE_TIMELINE'
      ref='timelineRef'
      :timeline-items='timelineItems'
    />
    <TheActivities
      v-show='currentPage === PAGE_ACTIVITIES'
      :activities='activities'
      @set-activity-seconds-to-complete='setActivitySecondsToComplete'
    />
    <TheProgress v-show='currentPage === PAGE_PROGRESS' />
  </main>

  <TheNav />
</template>
