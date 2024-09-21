<script setup>
import DefaultTheme from 'vitepress/theme'
import CommentGiscus from './components/CommentGiscus.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <CommentGiscus />
    </template>
  </Layout>
</template>