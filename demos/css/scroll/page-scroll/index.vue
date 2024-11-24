<template>
  <div class="scroll-container">
    <div class="section section-1 bg-slate-600">
      第一屏内容
    </div>
    <div class="section section-2 bg-blue-600">
      第二屏内容
    </div>
  </div>
</template>

<style scoped>
.scroll-container {
  height: 50vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
}

.section {
  height: 50vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* 隐藏滚动条但保持功能 */
.scroll-container {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE and Edge */
}

.scroll-container::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}
</style>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const container = document.querySelector('.scroll-container')

  // 添加平滑滚动效果
  container.style.scrollBehavior = 'smooth'

  // 防止中间停留
  let isScrolling
  container.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling)
    isScrolling = setTimeout(() => {
      const scrollTop = container.scrollTop
      const windowHeight = window.innerHeight
      const snapPoint = Math.round(scrollTop / windowHeight) * windowHeight

      if (scrollTop !== snapPoint) {
        container.scrollTo({
          top: snapPoint,
          behavior: 'smooth'
        })
      }
    }, 50)
  })
})
</script>