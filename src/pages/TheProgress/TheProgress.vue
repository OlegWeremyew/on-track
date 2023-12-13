<script setup>
import { trackedActivities } from "@/app-activities"
import { ProgressItem, TheProgressEmptyState } from "@/components"
</script>

<template>
  <ul v-if="trackedActivities.length" class="divide-y">
    <ProgressItem v-for="activity in trackedActivities" :key="activity.id" :activity="activity" />
  </ul>
  <TheProgressEmptyState v-else />
</template>
