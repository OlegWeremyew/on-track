<script setup>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import TheNav from '@/components/TheNav/TheNav.vue'
import TheTimeline from '@/pages/TheTimeline/TheTimeline.vue'
import TheActivities from '@/pages/TheActivities/TheActivities.vue'
import TheProgress from '@/pages/TheProgress/TheProgress.vue'
import { computed, ref } from 'vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'
import { normalizePageHash } from '@/utils/normalizePageHash'
import { generateTimelineItems } from '@/utils/generateTimelineItems'
import { generateActivitiesSelectOptions } from '@/utils/generateActivitiesSelectOptions'
import { generateActivities } from '@/utils/generateActivities'

const currentPage = ref(normalizePageHash())
const activities = ref(generateActivities())
const timelineItems = ref(generateTimelineItems(activities))
const activitySelectOptions = computed(() => generateActivitiesSelectOptions(activities.value))

const goTo = (page) => {
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

function setTimelineItemActivity(timelineItem, activity) {
  timelineItem.activityId = activity?.id
}

function setActivitySecondsToComplete(activity, secondsToComplete) {
  activity.secondsToComplete = secondsToComplete
}

</script>

<template>
  <TheHeader @navigate='goTo($event)' />

  <main class='flex flex-grow flex-col'>
    <TheTimeline
      v-show='currentPage === PAGE_TIMELINE'
      :timeline-items='timelineItems'
      :activities='activities'
      :activity-select-options='activitySelectOptions'
      @set-timeline-item-activity='setTimelineItemActivity'
    />
    <TheActivities
      v-show='currentPage === PAGE_ACTIVITIES'
      :activities='activities'
      @delete-activity='deleteActivity'
      @create-activity='createActivity'
      @set-activity-seconds-to-complete='setActivitySecondsToComplete'
    />
    <TheProgress v-show='currentPage === PAGE_PROGRESS' />
  </main>

  <TheNav :current-page='currentPage' @navigate='goTo($event)' />
</template>
