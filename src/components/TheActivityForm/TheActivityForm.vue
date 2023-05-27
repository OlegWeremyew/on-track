<script setup>
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { isActivityValid } from '@/validators'
import { nextTick, ref } from 'vue'
import { generateId } from '@/utils/generateId'

const emit = defineEmits({
  submit: isActivityValid,
})

const activity = ref('')

const submit = async () => {
  emit('submit', {
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
      <PlusIcon class='h-8' />
    </BaseButton>
  </form>
</template>
