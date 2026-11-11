<script setup lang="ts">
import { onMounted, ref, useId, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    message?: string
    confirmLabel?: string
    cancelLabel?: string
    pending?: boolean
  }>(),
  {
    message: '',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    pending: false,
  }
)

const emit = defineEmits<{ confirm: [] }>()

const open = defineModel<boolean>('open', { default: false })
const id = useId()
const dialog = ref<HTMLDialogElement | null>(null)

function show() {
  if (open.value && dialog.value && !dialog.value.open) dialog.value.showModal()
}

function close() {
  open.value = false
}

function onClose() {
  open.value = false
}

function onBackdropClick(event: MouseEvent) {
  if (event.target === dialog.value) close()
}

watch(open, (value) => {
  if (value) show()
  else if (dialog.value?.open) dialog.value.close()
})

onMounted(show)
</script>

<template>
  <dialog
    ref="dialog"
    class="confirm-dialog"
    :aria-labelledby="`${id}-title`"
    :aria-describedby="props.message ? `${id}-message` : undefined"
    @close="onClose"
    @click="onBackdropClick"
  >
    <div class="dialog-content">
      <h2 :id="`${id}-title`">{{ props.title }}</h2>
      <p v-if="props.message" :id="`${id}-message`">{{ props.message }}</p>

      <slot />

      <div class="dialog-actions">
        <button
          type="button"
          class="dialog-button dialog-button--cancel"
          :disabled="props.pending"
          @click="close"
        >
          {{ props.cancelLabel }}
        </button>
        <button
          type="button"
          class="dialog-button dialog-button--danger"
          :disabled="props.pending"
          @click="emit('confirm')"
        >
          {{ props.pending ? 'Deleting…' : props.confirmLabel }}
        </button>
      </div>
    </div>
  </dialog>
</template>

<style lang="css" scoped>
.confirm-dialog {
  position: fixed;
  inset: 0;
  margin: auto;
  width: min(100% - 2rem, 26rem);
  max-height: 85dvh;
  padding: 0;
  overflow: auto;
  color: var(--color-foreground);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}

.confirm-dialog::backdrop {
  background-color: rgb(0 0 0 / 60%);
}

.dialog-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-6);
}

h2 {
  margin: 0;
  font-size: 1.05rem;
}

p {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.875rem;
  overflow-wrap: anywhere;
}

.dialog-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
}

.dialog-button {
  padding: 0.55rem 1rem;
  color: var(--color-white);
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: var(--border-radius);
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

.dialog-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.dialog-button--cancel {
  background-color: var(--color-surface);
}

.dialog-button--cancel:hover:not(:disabled) {
  background-color: var(--color-border);
}

.dialog-button--danger {
  background-color: var(--color-danger);
}

.dialog-button--danger:hover:not(:disabled) {
  filter: brightness(1.08);
}
</style>
