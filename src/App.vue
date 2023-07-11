<script setup>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import TheNav from '@/components/TheNav/TheNav.vue'
import TheTimeline from '@/pages/TheTimeline/TheTimeline.vue'
import TheActivities from '@/pages/TheActivities/TheActivities.vue'
import TheProgress from '@/pages/TheProgress/TheProgress.vue'
import { computed, provide, ref } from 'vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'
import { normalizePageHash } from '@/utils/normalizePageHash'
import { generateTimelineItems } from '@/utils/generateTimelineItems'
import { generateActivitiesSelectOptions } from '@/utils/generateActivitiesSelectOptions'
import { generateActivities } from '@/utils/generateActivities'
import { generatePeriodSelectOptions } from '@/utils/generatePeriodSelectOptions'

const currentPage = ref(normalizePageHash())
const activities = ref(generateActivities())
const timelineItems = ref(generateTimelineItems(activities))
const timeline = ref()

const activitySelectOptions = computed(() => generateActivitiesSelectOptions(activities.value))

const goTo = (page) => {
  if (currentPage.value === PAGE_TIMELINE && page === PAGE_TIMELINE) {
    timeline.value.scrollToHour()
  }

  if (page !== PAGE_TIMELINE) {
    document.body.scrollIntoView()
  }

  currentPage.value = page
}

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
  <TheHeader @navigate='goTo($event)' />

  <main class='flex flex-grow flex-col'>
    <TheTimeline
      v-show='currentPage === PAGE_TIMELINE'
      ref='timeline'
      :timeline-items='timelineItems'
      :current-page='currentPage'
    />
    <TheActivities
      v-show='currentPage === PAGE_ACTIVITIES'
      :activities='activities'
      @set-activity-seconds-to-complete='setActivitySecondsToComplete'
    />
    <TheProgress v-show='currentPage === PAGE_PROGRESS' />
  </main>

  <TheNav :current-page='currentPage' @navigate='goTo($event)' />
</template>
