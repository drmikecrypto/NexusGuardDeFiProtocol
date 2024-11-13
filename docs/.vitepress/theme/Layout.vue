<!-- docs/.vitepress/theme/Layout.vue -->
<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Layout>
    <template #layout-top>
      <div v-if="frontmatter.hero" class="custom-hero">
        <!-- Custom hero content -->
      </div>
    </template>
    <template #aside-outline-before>
      <!-- Custom sidebar content -->
    </template>
    <template #doc-footer-before>
      <div class="doc-footer-nav">
        <!-- Custom navigation -->
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.custom-hero {
  padding: 4rem 2rem;
  text-align: center;
  background: var(--vp-c-bg-soft);
}

.doc-footer-nav {
  margin-top: 4rem;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1rem;
}
</style>
