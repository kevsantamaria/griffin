<script setup lang="ts">
import { useRoute } from 'vue-router'

import SiteDetail from '@/features/sites/components/SiteDetail.vue'
import { useSites } from '@/features/sites/composables/use-sites'

const route = useRoute()
const slug = String(route.params.slug)
const { getBySlug } = useSites(undefined, { slug })
const { data: site, isPending, isError } = getBySlug
</script>

<template>
  <h1>Site details</h1>
  <p v-if="isPending">Loading…</p>
  <p v-else-if="isError">Could not load site</p>
  <SiteDetail v-else-if="site" v-bind="site" />
</template>

<style scoped></style>
