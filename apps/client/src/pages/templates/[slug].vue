<script setup lang="ts">
import { useRoute } from 'vue-router'

import TemplateDetail from '@/features/templates/components/TemplateDetail.vue'
import { useTemplates } from '@/features/templates/composables/use-templates'

const route = useRoute()
const slug = String(route.params.slug)
const { getBySlug } = useTemplates({ slug })
const { data: template, isPending, isError } = getBySlug
</script>

<template>
  <p v-if="isPending">Loading…</p>
  <p v-else-if="isError">Could not load template</p>
  <TemplateDetail v-else-if="template" v-bind="template" />
</template>
