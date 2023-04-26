<script setup>
import {XMarkIcon} from '@heroicons/vue/24/outline'
import BaseButton from "@/components/common/BaseButton/BaseButton.vue";

defineProps(['options', 'placeholder', 'selected'])
</script>

<template>
  <div class="flex gap-2">

    <BaseButton>
      <XMarkIcon class="h-8"/>
    </BaseButton>

    <select class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl">
      <option selected disabled value="">{{ placeholder }}</option>
      <option
          v-for="{value, label} in options"
          :value="value"
          :key="value"
          :selected="value === selected"
      >{{ label }}
      </option>
    </select>
  </div>
</template>
