<script setup>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import TheNav from '@/components/TheNav/TheNav.vue'
import TheTimeline from '@/pages/TheTimeline/TheTimeline.vue'
import TheActivities from '@/pages/TheActivities/TheActivities.vue'
import TheProgress from '@/pages/TheProgress/TheProgress.vue'
import { PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE } from '@/constants'
import { currentPage, timelineRef } from './router'
</script>

<template>
  <TheHeader />

  <main class='flex flex-grow flex-col'>
    <TheTimeline
      v-show='currentPage === PAGE_TIMELINE'
      ref='timelineRef'
    />
    <TheActivities v-show='currentPage === PAGE_ACTIVITIES' />
    <TheProgress v-show='currentPage === PAGE_PROGRESS' />
  </main>

  <TheNav />
</template>
