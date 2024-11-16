<template>
  <section class="features-container" aria-labelledby="features-title">
    <h2 id="features-title" class="features-title">Key Features</h2>
    <div class="features-grid">
      <article 
        v-for="(feature, index) in features" 
        :key="feature.title" 
        class="feature-card"
        :style="{ '--delay': `${index * 0.1}s` }"
      >
        <div class="feature-icon" role="img" :aria-label="feature.title">
          {{ feature.icon }}
        </div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.details }}</p>
        <a 
          v-if="feature.link" 
          :href="feature.link" 
          class="feature-link"
          :aria-label="`Learn more about ${feature.title}`"
        >
          <span>Learn more</span>
          <svg class="arrow-icon" viewBox="0 0 24 24" width="16" height="16">
            <path 
              fill="currentColor" 
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
            />
          </svg>
        </a>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  icon: string
  title: string
  details: string
  link?: string
}

const features: Feature[] = [
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
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.features-title {
  text-align: center;
  margin-bottom: 4rem;
  font-size: clamp(2rem, 5vw, 2.5rem);
  color: var(--vp-c-brand);
  position: relative;
}

.features-title::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: var(--vp-c-brand);
  border-radius: 2px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
}

.feature-card {
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 2.5rem;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out both;
  animation-delay: var(--delay);
  border: 1px solid var(--vp-c-divider);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--vp-c-brand);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  transform-origin: center;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.feature-card h3 {
  margin: 1rem 0;
  color: var(--vp-c-brand);
  font-size: 1.5rem;
  font-weight: 600;
}

.feature-card p {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.feature-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
  transition: gap 0.3s ease;
}

.feature-link:hover {
  gap: 0.75rem;
}

.arrow-icon {
  transition: transform 0.3s ease;
}

.feature-link:hover .arrow-icon {
  transform: translateX(4px);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .features-container {
    padding: 3rem 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    padding: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .feature-card {
    animation: none;
  }
  
  .feature-card,
  .feature-icon,
  .feature-link,
  .arrow-icon {
    transition: none;
  }
}
</style>
