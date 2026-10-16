<script setup lang="ts"></script>

<template>
  <header>
    <h2>griffin</h2>
    <ul>
      <li><RouterLink to="/sites">Sites</RouterLink></li>
      <li><RouterLink to="/templates">Templates</RouterLink></li>
    </ul>
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
  background-color: var(--color-black);
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
  color: var(--color-white);
}

a.router-link-active {
  color: var(--color-orange);
}
</style>
