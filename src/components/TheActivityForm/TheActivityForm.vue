<script setup>
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import BaseIcon from '@/components/common/BaseIcon/BaseIcon.vue'
import { nextTick, ref } from 'vue'
import { generateId } from '@/utils'
import { createActivity } from '@/activities'
import { ICON_PLUS } from '@/constants/icons'

const activity = ref('')

const submit = async () => {
  createActivity({
    id: generateId(),
    name: activity.value,
    secondsToComplete: 0,
  })

  activity.value = ''

  await nextTick()
  window.scrollTo({
    left: 0,
    top: document.body.scrollHeight,
    behavior: 'smooth',
  })
}
</script>

<template>
  <form
    class='sticky bottom-[57px] flex gap-2 border-t bg-white p-4'
    @submit.prevent='submit'
  >
    <input
      type='text'
      class='w-full rounded border px-4 text-xl'
      placeholder='Activity name'
      v-model='activity'
    >
    <BaseButton :disabled='!activity.trim()'>
      <BaseIcon :name='ICON_PLUS'/>
    </BaseButton>
  </form>
</template>
