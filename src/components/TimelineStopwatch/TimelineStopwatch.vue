<script setup>
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import BaseIcon from '@/components/common/BaseIcon/BaseIcon.vue'
import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING,
  MILLISECONDS_IN_SECONDS,
} from '@/constants'
import { isTimelineItemValid } from '@/validators'
import { formatSeconds, getCurrentHour } from '@/utils'
import { ref, watch } from 'vue'
import { updateTimelineItem } from '@/activities'
import { ICON_ARROW_PATH, ICON_PAUSE, ICON_PLAY } from '@/constants/icons'

const props = defineProps({
    timelineItem: {
      type: Object,
      required: true,
      validator: isTimelineItemValid,
    },
  },
)

const seconds = ref(props.timelineItem.activitySeconds)
const isRunning = ref()

const isStartButtonDisabled = props.timelineItem.hour !== getCurrentHour()

watch(
  () => props.timelineItem.activityId,
  () => updateTimelineItem(props.timelineItem, { activitySeconds: seconds.value }),
)

function start() {
  isRunning.value = setInterval(() => {
    updateTimelineItem(
      props.timelineItem,
      { activitySeconds: props.timelineItem.activitySeconds + 1 },
    )

    seconds.value += 1
  }, MILLISECONDS_IN_SECONDS)
}

function stop() {
  clearInterval(isRunning.value)
  isRunning.value = false
}

function reset() {
  stop()

  updateTimelineItem(
    props.timelineItem,
    { activitySeconds: props.timelineItem.activitySeconds - seconds.value },
  )

  seconds.value = 0
}
</script>

<template>
  <div class='flex w-full gap-2 mt-2'>
    <BaseButton
      :type='BUTTON_TYPE_DANGER'
      :disabled='!seconds'
      @click='reset'
    >
      <BaseIcon :name="ICON_ARROW_PATH"/>
    </BaseButton>
    <div class='flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl'>
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton
      v-if='isRunning'
      :type='BUTTON_TYPE_WARNING'
      @click='stop'
    >
      <BaseIcon :name="ICON_PAUSE"/>
    </BaseButton>
    <BaseButton
      v-else
      :disabled='isStartButtonDisabled'
      :type='BUTTON_TYPE_SUCCESS'
      @click='start'
    >
      <BaseIcon :name="ICON_PLAY"/>
    </BaseButton>
  </div>
</template>
