<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import SiteDetail from '@/features/sites/components/SiteDetail.vue'
import { useSites } from '@/features/sites/composables/use-sites'
import BackLink from '@/shared/components/ui/BackLink.vue'
import Button from '@/shared/components/ui/Button.vue'
import ConfirmDialog from '@/shared/components/ui/ConfirmDialog.vue'

const route = useRoute()
const slug = String(route.params.slug)
const { getBySlug, remove } = useSites(undefined, { slug })
const { data: site, isPending, isError } = getBySlug
const { isPending: isDeleting, isError: isDeleteError, error: deleteError } = remove

const isConfirmOpen = ref(false)

async function confirmDelete() {
  if (!site.value) return

  try {
    await remove.mutateAsync(site.value.id)
    isConfirmOpen.value = false
  } catch {
    // the error is rendered inside the dialog via isDeleteError/deleteError
  }
}
</script>

<template>
  <BackLink to="/" label="Back to sites" />

  <header class="page-header">
    <div>
      <h1>{{ site?.name ?? 'Site details' }}</h1>
      <p v-if="site" class="page-subtitle">{{ site.technology }}</p>
    </div>

    <Button v-if="site" variant="danger" @click="isConfirmOpen = true">Delete site</Button>
  </header>

  <p v-if="isPending" class="page-status">Loading…</p>
  <p v-else-if="isError" class="page-status">Could not load site</p>
  <SiteDetail v-else-if="site" v-bind="site" />

  <ConfirmDialog
    v-if="site"
    v-model:open="isConfirmOpen"
    title="Delete site"
    :message="`Are you sure you want to delete “${site.name}”? This action cannot be undone.`"
    confirm-label="Delete"
    :pending="isDeleting"
    @confirm="confirmDelete"
  >
    <p v-if="isDeleteError" role="alert" class="dialog-error">{{ deleteError?.message }}</p>
  </ConfirmDialog>
</template>

<style lang="css" scoped>
.page-header {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.page-header h1 {
  margin-bottom: var(--space-1);
}

.page-subtitle {
  color: var(--color-muted);
  font-size: 0.875rem;
}

.page-status {
  color: var(--color-muted);
  font-size: 0.8125rem;
}

.dialog-error {
  color: var(--color-danger);
}
</style>
