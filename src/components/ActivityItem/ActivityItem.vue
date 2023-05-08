<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import BaseSelect from '@/components/common/BaseSelect/BaseSelect.vue'
import { ref } from 'vue'
import { PERIOD_SELECT_OPTIONS, BUTTON_TYPE_DANGER } from '@/constans'
import { isActivityValid } from '@/validators'

defineProps({
  activity: {
    type: String,
    required: true,
    validator: isActivityValid,
  },
})

let secondsToComplete = ref(null)

</script>
<template>
  <li class='flex flex-col p-4 gap-2'>
    <div class='flex items-center gap-2'>
      <BaseButton :type='BUTTON_TYPE_DANGER'>
        <TrashIcon class='h-8' />
      </BaseButton>
      <span class='truncate text-xl'>{{ activity }}</span>
    </div>
    <div>
      <BaseSelect
        class='font-mono'
        placeholder='h:mm'
        :options='PERIOD_SELECT_OPTIONS'
        :selected='secondsToComplete'
        @select='secondsToComplete = $event'
      />
    </div>
  </li>
</template>
