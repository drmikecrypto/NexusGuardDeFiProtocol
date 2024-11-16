<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vitepress'

interface NavItem {
  text: string
  link: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

const route = useRoute()
const emits = defineEmits(['close'])
const searchQuery = ref('')
const activeTab = ref('menu')
const isAnimating = ref(false)

// Touch handling
const touchStart = ref({ x: 0, y: 0 })
const touchEnd = ref({ x: 0, y: 0 })
const menuRef = ref<HTMLElement | null>(null)

const handleTouchStart = (e: TouchEvent) => {
  touchStart.value = {
    x: e.touches[0].clientX,
    y: e.touches[0].clientY
  }
}

const handleTouchMove = (e: TouchEvent) => {
  touchEnd.value = {
    x: e.touches[0].clientX,
    y: e.touches[0].clientY
  }
}

const handleTouchEnd = () => {
  const diffX = touchStart.value.x - touchEnd.value.x
  const diffY = touchStart.value.y - touchEnd.value.y

  if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
    closeMenu()
  }
}

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeMenu()
  }
}

const closeMenu = () => {
  if (isAnimating.value) return
  
  isAnimating.value = true
  if (menuRef.value) {
    menuRef.value.classList.add('slide-out')
    setTimeout(() => {
      isAnimating.value = false
      emits('close')
    }, 300)
  }
}

// Focus trap
const handleFocusTrap = (e: KeyboardEvent) => {
  if (!menuRef.value || e.key !== 'Tab') return

  const focusableElements = menuRef.value.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

  if (e.shiftKey) {
    if (document.activeElement === firstElement) {
      e.preventDefault()
      lastElement.focus()
    }
  } else {
    if (document.activeElement === lastElement) {
      e.preventDefault()
      firstElement.focus()
    }
  }
}

const navItems: NavSection[] = [
  {
    title: 'Documentation',
    items: [
      { text: 'Getting Started', link: '/introduction/' },
      { text: 'Architecture', link: '/protocol/architecture' },
      { text: 'Components', link: '/protocol/components' }
    ]
  },
  {
    title: 'Protocol',
    items: [
      { text: 'Risk Engine', link: '/technical/risk-engine' },
      { text: 'Smart Contracts', link: '/technical/smart-contracts' }
    ]
  }
]

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})

watch(() => route.path, closeMenu)
</script>

<template>
  <div 
    ref="menuRef"
    class="mobile-menu-container"
    role="dialog"
    aria-modal="true"
    aria-label="Mobile navigation menu"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @keydown="handleFocusTrap"
  >
    <div class="mobile-menu-backdrop" @click="closeMenu"></div>
    <div class="mobile-menu-content">
      <div class="mobile-menu-header">
        <div 
          class="mobile-menu-tabs"
          role="tablist"
          aria-label="Menu sections"
        >
          <button 
            :class="['tab-button', { active: activeTab === 'menu' }]"
            @click="activeTab = 'menu'"
            role="tab"
            aria-controls="menu-panel"
            :aria-selected="activeTab === 'menu'"
            id="menu-tab"
          >
            <span class="icon">☰</span>
            Menu
          </button>
          <button 
            :class="['tab-button', { active: activeTab === 'search' }]"
            @click="activeTab = 'search'"
            role="tab"
            aria-controls="search-panel"
            :aria-selected="activeTab === 'search'"
            id="search-tab"
          >
            <span class="icon">🔍</span>
            Search
          </button>
        </div>
        <button 
          class="close-button"
          @click="closeMenu"
          aria-label="Close menu"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </div>

      <div 
        v-show="activeTab === 'menu'"
        id="menu-panel"
        role="tabpanel"
        aria-labelledby="menu-tab"
        class="tab-panel"
      >
        <nav aria-label="Mobile navigation">
          <div 
            v-for="section in navItems" 
            :key="section.title"
            class="nav-section"
          >
            <h3 class="nav-section-title">{{ section.title }}</h3>
            <ul class="nav-items" role="list">
              <li v-for="item in section.items" :key="item.text">
                <a 
                  :href="item.link"
                  :class="{ active: route.path === item.link }"
                  :aria-current="route.path === item.link ? 'page' : undefined"
                  @click="closeMenu"
                >
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div 
        v-show="activeTab === 'search'"
        id="search-panel"
        role="tabpanel"
        aria-labelledby="search-tab"
        class="tab-panel"
      >
        <div class="search-container">
          <div class="search-input-wrapper">
            <span class="search-icon" aria-hidden="true">🔍</span>
            <input
              type="search"
              v-model="searchQuery"
              placeholder="Search documentation..."
              aria-label="Search documentation"
              class="search-input"
            >
          </div>
        </div>
      </div>

      <div class="mobile-menu-footer">
        <div class="social-links" role="list">
          <a 
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <span class="icon">GitHub</span>
            <span class="sr-only">(opens in new window)</span>
          </a>
          <a 
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <span class="icon">Twitter</span>
            <span class="sr-only">(opens in new window)</span>
          </a>
          <a 
            href="https://discord.gg/yourinvite"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <span class="icon">Discord</span>
            <span class="sr-only">(opens in new window)</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mobile-menu-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  z-index: 100;
  animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.mobile-menu-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: -1;
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);
}

.mobile-menu-header {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 1rem;
  background: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mobile-menu-tabs {
  display: flex;
  gap: 0.5rem;
  padding: 0.25rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.tab-button {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tab-button.active {
  color: var(--vp-c-brand);
  background: var(--vp-c-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tab-button:hover:not(.active) {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-mute);
}

.close-button {
  width: 36px;
  height: 36px;
  border: none;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: var(--vp-c-bg-mute);
  transform: rotate(90deg);
}

.tab-panel {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

/* ... rest of the styles remain the same ... */

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

.slide-out {
  animation: slideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  .mobile-menu-container,
  .slide-out,
  .close-button,
  .tab-button {
    animation: none;
    transition: none;
  }
}
</style>
