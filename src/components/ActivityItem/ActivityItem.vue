<script setup>
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import BaseSelect from '@/components/common/BaseSelect/BaseSelect.vue'
import ActivitySecondsToComplete
  from '@/components/ActivityItem/ActivitySecondsToComplete/ActivitySecondsToComplete.vue'
import BaseIcon from '@/components/common/BaseIcon/BaseIcon.vue'
import { isActivityValid } from '@/validators'
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS } from '@/constants'
import {
  deleteActivity,
  resetTimelineItemsActivities,
  timelineItems,
  updateActivity,
} from '@/activities'
import { ICON_TRASH } from '@/constants/icons'

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
})

const deleteAndResetActivity = (activity) => {
  resetTimelineItemsActivities(timelineItems.value ,activity)
  deleteActivity(activity)
}
</script>

<template>
  <li class='flex flex-col p-4 gap-2'>
    <div class='flex items-center gap-2'>
      <BaseButton :type='BUTTON_TYPE_DANGER' @click='deleteAndResetActivity(activity)'>
        <BaseIcon :name="ICON_TRASH"/>
      </BaseButton>
      <span class='truncate text-xl'>{{ activity.name }}</span>
    </div>
    <div class='flex gap-2'>
      <BaseSelect
        class='font-mono grow'
        placeholder='hh:mm'
        :options='PERIOD_SELECT_OPTIONS'
        :selected='activity.secondsToComplete || null'
        @select="updateActivity(activity, {secondsToComplete: $event || 0})"
      />
      <ActivitySecondsToComplete
        v-if='activity.secondsToComplete'
        :activity='activity'
      />
    </div>
  </li>
</template>
