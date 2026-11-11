<script setup lang="ts">
import { onScopeDispose, ref, watch } from 'vue'
import IconSearch from '~icons/andrsrxn/search'

const props = withDefaults(
  defineProps<{
    id: string
    label: string
    placeholder: string
    debounce?: number
  }>(),
  {
    debounce: 200,
  }
)

const model = defineModel<string>({ default: '' })

const draft = ref(model.value)
let timer: ReturnType<typeof setTimeout> | undefined

watch(model, (value) => {
  if (value !== draft.value) draft.value = value
})

watch(draft, (value) => {
  clearTimeout(timer)

  if (props.debounce <= 0) {
    model.value = value
    return
  }

  timer = setTimeout(() => {
    model.value = value
  }, props.debounce)
})

onScopeDispose(() => clearTimeout(timer))

function clear() {
  clearTimeout(timer)
  draft.value = ''
  model.value = ''
}
</script>

<template>
  <div class="search-bar" role="search">
    <label class="search-label" :for="props.id">{{ props.label }}</label>

    <div class="search-field">
      <IconSearch class="search-icon" aria-hidden="true" />
      <input
        :id="props.id"
        v-model="draft"
        class="input-element"
        type="search"
        name="q"
        autocomplete="off"
        enterkeyhint="search"
        :placeholder="props.placeholder"
        @keydown.esc="clear"
      />
      <button
        v-if="draft"
        type="button"
        class="search-clear"
        aria-label="Clear search"
        @click="clear"
      >
        ×
      </button>
    </div>
  </div>
</template>

<style lang="css" scoped>
.search-bar {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
}

.search-label {
  color: var(--color-muted);
  font-size: 0.875rem;
}

.search-field {
  position: relative;
}

.search-field input {
  padding-right: 2.5rem;
  padding-left: 2.1rem;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 0.6rem;
  display: block;
  width: 1rem;
  height: 1rem;
  color: var(--color-muted);
  pointer-events: none;
  transform: translateY(-50%);
}

.search-field input::-webkit-search-cancel-button {
  appearance: none;
}

.search-clear {
  position: absolute;
  top: 50%;
  right: 0.5rem;
  padding: 0.25rem 0.5rem;
  color: var(--color-muted);
  font-size: 1rem;
  line-height: 1;
  background: none;
  border: 0;
  transform: translateY(-50%);
  cursor: pointer;
}

.search-clear:hover {
  color: var(--color-foreground);
}
</style>
