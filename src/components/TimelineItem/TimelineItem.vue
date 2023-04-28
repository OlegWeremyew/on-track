<script setup>
import BaseSelect from "@/components/common/BaseSelect/BaseSelect.vue";
import {HOURS_IN_DAY} from "@/constans";

const OPTIONS = [
  {value: 1, label: 'Coding',},
  {value: 2, label: 'Reading',},
  {value: 3, label: 'Training',},
]

const selectedActivityId = 2

const props = defineProps({
  timelineItem: {
    type: Object,
    required: true,
    validator({hour}) {
      return typeof hour === 'number' && hour >= 0 && hour < HOURS_IN_DAY
    }
  },
})

const hourLinkClasses = [
  'absolute -top-4 left-1/2 -translate-x-1/2 rounded px-2 font-mono text-lg',
  props.timelineItem.hour === new Date().getHours()
      ? "bg-purple-900 font-black text-white"
      : 'bg-gray-100 text-gray-500',
]
</script>

<template>
  <li class="relative flex flex-col border-t border-gray-200 py-10 px-4">
    <a href="#" :class="hourLinkClasses">
      {{ timelineItem.hour }}: 00
    </a>
    <BaseSelect
        :options="OPTIONS"
        placeholder="Rest"
        :selected="selectedActivityId"
    />
  </li>
</template>
