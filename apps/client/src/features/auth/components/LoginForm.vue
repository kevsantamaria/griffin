<script setup lang="ts">
import { useForm } from '@tanstack/vue-form'

import Button from '@/shared/components/ui/Button.vue'

import { useAuth } from '../composables/use-auth'
import type { LoginParams } from '../types'

const { login } = useAuth()
const { mutateAsync, isPending, isError, error } = login

const loginDefault: LoginParams = {
  username: '',
  password: '',
}

const form = useForm({
  defaultValues: loginDefault,
  onSubmit: async ({ value }) => {
    mutateAsync(value)
  },
})
</script>

<template>
  <form
    @submit="
      (e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }
    "
  >
    <form.Field name="username">
      <template v-slot="{ field }">
        <input
          :id="field.name"
          :name="field.name"
          :value="field.state.value"
          placeholder="Username"
          class="input-element"
          @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
        />
      </template>
    </form.Field>

    <form.Field name="password">
      <template v-slot="{ field }">
        <input
          :id="field.name"
          :name="field.name"
          :value="field.state.value"
          type="password"
          placeholder="******"
          class="input-element"
          @input="(e) => field.handleChange((e.target as HTMLInputElement).value)"
        />
      </template>
    </form.Field>

    <Button :disabled="isPending">
      {{ isPending ? '⏳ Login' : 'Login' }}
    </Button>
    <p v-if="isError && error" class="field-error">{{ error.message }}</p>
  </form>
</template>

<style lang="css" scoped></style>
