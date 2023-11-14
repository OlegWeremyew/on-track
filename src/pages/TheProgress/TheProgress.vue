<script setup>
import { trackedActivities } from '@/app-activities'
import ProgressItem from '@/components/ProgressItem/ProgressItem.vue'
import TheProgressEmptyState from '@/components/TheProgressEmptyState/TheProgressEmptyState.vue'
</script>

<template>
  <ul v-if='trackedActivities.length' class='divide-y'>
    <ProgressItem
      v-for='(activity) in trackedActivities'
      :key='activity.id'
      :activity='activity'
    />
  </ul>
  <TheProgressEmptyState v-else />
</template>
