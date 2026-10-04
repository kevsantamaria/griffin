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
  height: 100vh;
  display: grid;
  place-content: center;
}

div {
  background-color: var(--color-white);
  padding: 3em 4em;
  border-radius: var(--border-radius);
}
</style>
