<script setup lang="ts"></script>

<template>
  <div class="glimmer">
    <div class="glimmer-item green"></div>
    <div class="glimmer-item red"></div>
  </div>
</template>

<style scoped lang="scss">
.glimmer {
  display: flex;
  justify-content: space-around;
  width: 100%;

  .glimmer-item {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    animation: pulse 1s infinite linear;

    &.green {
      --glimmer-color: green;
    }

    &.red {
      --glimmer-color: red;
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 10px var(--glimmer-color);
    }

    50% {
      box-shadow: 0 0 50px var(--glimmer-color);
    }

    100% {
      box-shadow: 0 0 10px var(--glimmer-color);
    }
  }
}
</style>
