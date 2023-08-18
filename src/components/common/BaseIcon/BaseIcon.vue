<script setup>
import { ICONS } from '@/constants/icons'
import { isIconValid, isString } from '@/validators'

defineProps({
  name: {
    type: String,
    required: true,
    validator: isIconValid
  },
  classes: {
    type: String,
    required: false,
    default: 'h-8',
    validator: isString
  },
})
</script>

<template>
  <component :is="ICONS[name]" :class="classes"/>
</template>
