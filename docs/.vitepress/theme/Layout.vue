<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, onMounted, ref, watch, onBeforeUnmount, Teleport } from 'vue'
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
  
  <!-- Main content if no error -->
  <div v-else>
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
    <Teleport to="body">
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
    </Teleport>

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
      <main id="main-content">
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
            <Features :features="frontmatter.features" />
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
      </main>
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
</div>
</template>

<style scoped>
  .error-boundary {
  padding: 20px;
  color: red;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--vp-c-bg);
  z-index: 1000;
  overflow: auto;
}

/* Base styles */
.container {
  margin: 0 auto;
  max-width: var(--vp-content-width, 1200px);
  padding: 0 24px;
  width: 100%;
}

/* Accessibility */
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

/* Mobile menu */
.mobile-menu-toggle {
  position: fixed;
  top: 8px;
  right: 16px;
  z-index: 100;
  width: 40px;
  height: 40px;
  border: none;
  background: var(--vp-c-bg);
  border-radius: 8px;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.25s;
}

.menu-icon {
  width: 24px;
  height: 2px;
  background: var(--vp-c-text-1);
  position: relative;
  transition: background-color 0.25s;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: var(--vp-c-text-1);
  transition: transform 0.25s;
}

.menu-icon::before {
  transform: translateY(-8px);
}

.menu-icon::after {
  transform: translateY(8px);
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: var(--mobile-menu-width, 320px);
  background: var(--vp-c-bg);
  z-index: 99;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.mobile-menu.is-open {
  transform: translateX(0);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
}

/* Theme toggle */
.theme-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
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
  font-size: 1.2rem;
}

.theme-toggle:hover {
  transform: scale(1.1);
  border-color: var(--vp-c-brand);
}

/* Hero section */
.custom-hero {
  padding: calc(var(--vp-nav-height) + 48px) 24px 48px;
  background: var(--vp-c-bg-soft);
  text-align: center;
  border-bottom: 1px solid var(--vp-c-divider);
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  background: linear-gradient(120deg, var(--vp-c-brand), var(--vp-c-brand-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  max-width: 768px;
  margin: 0 auto 2rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-action {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.25s;
  text-decoration: none;
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

/* Content sections */
.content-section {
  padding: 64px 0;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.content-section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Footer */
.doc-footer-nav {
  margin-top: 64px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.last-updated {
  color: var(--vp-c-text-2);
}

.edit-link a {
  color: var(--vp-c-brand);
  text-decoration: none;
  transition: color 0.25s;
}

.edit-link a:hover {
  color: var(--vp-c-brand-dark);
}

/* Responsive design */
@media (max-width: 960px) {
  .container {
    padding: 0 16px;
  }
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }

  .theme-toggle {
    bottom: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
  }

  .custom-hero {
    padding: calc(var(--vp-nav-height) + 24px) 16px 32px;
  }

  .hero-actions {
    flex-direction: column;
    padding: 0 32px;
  }

  .doc-footer-nav {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}

/* Reduced motion */
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
</style>
