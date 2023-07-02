<script setup>
import { ArrowPathIcon, PlayIcon, PauseIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import {
  BUTTON_TYPE_DANGER,
  BUTTON_TYPE_SUCCESS,
  BUTTON_TYPE_WARNING, MILLISECONDS_IN_SECONDS,
} from '@/constants'
import { isHourValid, isNumber } from '@/validators'
import { formatSeconds } from '@/utils/formatSeconds'
import { ref } from 'vue'

const props = defineProps({
    seconds: {
      type: Number,
      default: 0,
      validator: isNumber,
    },
    hour: {
      type: Number,
      required: true,
      validator: isHourValid,
    },
  },
)

const seconds = ref(props.seconds)
const isRunning = ref()

const isStartButtonDisabled = props.hour !== new Date().getHours()

function start() {
  isRunning.value = setInterval(() => {
    seconds.value += 1
  }, MILLISECONDS_IN_SECONDS)
}

function stop() {
  clearInterval(isRunning.value)
  isRunning.value = false
}

function reset() {
  stop()
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
      <PauseIcon class='h-8'/>
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
