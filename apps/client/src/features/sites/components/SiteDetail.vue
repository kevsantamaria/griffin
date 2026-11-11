<script setup lang="ts">
import type { SingleSiteRes } from '@griffin/schemas'
import { computed } from 'vue'

import DetailCard from '@/shared/components/detail/DetailCard.vue'
import DetailList from '@/shared/components/detail/DetailList.vue'
import DetailSection from '@/shared/components/detail/DetailSection.vue'
import TagList from '@/shared/components/ui/TagList.vue'
import type { DetailItem } from '@/shared/types'
import { formatDateTime } from '@/shared/utils/format-date'

const props = defineProps<SingleSiteRes>()

const meta = computed<DetailItem[]>(() => [
  { label: 'URL', value: props.url, mono: true },
  { label: 'Scope', value: props.isInternal ? 'Internal' : 'External' },
  { label: 'Notes', value: props.notes },
  { label: 'Created', value: formatDateTime(props.createdAt) },
  { label: 'Updated', value: formatDateTime(props.updatedAt) },
])

const groups = computed(() =>
  props.credentials.map((group) => ({
    header: group.header,
    fields: group.fields.map((field) => ({
      label: field.label,
      value: field.content,
      mono: true,
    })),
  }))
)
</script>

<template>
  <DetailList :items="meta" />

  <DetailSection title="Tags">
    <TagList :tags="props.tags" />
  </DetailSection>

  <DetailSection title="Credentials">
    <DetailCard v-for="(group, index) in groups" :key="index" :title="group.header">
      <DetailList :items="group.fields" />
    </DetailCard>
  </DetailSection>
</template>
