<script setup lang="ts">
import type { DetailItem } from '@/shared/types'

const props = defineProps<{ items: DetailItem[] }>()
</script>

<template>
  <dl class="detail-list">
    <div v-for="(item, index) in props.items" :key="index" class="detail-row">
      <dt>{{ item.label }}</dt>
      <dd :class="{ 'detail-mono': item.mono }">{{ item.value ?? '—' }}</dd>
    </div>
  </dl>
</template>

<style lang="css" scoped>
.detail-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.detail-row {
  display: grid;
  grid-template-columns: 9rem 1fr;
  gap: var(--space-3);
  font-size: 0.875rem;
}

dt {
  color: var(--color-muted);
}

dd {
  margin: 0;
  overflow-wrap: anywhere;
}

.detail-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
</style>
