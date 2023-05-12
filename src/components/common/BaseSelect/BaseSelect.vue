<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import { isNumberOrNull, isUndefinedOrNull, validateSelectOptions } from '@/validators'
import { computed } from 'vue'
import { BUTTON_TYPE_NEUTRAL } from '@/constans'

const props = defineProps({
  selected: Number,
  options: {
    type: Array,
    required: true,
    validator: validateSelectOptions,
  },
  placeholder: {
    type: String,
    required: true,
  },
})

const isNotSelected = computed(() => isUndefinedOrNull(props.selected))

const emit = defineEmits({
  select: isNumberOrNull,
})
</script>

<template>
  <div class='flex gap-2'>

    <BaseButton @click="emit('select', null)" :type="BUTTON_TYPE_NEUTRAL">
      <XMarkIcon class='h-8' />
    </BaseButton>

    <select
      class='w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl'
      @change="emit('select', +$event.target.value)"
    >
      <option :selected='isNotSelected' disabled value=''>{{ placeholder }}</option>
      <option
        v-for='{value, label} in options'
        :value='value'
        :key='value'
        :selected='value === selected'
      >{{ label }}
      </option>
    </select>
  </div>
</template>
