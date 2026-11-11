<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import TemplateDetail from '@/features/templates/components/TemplateDetail.vue'
import { useTemplates } from '@/features/templates/composables/use-templates'
import BackLink from '@/shared/components/ui/BackLink.vue'
import Button from '@/shared/components/ui/Button.vue'
import ConfirmDialog from '@/shared/components/ui/ConfirmDialog.vue'

const route = useRoute()
const slug = String(route.params.slug)
const { getBySlug, remove } = useTemplates({ slug })
const { data: template, isPending, isError } = getBySlug
const { isPending: isDeleting, isError: isDeleteError, error: deleteError } = remove

const isConfirmOpen = ref(false)

async function confirmDelete() {
  if (!template.value) return

  try {
    await remove.mutateAsync(template.value.id)
    isConfirmOpen.value = false
  } catch {
    // the error is rendered inside the dialog via isDeleteError/deleteError
  }
}
</script>

<template>
  <BackLink to="/templates" label="Back to templates" />

  <header class="page-header">
    <div>
      <h1>{{ template?.name ?? 'Template details' }}</h1>
      <p v-if="template" class="page-subtitle">{{ template.technology }}</p>
    </div>

    <Button v-if="template" variant="danger" @click="isConfirmOpen = true">Delete template</Button>
  </header>

  <p v-if="isPending" class="page-status">Loading…</p>
  <p v-else-if="isError" class="page-status">Could not load template</p>
  <TemplateDetail v-else-if="template" v-bind="template" />

  <ConfirmDialog
    v-if="template"
    v-model:open="isConfirmOpen"
    title="Delete template"
    :message="`Are you sure you want to delete “${template.name}”? This action cannot be undone.`"
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
