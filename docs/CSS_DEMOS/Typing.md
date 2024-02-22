# Typing

## 
 <Typing/>

## 
 ```vue
<script setup lang="ts"></script>

<template>
  <div class="typing">
    <div class="hello-world">Hello World!</div>
  </div>
</template>

<style scoped lang="scss">
.typing {
  .hello-world {
    box-sizing: content-box;
    width: 12ch;
    overflow: hidden;
    white-space: nowrap;
    animation: typing 4s steps(12), blink 0.5s step-end infinite alternate;
    border-right: 5px solid black;
    font-family: monospace;
    font-size: 2em;
  }
  @keyframes typing {
    from {
      width: 0;
    }
  }
  @keyframes blink {
    50% {
      border-color: transparent;
    }
  }
}
</style>

```