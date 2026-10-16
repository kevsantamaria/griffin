<script setup lang="ts">
import TemplateCard from '@/features/templates/components/TemplateCard.vue'
import { useTemplates } from '@/features/templates/composables/use-templates'

const { getAll } = useTemplates()
const { data: templates, isPending, isError } = getAll
</script>

<template>
  <h1>Templates</h1>
  <p v-if="isPending">Loading…</p>
  <p v-else-if="isError">Could not load templates</p>
  <section v-else-if="templates">
    <TemplateCard v-for="template in templates" :key="template.id" v-bind="template" />
  </section>
</template>

<style lang="css" scoped>
section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: var(--space-4);
}
</style>
