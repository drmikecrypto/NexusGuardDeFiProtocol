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
</script>

<template>
  <div class="protocol-metrics">
    <h2 class="section-title">Protocol Metrics</h2>
    
    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <span>Loading metrics...</span>
    </div>
    
    <div v-else class="metrics-grid">
      <div 
        v-for="metric in metrics"
        :key="metric.label"
        class="metric-card"
      >
        <div class="metric-header">
          <h3 class="metric-label">{{ metric.label }}</h3>
          <div 
            v-if="metric.trend"
            :class="['trend-indicator', `trend-${metric.trend}`]"
          >
            {{ metric.change }}
          </div>
        </div>
        
        <div class="metric-value">{{ metric.value }}</div>
        
        <div 
          v-if="metric.description"
          class="metric-description"
        >
          {{ metric.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.protocol-metrics {
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
}

.section-title {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--vp-c-text-1);
  font-size: 2rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.metric-card {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-5px);
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.metric-label {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin: 0;
}

.trend-indicator {
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
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
  font-size: 2rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0.5rem 0;
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
  padding: 2rem;
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

@media (max-width: 768px) {
  .protocol-metrics {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .metric-value {
    font-size: 1.5rem;
  }
}
</style>
