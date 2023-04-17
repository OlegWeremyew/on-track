<script setup>
import {ChartBarIcon, ClockIcon, ListBulletIcon} from "@heroicons/vue/24/outline";
import NavItem from "@/components/TheNav/NavItem/NavItem.vue";
import {ref} from "vue";

const navItems = {
  timeline: ClockIcon,
  activities: ListBulletIcon,
  progress: ChartBarIcon
}

let currenPage = ref("timeline")

const setCurrentPage = (value) => {
  currenPage.value = value
}

</script>
<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="list-style-none flex w-screen items-center justify-around border-t">
      <NavItem
          v-for="(icon, page) in navItems"
          :key="page"
          :href="`#${page}`"
          :class="{'bg-gray-200 pointer-events-none' : currenPage === page}"
          @click="setCurrentPage(page)"
      >
        <component :is="icon" class="h-6 w-6"/>
        {{ page }}
      </NavItem>
    </ul>
  </nav>
</template>