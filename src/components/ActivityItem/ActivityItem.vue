<script setup>
import { BaseButton, BaseSelect, BaseIcon } from "@/components/common"
import { RemainingActivitySeconds } from "@/components/ActivityItem/RemainingActivitySeconds"
import { isActivityValid } from "@/validators"
import { BUTTON_TYPE_DANGER, PERIOD_SELECT_OPTIONS, ICON_TRASH } from "@/constants"
import {
  deleteActivity,
  resetTimelineItemsActivities,
  timelineItems,
  updateActivity,
} from "@/app-activities"

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
})

const deleteAndResetActivity = (activity) => {
  resetTimelineItemsActivities(timelineItems.value, activity)
  deleteActivity(activity)
}
</script>

<template>
  <li class="flex flex-col gap-2 p-4">
    <div class="flex items-center gap-2">
      <BaseButton :type="BUTTON_TYPE_DANGER" @click="deleteAndResetActivity(activity)">
        <BaseIcon :name="ICON_TRASH" />
      </BaseButton>
      <span class="truncate text-xl">{{ activity.name }}</span>
    </div>
    <div class="flex gap-2">
      <BaseSelect
        class="grow font-mono"
        placeholder="hh:mm"
        :options="PERIOD_SELECT_OPTIONS"
        :selected="activity.secondsToComplete || null"
        @select="updateActivity(activity, { secondsToComplete: $event || 0 })"
      />
      <RemainingActivitySeconds v-if="activity.secondsToComplete" :activity="activity" />
    </div>
  </li>
</template>
