<script setup>
import NavItem from "@/components/TheNav/NavItem/NavItem.vue"
import { NAV_ITEMS } from "@/constants"
</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="list-style-none flex w-screen items-center justify-around border-t">
      <NavItem v-for="navItem in NAV_ITEMS" :key="navItem.page" :nav-item="navItem" />
    </ul>
  </nav>
</template>
