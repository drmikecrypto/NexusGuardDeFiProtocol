<!-- MobileMenu.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const emits = defineEmits(['close'])
const searchQuery = ref('')
const activeTab = ref('menu')

// Touch handling
const touchStart = ref({ x: 0, y: 0 })
const touchEnd = ref({ x: 0, y: 0 })

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

  // Check if horizontal swipe
  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 50) { // Swipe left
      emits('close')
    }
  }
}

// Navigation items with nesting
const navItems = [
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
  },
  // Add other navigation sections
]

watch(() => route.path, () => {
  emits('close')
})
</script>

<template>
  <div 
    class="mobile-menu-container"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div class="mobile-menu-header">
      <div class="mobile-menu-tabs">
        <button 
          :class="['tab-button', { active: activeTab === 'menu' }]"
          @click="activeTab = 'menu'"
          aria-controls="menu-panel"
          :aria-selected="activeTab === 'menu'"
        >
          Menu
        </button>
        <button 
          :class="['tab-button', { active: activeTab === 'search' }]"
          @click="activeTab = 'search'"
          aria-controls="search-panel"
          :aria-selected="activeTab === 'search'"
        >
          Search
        </button>
      </div>
      <button 
        class="close-button"
        @click="emits('close')"
        aria-label="Close menu"
      >
        ✕
      </button>
    </div>

    <div 
      v-show="activeTab === 'menu'"
      id="menu-panel"
      role="tabpanel"
      aria-labelledby="menu-tab"
      class="mobile-menu-content"
    >
      <nav aria-label="Mobile navigation">
        <div 
          v-for="section in navItems" 
          :key="section.title"
          class="nav-section"
        >
          <h3 class="nav-section-title">{{ section.title }}</h3>
          <ul class="nav-items">
            <li v-for="item in section.items" :key="item.text">
              <a 
                :href="item.link"
                :class="{ active: route.path === item.link }"
                @click="emits('close')"
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
      class="mobile-menu-content"
    >
      <div class="search-container">
        <input
          type="search"
          v-model="searchQuery"
          placeholder="Search documentation..."
          aria-label="Search documentation"
          class="search-input"
        >
        <!-- Add search results here -->
      </div>
    </div>

    <div class="mobile-menu-footer">
      <div class="social-links">
        <a 
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
        >
          GitHub
        </a>
        <a 
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener"
          aria-label="Twitter"
        >
          Twitter
        </a>
        <a 
          href="https://discord.gg/yourinvite"
          target="_blank"
          rel="noopener"
          aria-label="Discord"
        >
          Discord
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mobile-menu-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
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
  gap: 1rem;
}

.tab-button {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.tab-button.active {
  color: var(--vp-c-brand);
  background: var(--vp-c-brand-dimm);
}

.close-button {
  width: 40px;
  height: 40px;
  border: none;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: var(--vp-c-bg-mute);
}

.mobile-menu-content {
  flex: 1;
  padding: 1rem;
}

.nav-section {
  margin-bottom: 2rem;
}

.nav-section-title {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
}

.nav-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-items a {
  display: block;
  padding: 0.75rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-items a:hover,
.nav-items a.active {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
}

.search-container {
  margin: 1rem 0;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.mobile-menu-footer {
  padding: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-links a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.social-links a:hover {
  color: var(--vp-c-brand);
}

/* Touch feedback */
.nav-items a:active {
  background: var(--vp-c-bg-mute);
}

/* Improved scrolling */
.mobile-menu-content {
  scrollbar-width: thin;
  scrollbar-color: var(--vp-c-divider) transparent;
}

.mobile-menu-content::-webkit-scrollbar {
  width: 6px;
}

.mobile-menu-content::-webkit-scrollbar-track {
  background: transparent;
}

.mobile-menu-content::-webkit-scrollbar-thumb {
  background: var(--vp-c-divider);
  border-radius: 3px;
}

/* Loading states */
.loading {
  opacity: 0.7;
  pointer-events: none;
}

/* Focus states */
:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: 2px;
}

/* Animation */
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.mobile-menu-container {
  animation: slideIn 0.3s ease-out;
}
</style>
