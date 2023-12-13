<script setup>
import { ICONS } from "@/constants/icons"
import { isIconValid } from "@/validators"

defineProps({
  name: {
    type: String,
    required: true,
    validator: isIconValid,
  },
})
</script>

<template>
  <component :is="ICONS[name]" :class="$attrs.class || 'h-8'" />
</template>
