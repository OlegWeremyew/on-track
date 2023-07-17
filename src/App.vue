<script setup>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import TheNav from '@/components/TheNav/TheNav.vue'
import TheTimeline from '@/pages/TheTimeline/TheTimeline.vue'
import TheActivities from '@/pages/TheActivities/TheActivities.vue'
import TheProgress from '@/pages/TheProgress/TheProgress.vue'
import { computed, provide, ref } from 'vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'
import { generateTimelineItems } from '@/utils/generateTimelineItems'
import { generateActivitiesSelectOptions } from '@/utils/generateActivitiesSelectOptions'
import { generateActivities } from '@/utils/generateActivities'
import { generatePeriodSelectOptions } from '@/utils/generatePeriodSelectOptions'
import { currentPage, timelineRef } from './router'

const activities = ref(generateActivities())
const timelineItems = ref(generateTimelineItems(activities))

const activitySelectOptions = computed(() => generateActivitiesSelectOptions(activities.value))

const deleteActivity = (activity) => {
  timelineItems.value.forEach((timelineItem) => {
    if (timelineItem.activityId === activity.id) {
      timelineItem.activityId = null
      timelineItem.activitySeconds = 0
    }
  })

  activities.value.splice(activities.value.indexOf(activity), 1)
}

function createActivity(activity) {
  activities.value.push(activity)
}

function setTimelineItemActivity(timelineItem, activityId) {
  timelineItem.activityId = activityId
}

function updateTimelineItemActivitySeconds(timelineItem, activitySeconds) {
  timelineItem.activitySeconds += activitySeconds
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}

//functions
provide('updateTimelineItemActivitySeconds', updateTimelineItemActivitySeconds)
provide('setTimelineItemActivity', setTimelineItemActivity)
provide('setActivitySecondsToComplete', setActivitySecondsToComplete)
provide('createActivity', createActivity)
provide('deleteActivity', deleteActivity)
//variables
provide('timelineItems', timelineItems.value)
provide('activitySelectOptions', activitySelectOptions.value)
provide('periodSelectOptions', generatePeriodSelectOptions())
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
