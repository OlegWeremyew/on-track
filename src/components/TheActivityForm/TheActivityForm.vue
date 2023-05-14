<script setup>
import BaseButton from '@/components/common/BaseButton/BaseButton.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import { isActivityValid } from '@/validators'

const emit = defineEmits({
  submit: isActivityValid,
})

let activity = ''

const submit = () => {
  emit('submit', activity)
}
</script>

<template>
  <form
    class='sticky bottom-[57px] flex gap-2 border-t bg-white p-4'
    @submit.prevent="submit"
  >
    <input
      type='text'
      class='w-full rounded border px-4 text-xl'
      placeholder='Activity name'
      :value='activity'
      @input="activity = $event.target.value"
    >

    <BaseButton>
      <PlusIcon class='h-8' />
    </BaseButton >
  </form>
</template>
