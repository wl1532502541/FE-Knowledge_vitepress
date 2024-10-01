<template>
  <div>
    <NSwitch ref="switchRef" :value="isDarkMode" @update:value="handleChange">toggle</NSwitch>
  </div>
</template>
<script setup>
import {
  ref
} from 'vue';
import { useData } from 'vitepress'
import { useToggle } from '@vueuse/core';
const { isDark } = useData();
const isDarkMode = isDark;
const switchRef = ref()
const toggleDark = useToggle(isDarkMode);
const handleChange = async (mode) => {
  /**
       * Return early if View Transition API is not supported
       * or user prefers reduced motion
       */
  if (
    !document.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    toggleDark()
    return;
  }

  await document.startViewTransition(() => {
    // setTimeout(() => {
    toggleDark()
    // }, 0)
  }).ready;
  const { top, left } = switchRef.value.$el.getBoundingClientRect();
  const x = left;
  const y = top;
  const right = window.innerWidth - left;
  const bottom = window.innerHeight - top;
  // Calculates the radius of circle that can cover the screen
  const maxRadius = Math.hypot(
    Math.max(left, right),
    Math.max(top, bottom),
  );

  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${maxRadius}px at ${x}px ${y}px)`,
      ],
    },
    {
      duration: 500,
      easing: 'ease-in-out',
      pseudoElement: '::view-transition-new(root)',
    }
  );
}
</script>
<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
</style>