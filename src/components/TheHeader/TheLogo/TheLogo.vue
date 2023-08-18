<script setup>
import {PAGE_TIMELINE} from '@/constants'
import { currentPage, navigate } from '@/router'
import { scrollToCurrentHour } from '@/activities'

const handleClick = () => {
  currentPage.value === PAGE_TIMELINE ? scrollToCurrentHour(true) : navigate(PAGE_TIMELINE)
}
</script>

<template>
  <a :href="`#${PAGE_TIMELINE}`" @click="handleClick">
    <img src="@/assets/images/logo.png" alt="logo" title="logo" class="h-9">
  </a>
</template>

