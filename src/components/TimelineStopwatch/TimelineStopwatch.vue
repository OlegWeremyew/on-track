<script setup>
import { ArrowPathIcon, PlayIcon, PauseIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING, MILLISECONDS_IN_SECONDS,
} from '@/constants'
import { isTimelineItemValid } from '@/validators'
import { formatSeconds, getCurrentHour } from '@/utils'
import { ref, inject } from 'vue'
import { updateTimelineItemActivitySecondsKey } from '@/constants/keys'

const updateTimelineItemActivitySeconds = inject(updateTimelineItemActivitySecondsKey)

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

function start() {
  isRunning.value = setInterval(() => {
    updateTimelineItemActivitySeconds(props.timelineItem, 1)

    seconds.value += 1
  }, MILLISECONDS_IN_SECONDS)
}

function stop() {
  clearInterval(isRunning.value)
  isRunning.value = false
}

function reset() {
  stop()
  updateTimelineItemActivitySeconds(props.timelineItem, -seconds.value)

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
      <ArrowPathIcon class='h-8' />
    </BaseButton>
    <div class='flex flex-grow items-center rounded bg-gray-100 px-2 font-mono text-3xl'>
      {{ formatSeconds(seconds) }}
    </div>
    <BaseButton
      v-if='isRunning'
      :type='BUTTON_TYPE_WARNING'
      @click='stop'
    >
      <PauseIcon class='h-8' />
    </BaseButton>
    <BaseButton
      v-else
      :disabled='isStartButtonDisabled'
      :type='BUTTON_TYPE_SUCCESS'
      @click='start'
    >
      <PlayIcon class='h-8' />
    </BaseButton>
  </div>
</template>
