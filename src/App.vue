<script setup>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import TheNav from '@/components/TheNav/TheNav.vue'

import { currentPage, routes } from './router'
</script>

<template>
  <TheHeader />

  <main class='flex flex-grow flex-col'>
    <KeepAlive>
      <component :is="routes[currentPage]"/>
    </KeepAlive>
  </main>

  <TheNav />
</template>
