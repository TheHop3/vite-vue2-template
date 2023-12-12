<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup></script>

<style lang="scss">
@media (width >= 1024px) {
  .about {
    display: flex;
    align-items: center;
    min-height: 100vh;

    h1 {
      color: red;
    }
  }
}
</style>
