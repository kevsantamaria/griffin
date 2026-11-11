<script setup lang="ts">
import type { SingleTemplateRes } from '@griffin/schemas'
import { computed } from 'vue'

import DetailCard from '@/shared/components/detail/DetailCard.vue'
import DetailList from '@/shared/components/detail/DetailList.vue'
import DetailSection from '@/shared/components/detail/DetailSection.vue'
import TagList from '@/shared/components/ui/TagList.vue'
import type { DetailItem } from '@/shared/types'
import { formatDateTime } from '@/shared/utils/format-date'

const props = defineProps<SingleTemplateRes>()

const meta = computed<DetailItem[]>(() => [
  { label: 'Created', value: formatDateTime(props.createdAt) },
  { label: 'Updated', value: formatDateTime(props.updatedAt) },
])

const groups = computed(() =>
  props.groups.map((group) => ({
    header: group.header,
    fields: group.fields.map((field) => ({
      label: field.label,
      value: field.type,
    })),
  }))
)
</script>

<template>
  <DetailList :items="meta" />

  <DetailSection title="Tags">
    <TagList :tags="props.tags" />
  </DetailSection>

  <DetailSection title="Groups">
    <DetailCard v-for="(group, index) in groups" :key="index" :title="group.header">
      <DetailList :items="group.fields" />
    </DetailCard>
  </DetailSection>
</template>
