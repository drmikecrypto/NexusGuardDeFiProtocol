<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, onMounted, ref, watch, onBeforeUnmount } from 'vue'
import type { Theme } from 'vitepress'
import MobileMenu from './components/MobileMenu.vue'
import ProtocolMetrics from './components/ProtocolMetrics.vue'
import Roadmap from './components/Roadmap.vue'
import Partners from './components/Partners.vue'
import Features from './components/Features.vue'

// Setup VitePress data
const { Layout } = DefaultTheme
const { frontmatter, theme, page } = useData()
const route = useRoute()

// Core computations
const isHomePage = computed(() => route.path === '/')
const showHero = computed(() => frontmatter.value.hero && isHomePage.value)
const showFeatures = computed(() => frontmatter.value.features && isHomePage.value)
const showFooter = computed(() => theme.value.footer && !frontmatter.value.footer)

// Interactive and accessibility features
const isHeaderVisible = ref(true)
const lastScrollPosition = ref(0)
const headerHeight = ref(0)
const scrollProgress = ref(0)
const activeSection = ref('')
const isDarkMode = ref(false)
const isMobileMenuOpen = ref(false)
const isReducedMotion = ref(false)
const skipToMainRef = ref<HTMLAnchorElement | null>(null)

// Mobile detection
const isMobile = ref(false)
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

// Update section tracking
const updateActiveSection = () => {
  const sections = document.querySelectorAll('.content-section')
  let found = false

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect()
    if (!found && rect.top <= 100 && rect.bottom >= 100) {
      activeSection.value = section.id
      found = true
      announceSection(section.getAttribute('aria-label') || section.id)
    }
  })
}

// Section observer setup
const setupSectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const element = entry.target as HTMLElement
        if (entry.isIntersecting) {
          element.classList.add('visible')
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '-20% 0px -20% 0px'
    }
  )

  document.querySelectorAll('.content-section').forEach(section => {
    observer.observe(section)
  })

  return observer
}

// Scroll handling with debounce
let scrollTimeout: number
const handleScroll = () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout)
  }

  scrollTimeout = window.requestAnimationFrame(() => {
    const currentScroll = window.pageYOffset
    isHeaderVisible.value = currentScroll < lastScrollPosition.value || currentScroll < headerHeight.value
    lastScrollPosition.value = currentScroll

    // Calculate scroll progress
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = (currentScroll / windowHeight) * 100

    // Update active section
    updateActiveSection()
  })
}

// Keyboard navigation
const handleKeyboard = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    isMobileMenuOpen.value = false
  }

  if (isMobileMenuOpen.value && event.key === 'Tab') {
    trapFocus(event)
  }
}

// Focus trap
const trapFocus = (event: KeyboardEvent) => {
  const modal = document.querySelector('.mobile-menu')
  if (!modal) return

  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstFocusable = focusableElements[0] as HTMLElement
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

  if (event.shiftKey) {
    if (document.activeElement === firstFocusable) {
      lastFocusable.focus()
      event.preventDefault()
    }
  } else {
    if (document.activeElement === lastFocusable) {
      firstFocusable.focus()
      event.preventDefault()
    }
  }
}

// Screen reader announcements
const announceSection = (sectionName: string) => {
  const announcer = document.getElementById('announcer')
  if (announcer) {
    announcer.textContent = `Navigated to ${sectionName} section`
  }
}

// Smooth scroll with reduced motion support
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId)
  if (section) {
    if (isReducedMotion.value) {
      section.scrollIntoView()
    } else {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    section.focus({ preventScroll: true })
  }
}

// Mobile menu handling
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
    // Focus first interactive element
    setTimeout(() => {
      const firstFocusable = document.querySelector('.mobile-menu button') as HTMLElement
      if (firstFocusable) firstFocusable.focus()
    }, 100)
  } else {
    document.body.style.overflow = ''
  }
}

// Theme toggle
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('vitepress-theme', isDarkMode.value ? 'dark' : 'light')
  announceSection(`Switched to ${isDarkMode.value ? 'dark' : 'light'} mode`)
}

// Check accessibility preferences
const checkReducedMotion = () => {
  isReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Lifecycle hooks
onMounted(() => {
  const observer = setupSectionObserver()
  headerHeight.value = document.querySelector('.VPNav')?.offsetHeight || 0
  
  // Event listeners
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeyboard)
  window.addEventListener('resize', checkMobile)
  
  // Initial checks
  checkMobile()
  checkReducedMotion()
  isDarkMode.value = document.documentElement.classList.contains('dark')

  // Cleanup
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('keydown', handleKeyboard)
    window.removeEventListener('resize', checkMobile)
    observer.disconnect()
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout)
    }
  })
})

// Watch for route changes to close mobile menu
watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false
    document.body.style.overflow = ''
  }
)
</script>

<template>
  <!-- Skip to main content link -->
  <a 
    ref="skipToMainRef"
    href="#main-content"
    class="skip-to-main"
    @click="scrollToSection('main-content')"
  >
    Skip to main content
  </a>

  <!-- Screen reader announcements -->
  <div 
    id="announcer" 
    class="sr-only" 
    aria-live="polite" 
    aria-atomic="true"
  ></div>

  <Layout>
    <!-- Progress bar -->
    <div 
      class="scroll-progress" 
      :style="{ width: `${scrollProgress}%` }"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="scrollProgress"
    />

    <!-- Mobile menu button -->
    <button
      class="mobile-menu-toggle"
      :aria-expanded="isMobileMenuOpen"
      aria-controls="mobile-menu"
      @click="toggleMobileMenu"
      v-if="isMobile"
    >
      <span class="sr-only">Toggle menu</span>
      <span class="menu-icon" aria-hidden="true"></span>
    </button>

    <!-- Mobile menu -->
    <div
      v-if="isMobile && isMobileMenuOpen"
      id="mobile-menu"
      class="mobile-menu"
      :class="{ 'is-open': isMobileMenuOpen }"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <MobileMenu @close="toggleMobileMenu" />
    </div>

    <!-- Theme toggle -->
    <button 
      class="theme-toggle"
      @click="toggleTheme"
      :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <span class="sr-only">
        {{ isDarkMode ? 'Switch to light mode' : 'Switch to dark mode' }}
      </span>
      <span aria-hidden="true">{{ isDarkMode ? '🌞' : '🌙' }}</span>
    </button>

    <!-- Main content -->
    <template #layout-top>
      <div 
        v-if="showHero" 
        class="custom-hero content-section"
        :class="{ 'header-hidden': !isHeaderVisible }"
        id="hero"
      >
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
              loading="eager"
            >
          </div>
        </div>
      </div>

      <div 
        v-if="showFeatures" 
        class="features content-section" 
        id="features"
      >
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

      <div v-if="isHomePage" class="home-sections">
        <ProtocolMetrics 
          class="metrics-section content-section" 
          id="metrics" 
        />
        <Roadmap 
          class="roadmap-section content-section" 
          id="roadmap" 
        />
        <Partners 
          class="partners-section content-section" 
          id="partners" 
        />
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
/* Base styles */
.container {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 2rem;
  width: 100%;
}

/* Accessibility styles */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.skip-to-main {
  position: fixed;
  top: -100%;
  left: 0;
  z-index: 100;
  padding: 1rem;
  background: var(--vp-c-brand);
  color: white;
  text-decoration: none;
  transition: top 0.3s;
}

.skip-to-main:focus {
  top: 0;
}

/* Progress bar */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: var(--vp-c-brand);
  z-index: 100;
  transition: width 0.2s;
}

/* Theme toggle */
.theme-toggle {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  cursor: pointer;
  z-index: 90;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Hero section */
.custom-hero {
  padding: 6rem 2rem 4rem;
  text-align: center;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  transition: transform 0.3s ease;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--vp-c-text-1);
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  background: linear-gradient(45deg, var(--vp-c-brand), var(--vp-c-brand-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-description {
  font-size: 1.4rem;
  color: var(--vp-c-text-2);
  max-width: 780px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.hero-action {
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.25s ease;
  text-decoration: none;
  font-size: 1.1rem;
}

.hero-action-brand {
  background: var(--vp-c-brand);
  color: white;
}

.hero-action-brand:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-2px);
}

.hero-action-alt {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand);
  border: 1px solid var(--vp-c-brand);
}

.hero-action-alt:hover {
  color: var(--vp-c-brand-dark);
  border-color: var(--vp-c-brand-dark);
  transform: translateY(-2px);
}

.hero-image {
  margin-top: 4rem;
}

.hero-image img {
  max-width: 200px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease;
}

.hero-image img:hover {
  transform: scale(1.05);
}

/* Features section */
.features {
  padding: 4rem 2rem;
  background: var(--vp-c-bg);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-item {
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid var(--vp-c-divider);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.feature-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border-color: var(--vp-c-brand);
}

.feature-icon {
  display: inline-block;
  font-size: 2.5rem;
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
  flex-grow: 1;
}

.feature-link {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  margin-top: auto;
  transition: all 0.3s ease;
}

.feature-link:hover {
  color: var(--vp-c-brand-dark);
  transform: translateX(4px);
}

/* Home sections */
.home-sections {
  animation: fadeIn 0.8s ease-out;
}

.content-section {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.content-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.metrics-section,
.roadmap-section,
.partners-section {
  padding: 4rem 0;
  border-top: 1px solid var(--vp-c-divider);
}

/* Mobile menu */
.mobile-menu-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 100;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.menu-icon {
  width: 24px;
  height: 2px;
  background: var(--vp-c-text-1);
  position: relative;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: var(--vp-c-text-1);
  transition: all 0.3s ease;
}

.menu-icon::before {
  top: -8px;
}

.menu-icon::after {
  bottom: -8px;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: var(--vp-c-bg);
  z-index: 99;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.mobile-menu.is-open {
  transform: translateX(0);
}

/* Footer */
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
  transition: color 0.25s;
}

.edit-link a:hover {
  color: var(--vp-c-brand-dark);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .container {
    padding: 0 1.5rem;
  }
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }

  .theme-toggle {
    bottom: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
  }

  .hero-title {
    font-size: 2.5rem;
    padding: 0 1rem;
  }

  .hero-description {
    font-size: 1.1rem;
    padding: 0 1rem;
  }

  .hero-actions {
    flex-direction: column;
    padding: 0 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .doc-footer-nav {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .custom-hero {
    padding: 4rem 1rem 2rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-image img {
    max-width: 150px;
  }

  .container {
    padding: 0 1rem;
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* High contrast mode support */
@media (forced-colors: active) {
  .hero-action {
    border: 2px solid currentColor;
  }

  .feature-item {
    border: 1px solid currentColor;
  }
}
</style>
