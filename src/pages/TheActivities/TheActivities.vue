<script setup>
import ActivityItem from '@/components/ActivityItem/ActivityItem.vue'
import { isActivityValid, validateActivities } from '@/validators'
import TheActivityForm from '@/components/TheActivityForm/TheActivityForm.vue'

defineProps({
  activities: {
    type: Array,
    required: true,
    validator: validateActivities,
  },
})

const emit = defineEmits({
  deleteActivity: isActivityValid,
  createActivity: isActivityValid,
})

</script>

<template>
  <div>
    <ul class='divide-y'>
      <ActivityItem
        v-for='activity in activities'
        :key='activity'
        :activity='activity'
        @delete="emit('deleteActivity', activity)"
      />
    </ul>
    <TheActivityForm @submit="emit('createActivity', $event)" />
  </div>
</template>
