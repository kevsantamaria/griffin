<script setup lang="ts">
import { ref } from 'vue'

import Button from '@/shared/components/ui/Button.vue'
import Input from '@/shared/components/ui/Input.vue'

import { useAuth } from '../composables/use-auth'

const { login } = useAuth()
const { mutateAsync, isPending, isError, error } = login

const username = ref('')
const password = ref('')

const submit = () => {
  mutateAsync({ username: username.value, password: password.value })
}
</script>

<template>
  <form @submit.prevent="submit">
    <Input v-model="username" type="text" placeholder="Enter username" />
    <Input v-model="password" type="password" placeholder="******" />
    <Button :disabled="isPending">
      {{ isPending ? '⏳ Login' : 'Login' }}
    </Button>
    <p v-if="isError && error" class="error">{{ error.message }}</p>
  </form>
</template>

<style lang="css" scoped>
.error {
  color: var(--color-danger);
  font-size: 0.9em;
  text-align: center;
}
</style>
