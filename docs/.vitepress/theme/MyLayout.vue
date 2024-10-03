<script setup>
import DefaultTheme from 'vitepress/theme'
import CommentGiscus from './components/CommentGiscus.vue'
import { NConfigProvider, darkTheme } from 'naive-ui'
import { useData } from 'vitepress';

const { isDark } = useData()

const { Layout } = DefaultTheme
</script>

<template>
  <NConfigProvider :theme="isDark ? darkTheme : null">
    <Layout>
      <template #doc-after>
        <CommentGiscus />
      </template>
    </Layout>
  </NConfigProvider>
</template>