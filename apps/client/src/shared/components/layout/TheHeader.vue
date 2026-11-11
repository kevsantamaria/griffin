<script setup lang="ts">
import { useAuth } from '@/features/auth/composables/use-auth'

const { me } = useAuth()
const { data: user } = me
</script>

<template>
  <header>
    <h2>griffin</h2>
    <ul>
      <li><RouterLink to="/">Sites</RouterLink></li>
      <li><RouterLink to="/templates">Templates</RouterLink></li>
    </ul>
    <RouterLink v-if="user" class="user" to="/profile">
      <span aria-hidden="true">👤</span>
      <span>{{ user.username }}</span>
    </RouterLink>
  </header>
</template>

<style lang="css" scoped>
header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  gap: var(--space-4);
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}

h2 {
  margin: 0;
  font-size: 1rem;
  letter-spacing: 0.04em;
}

ul {
  display: flex;
  gap: var(--space-6);
}

a {
  color: var(--color-muted);
  font-size: 0.875rem;
  transition: color 0.15s ease;
}

a:hover {
  color: var(--color-foreground);
}

a.router-link-active {
  color: var(--color-primary);
}

.user {
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
  color: var(--color-foreground);
}

.user:hover {
  color: var(--color-primary);
}
</style>
