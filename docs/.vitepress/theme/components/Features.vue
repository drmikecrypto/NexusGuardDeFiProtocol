<!-- docs/.vitepress/theme/components/Features.vue -->
<template>
  <div class="features-container">
    <h2 class="features-title">Key Features</h2>
    <div class="features-grid">
      <div v-for="feature in features" 
           :key="feature.title" 
           class="feature-card">
        <div class="feature-icon">{{ feature.icon }}</div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.details }}</p>
        <a v-if="feature.link" :href="feature.link" class="feature-link">
          Learn more →
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  {
    icon: '🛡️',
    title: 'Smart Contract Coverage',
    details: 'Comprehensive protection against vulnerabilities and exploits',
    link: '/protocol/coverage'
  },
  {
    icon: '📊',
    title: 'Dynamic Risk Assessment',
    details: 'AI-powered real-time risk monitoring and automated adjustments',
    link: '/protocol/risk-assessment'
  },
  {
    icon: '💰',
    title: 'Yield Generation',
    details: 'Efficient capital utilization through advanced vault strategies',
    link: '/economic-model/yield-generation'
  },
  {
    icon: '🏛️',
    title: 'Decentralized Governance',
    details: 'Community-driven protocol management and decision making',
    link: '/governance/'
  },
  {
    icon: '🔒',
    title: 'Multi-layer Security',
    details: 'Advanced security framework with multiple protection layers',
    link: '/protocol/security'
  },
  {
    icon: '⚡',
    title: 'Real-time Processing',
    details: 'Instant claims processing and risk adjustments',
    link: '/protocol/claims'
  }
]
</script>

<style scoped>
.features-container {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.features-title {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: var(--vp-c-brand);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin: 1rem 0;
  color: var(--vp-c-brand);
}

.feature-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
}

.feature-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .features-container {
    padding: 2rem 1rem;
  }
}
</style>
