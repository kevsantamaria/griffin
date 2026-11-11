<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import MainLayout from './shared/components/layout/MainLayout.vue'

const route = useRoute()
const isBare = computed(() => route.name === '/login')
</script>

<template>
  <RouterView v-if="isBare" />
  <MainLayout v-else>
    <RouterView />
  </MainLayout>
</template>

<style scoped></style>
