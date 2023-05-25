<script setup>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import TheNav from '@/components/TheNav/TheNav.vue'
import TheTimeline from '@/pages/TheTimeline/TheTimeline.vue'
import TheActivities from '@/pages/TheActivities/TheActivities.vue'
import TheProgress from '@/pages/TheProgress/TheProgress.vue'
import { ref } from 'vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constans'
import { normalizePageHash } from '@/utils/normalizePageHash'
import { generateTimelineItems } from '@/utils/generateTimelineItems'
import { generateActivitiesSelectOptions } from '@/utils/generateActivitiesSelectOptions'
import { generateActivities } from '@/utils/generateActivities'
import { generateId } from '@/utils/generateId'

const currentPage = ref(normalizePageHash())
const timelineItems = generateTimelineItems()
const activities = ref(generateActivities())
const activitySelectOptions = generateActivitiesSelectOptions(activities.value)

const goTo = (page) => {
  currentPage.value = page
}

const deleteActivity = (activity) => {
  activities.value.splice(activities.value.indexOf(activity), 1)
}

function createActivity(name) {
  activities.value.push({
    id: generateId(),
    name,
    secondsToComplete: 0,
  })
}

</script>

<template>
  <TheHeader @navigate='goTo($event)' />

  <main class='flex flex-grow flex-col'>
    <TheTimeline
      v-show='currentPage === PAGE_TIMELINE'
      :timeline-items='timelineItems'
      :activity-select-options='activitySelectOptions'
    />
    <TheActivities
      v-show='currentPage === PAGE_ACTIVITIES'
      :activities='activities'
      @delete-activity='deleteActivity'
      @create-activity='createActivity'
    />
    <TheProgress v-show='currentPage === PAGE_PROGRESS' />
  </main>

  <TheNav :current-page='currentPage' @navigate='goTo($event)' />
</template>
