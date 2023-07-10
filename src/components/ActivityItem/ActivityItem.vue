<script setup>
import { inject } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import BaseSelect from '@/components/common/BaseSelect/BaseSelect.vue'
import { BUTTON_TYPE_DANGER } from '@/constants'
import { isActivityValid, isUndefined } from '@/validators'
import ActivitySecondsToComplete
  from '@/components/ActivityItem/ActivitySecondsToComplete/ActivitySecondsToComplete.vue'

const setActivitySecondsToComplete = inject('setActivitySecondsToComplete')
const periodSelectOptions = inject('periodSelectOptions')

defineProps({
  activity: {
    type: Object,
    required: true,
    validator: isActivityValid,
  },
})

const emit = defineEmits({
  delete: isUndefined,
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
    <div class='flex gap-2'>
      <BaseSelect
        class='font-mono grow'
        placeholder='hh:mm'
        :options='periodSelectOptions'
        :selected='activity.secondsToComplete || null'
        @select="setActivitySecondsToComplete(activity, $event || 0)"
      />
      <ActivitySecondsToComplete
        v-if='activity.secondsToComplete'
        :activity='activity'
      />
    </div>
  </li>
</template>
