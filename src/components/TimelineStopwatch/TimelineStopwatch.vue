<script setup>
import { watchEffect } from 'vue'
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import BaseIcon from '@/components/common/BaseIcon/BaseIcon.vue'
import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
} from '@/constants'
import { isTimelineItemValid } from '@/validators'
import { formatSeconds } from '@/utils'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/constants/icons'
import { useStopWatch } from '@/composables'
import { updateTimelineItem } from '@/activities'
import { currentTime } from '@/time'

const props = defineProps({
    timelineItem: {
      type: Object,
      required: true,
      validator: isTimelineItemValid,
    },
  },
)

const { start, stop, reset, isRunning, seconds } = useStopWatch(props.timelineItem.activitySeconds)

watchEffect(() => {
  if (props.timelineItem.hour !== currentTime.value.getHours() && isRunning.value) {
    stop()
  }
})

watchEffect(() => updateTimelineItem(props.timelineItem, {
    activitySeconds: seconds.value,
  }),
)
</script>

<template>
  <div class='flex w-full gap-2 mt-2'>
    <BaseButton
      :type='BUTTON_TYPE_DANGER'
      :disabled='!timelineItem.activitySeconds'
      @click='reset'
    >
      <BaseIcon :name='ICON_ARROW_PATH' />
    </BaseButton>
    <div class='flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl'>
      {{ formatSeconds(timelineItem.activitySeconds) }}
    </div>
    <BaseButton
      v-if='isRunning'
      :type='BUTTON_TYPE_WARNING'
      @click='stop'
    >
      <BaseIcon :name='ICON_PAUSE' />
    </BaseButton>
    <BaseButton
      v-else
      :disabled='timelineItem.hour !== currentTime.getHours()'
      :type='BUTTON_TYPE_SUCCESS'
      @click='start'
    >
      <BaseIcon :name='ICON_PLAY' />
    </BaseButton>
  </div>
</template>
