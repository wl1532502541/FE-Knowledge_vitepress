# steam-card

## 
 <steam-card/>

## 
 ```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const card = ref()
onMounted(() => {
  card.value.addEventListener('mousemove', (e) => {
    const cardHeight = card.value.offsetHeight;
    const cardWidth = card.value.offsetWidth;
    const { offsetX, offsetY } = e;
    const hightlightValue = 1.5 - 1 * (offsetY / cardHeight);
    card.value.style.setProperty('--brightness', hightlightValue)
    let rotateYValue = Math.floor(-20 + 40 * (offsetX / cardWidth));
    let rotateXValue = Math.floor(20 - 40 * (offsetY / cardHeight));
    card.value.style.setProperty('--rotateX', `${rotateXValue}deg`)
    card.value.style.setProperty('--rotateY', `${rotateYValue}deg`)
  })
  card.value.addEventListener('mouseleave', (e) => {
    card.value.style.setProperty('--brightness', 1)
    card.value.style.setProperty('--rotateX', 0)
    card.value.style.setProperty('--rotateY', 0)
  })
})
</script>

<template>
  <div class="card-container">
    <img class="card" src="./steam-card.png" ref="card" />
  </div>
</template>

<style scoped lang="scss">
.card-container {
  perspective: 200px;
  width: fit-content;

  .card {
    width: 200px;
    --brightness: 1;
    --rotateX: 0deg;
    --rotateY: 0deg;
    filter: brightness(var(--brightness));
    transform: rotateX(var(--rotateX, 0)) rotateY(var(--rotateY, 0));
    border-radius: 5% / 3.5%;

    transition: transform 0.1s ease,
      box-shadow 0.2s ease,
      scale 0.2s ease;
    scale: 1;

    &:hover {
      box-shadow: 0 20px 40px black;
      scale: 1.5;
      cursor: pointer;
    }
  }

}
</style>

```