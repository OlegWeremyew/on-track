<script setup>
import TheHeader from "@/components/TheHeader/TheHeader.vue";
import TheNav from "@/components/TheNav/TheNav.vue";
import TheTimeline from "@/pages/TheTimeline/TheTimeline.vue";
import TheActivities from "@/pages/TheActivities/TheActivities.vue";
import TheProgress from "@/pages/TheProgress/TheProgress.vue";
import {ref} from "vue";
import {PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE} from "@/constans";

const currentPage = ref(normalizePageHash())

const navigate = (page) => {
  currentPage.value = page
}

function normalizePageHash() {
  const hash = window.location.hash.slice(1)
  if ([PAGE_TIMELINE, PAGE_ACTIVITIES, PAGE_PROGRESS].includes(hash)) {
    return hash
  }
  window.location.hash = PAGE_TIMELINE
  return PAGE_TIMELINE
}
</script>

<template>
  <TheHeader />

  <main class="flex flex-grow flex-col">
    <TheTimeline v-show="currentPage === PAGE_TIMELINE" />
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES" />
    <TheProgress v-show="currentPage === PAGE_PROGRESS" />
  </main>

  <TheNav :current-page="currentPage" @navigate="navigate" />
</template>
