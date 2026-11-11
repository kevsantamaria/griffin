<script setup lang="ts">
import LoginForm from '@/features/auth/components/LoginForm.vue'
</script>

<template>
  <section>
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  </section>
</template>

<style lang="css" scoped>
section {
  display: grid;
  min-height: 100dvh;
  padding: var(--space-6);
  place-items: center;
}

div {
  width: min(100%, 22rem);
  padding: var(--space-8);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}

h1 {
  text-align: center;
}
</style>
