# HoverUnderline

## 
 <HoverUnderline/>

## 
 ```vue
<script setup lang="ts"></script>

<template>
  <div class="hover-underline">
    <h1 class="title">
      <span>
        这是一段很长的文本 很长 很长 很长~~~~~~这是一段很长的文本 很长 很长 很长~~~~~~这是一段很长的文本 很长 很长 很长~~~~~~这是一段很长的文本 很长 很长 很长~~~~~~
      </span>
    </h1>
  </div>
</template>

<style scoped lang="scss">
.hover-underline {
  .title {
    color: #333;
    line-height: 2;

    span {
      background: linear-gradient(to right, #83a4d4, #b6fbff) right bottom no-repeat;
      background-size: 0 6px;
      transition: background-size 1300ms;
    }

    &:hover span {
      transition: background-size 0ms;
      background-size: 100% 6px;
    }
  }
}
</style>

```