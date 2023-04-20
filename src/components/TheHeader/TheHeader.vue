<script setup>
import TheLogo from "@/components/TheHeader/TheLogo/TheLogo.vue";
import TheHeaderProgress from "@/components/TheHeader/TheHeaderProgress/TheHeaderProgress.vue";

const emit = defineEmits(['goToTimeline, goToProgress'])
</script>

<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <TheLogo @click="emit('goToTimeline')"/>
    <TheHeaderProgress @click="emit('goToProgress')"/>
  </header>
</template>
