<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useData } from 'vitepress'

interface DocItem {
  text: string
  link?: string
  items?: DocItem[]
}

const route = useRoute()
const { theme } = useData()

const sidebar = ref<DocItem[]>([
  {
    text: 'Abstract',
    link: '/docs/abstract'
  },
  {
    text: 'Economic Model',
    items: [
      { text: 'Premium Management', link: '/docs/economic-model/Premium-Management' },
      { text: 'Token Economics', link: '/docs/economic-model/Token-Economics' },
      { text: 'Yield Generation', link: '/docs/economic-model/Yield-Generation' },
      {
        text: 'Tokenomics',
        items: [
          { text: 'Emission Schedule', link: '/docs/economic-model/tokenomics/Emission-Schedule' },
          { text: 'Incentive Mechanisms', link: '/docs/economic-model/tokenomics/Incentive-Mechanisms' },
          { text: 'Long-term Sustainability', link: '/docs/economic-model/tokenomics/Long-term-Sustainability' },
          { text: 'Token Distribution and Vesting', link: '/docs/economic-model/tokenomics/Token-Distribution-and-Vesting' },
          { text: 'Token Economics Model', link: '/docs/economic-model/tokenomics/Token-Economics-Model' },
          { text: 'Token Supply Dynamics', link: '/docs/economic-model/tokenomics/Token-Supply-Dynamics' },
          { text: 'Token Utility and Value Accrual', link: '/docs/economic-model/tokenomics/Token-Utility-and-Value-Accrual' }
        ]
      }
    ]
  },
  {
    text: 'Future Development',
    items: [
      { text: 'Development Roadmap', link: '/docs/future-development/Development-Roadmap' },
      { text: 'Real World Use Cases', link: '/docs/future-development/Real-World-Use-Cases' }
    ]
  },
  {
    text: 'Future Directions',
    items: [
      { text: 'Future Research Directions', link: '/docs/future-directions/Future-Research-Directions' },
      { text: 'Key Achievements', link: '/docs/future-directions/Key-Achievements' }
    ]
  },
  {
    text: 'Governance',
    items: [
      { text: 'Decentralized Governance', link: '/docs/governance/Decentralized-Governance' },
      { text: 'Security Mechanisms', link: '/docs/governance/Security-Mechanisms' }
    ]
  },
  // Continue with other sections...
])

const currentDoc = ref('')

const loadContent = async (path: string) => {
  currentDoc.value = path
}
</script>

<template>
  <div class="doc-container">
    <!-- Sidebar Navigation -->
    <aside class="doc-sidebar">
      <div class="sidebar-content">
        <template v-for="section in sidebar" :key="section.text">
          <div class="section">
            <h3 class="section-title">{{ section.text }}</h3>
            <template v-if="section.items">
              <div class="section-items">
                <template v-for="item in section.items" :key="item.text">
                  <!-- Handle nested items -->
                  <template v-if="item.items">
                    <div class="subsection">
                      <h4 class="subsection-title">{{ item.text }}</h4>
                      <div class="subsection-items">
                        <a v-for="subitem in item.items"
                           :key="subitem.text"
                           :href="subitem.link"
                           :class="{ active: currentDoc === subitem.link }"
                           @click.prevent="loadContent(subitem.link)">
                          {{ subitem.text }}
                        </a>
                      </div>
                    </div>
                  </template>
                  <!-- Handle regular items -->
                  <a v-else
                     :href="item.link"
                     :class="{ active: currentDoc === item.link }"
                     @click.prevent="loadContent(item.link)">
                    {{ item.text }}
                  </a>
                </template>
              </div>
            </template>
          </div>
        </template>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="doc-content">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.doc-container {
  display: flex;
  min-height: calc(100vh - var(--header-height));
}

.doc-sidebar {
  width: 300px;
  border-right: 1px solid var(--vp-c-divider);
  background: var(--vp-sidebar-bg-color);
  height: 100%;
  overflow-y: auto;
  position: fixed;
  padding: 1rem;
}

.sidebar-content {
  padding: 1rem;
}

.section {
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.section-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.subsection {
  margin-left: 1rem;
}

.subsection-title {
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0.5rem 0;
  color: var(--vp-c-text-2);
}

.subsection-items {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-left: 0.5rem;
}

a {
  text-decoration: none;
  color: var(--vp-c-text-2);
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.2s;
}

a:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
}

a.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.doc-content {
  flex: 1;
  margin-left: 300px;
  padding: 2rem;
  max-width: 768px;
}

@media (max-width: 768px) {
  .doc-sidebar {
    width: 100%;
    position: relative;
  }
  
  .doc-content {
    margin-left: 0;
  }
  
  .doc-container {
    flex-direction: column;
  }
}
</style>
