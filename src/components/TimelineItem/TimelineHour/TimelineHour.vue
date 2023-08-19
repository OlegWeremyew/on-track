<script setup>
import { isHourValid } from '@/validators'
import { getCurrentHour } from '@/utils'
import { scrollToHour } from '@/activities'

const props = defineProps({
  hour: {
    type: Number,
    required: true,
    validator: isHourValid,
  },
})

const classes = [
  'absolute -top-4 left-1/2 -translate-x-1/2 rounded px-2 font-mono text-lg',
  props.hour === getCurrentHour()
    ? 'bg-purple-900 font-black text-white'
    : 'bg-gray-100 text-gray-500',
]
</script>
<template>
  <a
    href='#'
    :class='classes'
    @click.prevent='scrollToHour(hour)'
  >
    {{ hour.toString().padStart(2, '0') }}:00
  </a>
</template>


