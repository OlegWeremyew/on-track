<script setup>
import { TheLogo } from "@/components/TheHeader/TheLogo"
import { TheHeaderProgress } from "@/components/TheHeader/TheHeaderProgress"
</script>

<template>
  <header class="sticky top-0 z-20 flex items-center justify-between border-b bg-white p-3">
    <TheLogo />
    <TheHeaderProgress />
  </header>
</template>
