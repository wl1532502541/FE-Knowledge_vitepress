# HoverMe

## 
 <HoverMe/>

## 
 ```vue
<script setup lang="ts"></script>

<template>
  <div class="hover-me">
    <div class="wrapper">
      <h1>Hover Me</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hover-me {
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h1 {
    cursor: pointer;
    position: relative;
  }
  h1::before {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    block-size: 100%;
    background: hsl(200 100% 80%);
    z-index: -1;
    transition: transform 0.3s ease;
    transform: scaleX(0);
    transform-origin: right;
  }
  h1:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }
}
</style>

```