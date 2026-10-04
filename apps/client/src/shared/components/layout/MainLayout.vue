<template>
  <header><h2>credentils-manager</h2></header>
  <main>
    <slot></slot>
  </main>
  <footer>credentials manager footer</footer>
</template>

<style scoped>
main {
  background-color: #222;
  color: #eee;
  display: grid;
  place-content: center;
  height: 100vh;
}
</style>
