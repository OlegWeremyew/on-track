<script setup>
import TheHeader from "@/components/TheHeader/TheHeader.vue";
import TheNav from "@/components/TheNav/TheNav.vue";
import TheTimeline from "@/pages/TheTimeline/TheTimeline.vue";
import TheActivities from "@/pages/TheActivities/TheActivities.vue";
import TheProgress from "@/pages/TheProgress/TheProgress.vue";
import {ref} from "vue";
import {PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE} from "@/constans";
import {normalizePageHash} from "@/utils/normalizePageHash";

const currentPage = ref(normalizePageHash())

const goTo = (page) => {
  currentPage.value = page
}

</script>

<template>
  <TheHeader
      @go-to-timeline="goTo(PAGE_TIMELINE)"
      @go-to-progress="goTo(PAGE_PROGRESS)"
  />

  <main class="flex flex-grow flex-col">
    <TheTimeline v-show="currentPage === PAGE_TIMELINE"/>
    <TheActivities v-show="currentPage === PAGE_ACTIVITIES"/>
    <TheProgress v-show="currentPage === PAGE_PROGRESS"/>
  </main>

  <TheNav :current-page="currentPage" @navigate="goTo($event)"/>
</template>
