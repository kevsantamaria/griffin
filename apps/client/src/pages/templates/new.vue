<script setup lang="ts">
import CreateTemplateForm from '@/features/templates/components/CreateTemplateForm.vue'
import { useTemplates } from '@/features/templates/composables/use-templates'
import type { TemplateFormState } from '@/features/templates/types'
import BackLink from '@/shared/components/ui/BackLink.vue'

const { create } = useTemplates()

async function submit(template: TemplateFormState) {
  await create.mutateAsync(template)
}
</script>

<template>
  <div class="page">
    <BackLink to="/templates" label="Back to templates" />

    <header class="page-header">
      <h1>Create a new template</h1>
      <p>Define the groups and fields a site can fill in with credentials.</p>
    </header>

    <CreateTemplateForm
      @submit="submit"
      v-bind="{ isError: create.isError, error: create.error }"
    />
  </div>
</template>

<style lang="css" scoped>
.page {
  width: min(100%, 48rem);
  margin-inline: auto;
}

.page-header {
  margin-bottom: var(--space-6);
}

.page-header h1 {
  margin-bottom: var(--space-2);
}

.page-header p {
  color: var(--color-muted);
  font-size: 0.875rem;
}
</style>
