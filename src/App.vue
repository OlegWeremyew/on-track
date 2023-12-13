<script setup>
import { TheHeader, TheNav } from "@/components"
import { currentPage, routes } from "@/router"
</script>

<template>
  <TheHeader />

  <main class="flex flex-grow flex-col">
    <KeepAlive>
      <component :is="routes[currentPage]" />
    </KeepAlive>
  </main>

  <TheNav />
</template>
