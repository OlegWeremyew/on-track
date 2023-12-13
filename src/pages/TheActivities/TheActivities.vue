<script setup>
import { ActivityItem, TheActivityForm, TheActivitiesEmptyState } from "@/components"
import { activities } from "@/app-activities"
</script>

<template>
  <div class="flex grow flex-col">
    <ul v-if="activities.length" class="grow divide-y">
      <ActivityItem v-for="activity in activities" :key="activity.id" :activity="activity" />
    </ul>
    <TheActivitiesEmptyState v-else />
    <TheActivityForm />
  </div>
</template>
