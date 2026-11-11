<script setup lang="ts">
import CreateSiteForm from '@/features/sites/components/CreateSiteForm.vue'
import { useSites } from '@/features/sites/composables/use-sites'
import type { SiteFormState } from '@/features/sites/types'
import BackLink from '@/shared/components/ui/BackLink.vue'

const { create } = useSites()

async function submit(site: SiteFormState) {
  await create.mutateAsync(site)
}
</script>

<template>
  <div class="page">
    <BackLink to="/" label="Back to sites" />

    <header class="page-header">
      <h1>Add a new site</h1>
      <p>Add the site details and the credentials it needs.</p>
    </header>

    <CreateSiteForm @submit="submit" v-bind="{ isError: create.isError, error: create.error }" />
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
