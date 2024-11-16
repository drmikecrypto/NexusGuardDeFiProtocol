<!-- docs/.vitepress/theme/components/ProtocolMetrics.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Metric {
  label: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  description?: string
}

const metrics = ref<Metric[]>([
  {
    label: 'Coverage Ratio',
    value: '150%',
    change: '+5%',
    trend: 'up',
    description: 'Total coverage capacity relative to TVL'
  },
  {
    label: 'Total Value Locked',
    value: '$42M',
    change: '+$2.5M',
    trend: 'up',
    description: 'Total value of assets in protocol'
  },
  {
    label: 'Active Policies',
    value: '156',
    change: '+12',
    trend: 'up',
    description: 'Number of active insurance policies'
  },
  {
    label: 'APY',
    value: '12.5%',
    change: '-0.5%',
    trend: 'down',
    description: 'Annual percentage yield for stakers'
  }
])

const loading = ref(true)

onMounted(() => {
  // Simulate data loading
  setTimeout(() => {
    loading.value = false
  }, 500)
})

const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
  switch (trend) {
    case 'up': return '↗'
    case 'down': return '↘'
    case 'neutral': return '→'
    default: return ''
  }
}

const getTrendLabel = (trend?: 'up' | 'down' | 'neutral', change?: string) => {
  if (!trend || !change) return ''
  return `${trend === 'up' ? 'Increased by' : trend === 'down' ? 'Decreased by' : 'Changed by'} ${change}`
}
</script>

<template>
  <section class="protocol-metrics" aria-labelledby="metrics-title">
    <h2 id="metrics-title" class="section-title">Protocol Metrics</h2>
    
    <div 
      v-if="loading" 
      class="loading-state"
      role="status"
      aria-live="polite"
    >
      <div class="loading-spinner" aria-hidden="true"></div>
      <span>Loading metrics...</span>
    </div>
    
    <div 
      v-else 
      class="metrics-grid"
      role="list"
    >
      <article 
        v-for="metric in metrics"
        :key="metric.label"
        class="metric-card"
        role="listitem"
      >
        <div class="metric-header">
          <h3 class="metric-label">{{ metric.label }}</h3>
          <div 
            v-if="metric.trend"
            :class="['trend-indicator', `trend-${metric.trend}`]"
            :aria-label="getTrendLabel(metric.trend, metric.change)"
          >
            <span aria-hidden="true">{{ getTrendIcon(metric.trend) }} {{ metric.change }}</span>
          </div>
        </div>
        
        <div class="metric-value">{{ metric.value }}</div>
        
        <div 
          v-if="metric.description"
          class="metric-description"
        >
          {{ metric.description }}
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.protocol-metrics {
  padding: clamp(1rem, 4vw, 2rem);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  margin-inline: auto;
  max-width: 1400px;
}

.section-title {
  text-align: center;
  margin-block-end: clamp(1.5rem, 4vw, 2rem);
  color: var(--vp-c-text-1);
  font-size: clamp(1.5rem, 4vw, 2rem);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
  gap: clamp(1rem, 3vw, 1.5rem);
}

.metric-card {
  background: var(--vp-c-bg);
  padding: clamp(1rem, 3vw, 1.5rem);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@media (hover: hover) {
  .metric-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgb(0 0 0 / 15%);
  }
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-block-end: 1rem;
}

.metric-label {
  font-size: clamp(1rem, 2.5vw, 1.1rem);
  color: var(--vp-c-text-2);
  margin: 0;
}

.trend-indicator {
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
}

.trend-up {
  background: var(--vp-c-tip-soft);
  color: var(--vp-c-tip);
}

.trend-down {
  background: var(--vp-c-danger-soft);
  color: var(--vp-c-danger);
}

.trend-neutral {
  background: var(--vp-c-text-3);
  color: var(--vp-c-text-2);
}

.metric-value {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-block: 0.5rem;
}

.metric-description {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: clamp(1rem, 4vw, 2rem);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .metric-card {
    transition: none;
  }
  
  .metric-card:hover {
    transform: none;
  }
  
  .loading-spinner {
    animation: none;
  }
}
</style>
