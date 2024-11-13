<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed } from 'vue'
import type { Theme } from 'vitepress'

const { Layout } = DefaultTheme
const { frontmatter, theme, page } = useData()
const route = useRoute()

const isHomePage = computed(() => route.path === '/')
const showHero = computed(() => frontmatter.value.hero && isHomePage.value)
const showFeatures = computed(() => frontmatter.value.features && isHomePage.value)
const showFooter = computed(() => theme.value.footer && !frontmatter.value.footer)

// Custom classes for different page types
const pageClasses = computed(() => ({
  'theme-default': true,
  'page-home': isHomePage.value,
  'page-doc': !isHomePage.value,
  [`page-${frontmatter.value.pageClass}`]: frontmatter.value.pageClass
}))
</script>

<template>
  <Layout>
    <template #layout-top>
      <div v-if="showHero" class="custom-hero">
        <div class="container">
          <h1 class="hero-title">{{ frontmatter.hero.name }}</h1>
          <p class="hero-description">{{ frontmatter.hero.tagline }}</p>
          
          <div v-if="frontmatter.hero.actions" class="hero-actions">
            <a 
              v-for="action in frontmatter.hero.actions"
              :key="action.link"
              :href="action.link"
              :class="['hero-action', `hero-action-${action.theme}`]"
            >
              {{ action.text }}
            </a>
          </div>

          <div v-if="frontmatter.hero.image" class="hero-image">
            <img 
              :src="frontmatter.hero.image.src"
              :alt="frontmatter.hero.image.alt"
            >
          </div>
        </div>
      </div>

      <div v-if="showFeatures" class="features">
        <div class="container">
          <div class="features-grid">
            <div 
              v-for="feature in frontmatter.features"
              :key="feature.title"
              class="feature-item"
            >
              <span v-if="feature.icon" class="feature-icon">{{ feature.icon }}</span>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-details">{{ feature.details }}</p>
              <a 
                v-if="feature.link"
                :href="feature.link"
                class="feature-link"
              >
                {{ feature.linkText || 'Learn more →' }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #aside-outline-before>
      <div v-if="page.frontmatter.sidebar" class="custom-sidebar">
        <slot name="sidebar-top" />
      </div>
    </template>

    <template #doc-footer-before>
      <div class="doc-footer-nav">
        <div v-if="page.lastUpdated" class="last-updated">
          Last updated: {{ new Date(page.lastUpdated).toLocaleDateString() }}
        </div>
        <div v-if="page.editLink" class="edit-link">
          <a :href="page.editLink" target="_blank" rel="noopener">
            {{ theme.editLink?.text || 'Edit this page' }}
          </a>
        </div>
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

.hero-title {
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  max-width: 780px;
  margin: 0 auto 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.hero-action {
  display: inline-block;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.25s;
  text-decoration: none;
}

.hero-action-brand {
  background: var(--vp-c-brand);
  color: white;
}

.hero-action-alt {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand);
  border: 1px solid var(--vp-c-brand);
}

.hero-image {
  margin-top: 4rem;
}

.hero-image img {
  max-width: 200px;
  height: auto;
}

.features {
  padding: 4rem 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-item {
  padding: 2rem;
  background: var(--vp-c-bg);
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-icon {
  display: inline-block;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}

.feature-details {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.feature-link {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
}

.doc-footer-nav {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.last-updated {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.edit-link a {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .doc-footer-nav {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
