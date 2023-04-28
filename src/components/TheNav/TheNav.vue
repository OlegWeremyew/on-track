<script setup>
import NavItem from "@/components/TheNav/NavItem/NavItem.vue";
import {NAV_ITEMS} from "@/constans";

defineProps({
  currentPage: {
    required: true,
    type: String,
    validator(currentPage) {
      return Object.keys(NAV_ITEMS).includes(currentPage)
    }
  }
})

const emit = defineEmits(['navigate'])

</script>

<template>
  <nav class="sticky bottom-0 z-10 bg-white">
    <ul class="list-style-none flex w-screen items-center justify-around border-t">
      <NavItem
          v-for="(icon, page) in NAV_ITEMS"
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