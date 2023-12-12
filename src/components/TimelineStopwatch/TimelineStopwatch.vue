<script setup>
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import BaseIcon from '@/components/common/BaseIcon/BaseIcon.vue'
import { BUTTON_TYPE_DANGER, BUTTON_TYPE_SUCCESS, BUTTON_TYPE_WARNING } from '@/constants'
import { formatSeconds } from '@/utils'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/constants/icons'
import { currentTime } from '@/time'
import { resetTimelineItem, stopTimelineItemTimer, startTimelineItemTimer, timelineItemTimer } from '@/app-activities'
import { isTimelineItemValid } from '@/validators'

defineProps({
  timelineItem: {
    required: true,
    type: Object,
    validator: isTimelineItemValid
  }
})
</script>

<template>
  <div class='flex w-full gap-2 mt-2'>
    <BaseButton
      :type='BUTTON_TYPE_DANGER'
      :disabled='!timelineItem.activitySeconds'
      @click='resetTimelineItem(timelineItem)'
    >
      <BaseIcon :name='ICON_ARROW_PATH' />
    </BaseButton>
    <div class='flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl'>
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton
      v-if='timelineItemTimer && timelineItem.hour === currentTime.getHours()'
      :type='BUTTON_TYPE_WARNING'
      @click='stopTimelineItemTimer(timelineItem)'
    >
      <BaseIcon :name='ICON_PAUSE' />
    </BaseButton>
    <BaseButton
      v-else
      :disabled='timelineItem.hour !== currentTime.getHours()'
      :type='BUTTON_TYPE_SUCCESS'
      @click='startTimelineItemTimer(timelineItem)'
    >
      <BaseIcon :name='ICON_PLAY' />
    </BaseButton>
  </div>
</template>
