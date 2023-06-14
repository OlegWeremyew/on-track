<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import BaseSelect from '@/components/common/BaseSelect/BaseSelect.vue'
import { PERIOD_SELECT_OPTIONS, BUTTON_TYPE_DANGER } from '@/constans'
import { isActivityValid, isUndefined, isNumber } from '@/validators'

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
})

const emit = defineEmits({
  delete: isUndefined,
  setSecondsToComplete: isNumber
})

</script>
<template>
  <li class='flex flex-col p-4 gap-2'>
    <div class='flex items-center gap-2'>
      <BaseButton :type='BUTTON_TYPE_DANGER' @click="emit('delete')">
        <TrashIcon class='h-8' />
      </BaseButton>
      <span class='truncate text-xl'>{{ activity.name }}</span>
    </div>
    <div>
      <BaseSelect
        class='font-mono'
        placeholder='h:mm'
        :options='PERIOD_SELECT_OPTIONS'
        :selected='activity.secondsToComplete || null'
        @select="emit('setSecondsToComplete', $event || 0)"
      />
    </div>
  </li>
</template>
