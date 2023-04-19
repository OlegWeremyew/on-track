<script setup>
import NavItem from "@/components/TheNav/NavItem/NavItem.vue";
import {PAGE_ACTIVITIES, PAGE_PROGRESS, PAGE_TIMELINE} from "@/constans";
import {ChartBarIcon, ClockIcon, ListBulletIcon} from "@heroicons/vue/24/outline";

defineProps(['currentPage'])

const emit = defineEmits(['navigate'])

const navItems = {
  [PAGE_TIMELINE]: ClockIcon,
  [PAGE_ACTIVITIES]: ListBulletIcon,
  [PAGE_PROGRESS]: ChartBarIcon
}

</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="list-style-none flex w-screen items-center justify-around border-t">
      <NavItem
          v-for="(icon, page) in navItems"
          :key="page"
          :href="`#${page}`"
          :class="{ 'pointer-events-none bg-gray-200': page === currentPage }"
          @click="emit('navigate', page)"
      >
        <component :is="icon" class="h-6 w-6"/>
        {{ page }}
      </NavItem>
    </ul>
  </nav>
</template>