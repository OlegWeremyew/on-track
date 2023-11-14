<script setup>
import { computed } from 'vue'
import { navigate, currentPage } from '@/router'
import { isNavItemValid } from '@/validators'
import BaseIcon from '@/components/common/BaseIcon/BaseIcon.vue'
import { PAGE_TIMELINE } from '@/constants'
import { scrollToCurrentHour } from '@/app-activities'

const props = defineProps({
  navItem: {
    required: true,
    type: Object,
    validator: isNavItemValid,
  },
})

const classes = computed(() => [
  'flex flex-col items-center p-2 text-xs capitalize',
  { 'bg-gray-200': props.navItem.page === currentPage.value },
])

const handleClick = () => {
  currentPage.value === PAGE_TIMELINE && props.navItem.page === PAGE_TIMELINE
    ? scrollToCurrentHour(true)
    : navigate(props.navItem.page)
}
</script>

<template>
  <li class='flex-1'>
    <a
      :href='`#${navItem.page}`'
      :class='classes'
      @click='handleClick'
    >
      <BaseIcon :name='navItem.icon' classes='h-6 w-6' />
      {{ navItem.page }}
    </a>
  </li>
</template>
