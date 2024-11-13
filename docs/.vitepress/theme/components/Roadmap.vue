<template>
  <div class="roadmap-container">
    <h2 class="roadmap-title">Development Roadmap</h2>
    <div class="roadmap-timeline" ref="timelineRef">
      <div class="timeline-progress" :style="{ height: scrollProgress + '%' }"></div>
      <div v-for="(phase, index) in phases" 
           :key="index" 
           class="phase" 
           :class="{ 
             'active': isActive(index),
             'left': index % 2 === 0,
             'right': index % 2 === 1 
           }"
           :ref="el => phaseElements[index] = el">
        <div class="phase-content">
          <div class="phase-header">
            <h3>{{ phase.title }}</h3>
            <span class="date">{{ phase.date }}</span>
          </div>
          <ul class="phase-items">
            <li v-for="(item, i) in phase.items" 
                :key="i"
                :style="{ animationDelay: `${i * 0.2}s` }">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const timelineRef = ref(null)
const phaseElements = ref([])
const scrollProgress = ref(0)

const phases = [
  {
    title: 'Phase 1: Foundation',
    date: 'Q1 2025',
    items: [
      'Core protocol deployment',
      'Basic risk assessment',
      'Initial governance implementation',
      'Coverage management system'
    ]
  },
  {
    title: 'Phase 2: Enhancement',
    date: 'Q2 2025',
    items: [
      'Advanced risk models',
      'Dynamic premium adjustment',
      'Yield strategy integration',
      'Enhanced governance features'
    ]
  },
  {
    title: 'Phase 3: Scaling',
    date: 'Q3-Q4 2025',
    items: [
      'Cross-chain integration',
      'Advanced analytics',
      'Partner ecosystem development',
      'Market expansion'
    ]
  },
  {
    title: 'Phase 4: Evolution',
    date: 'Q1 2026',
    items: [
      'Machine Learning Integration',
      'Cross-Chain Risk Assessment',
      'Advanced Yield Strategies',
      'Global Market Expansion'
    ]
  }
]

const isActive = (index) => {
  if (!phaseElements.value[index]) return false
  const rect = phaseElements.value[index].getBoundingClientRect()
  return rect.top < window.innerHeight * 0.8 && rect.bottom > 0
}

const handleScroll = () => {
  if (!timelineRef.value) return
  
  const rect = timelineRef.value.getBoundingClientRect()
  const timelineStart = rect.top
  const timelineEnd = rect.bottom
  const viewportHeight = window.innerHeight
  
  if (timelineStart < viewportHeight && timelineEnd > 0) {
    const total = timelineEnd - timelineStart
    const current = viewportHeight - timelineStart
    scrollProgress.value = Math.min(100, Math.max(0, (current / total) * 100))
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.roadmap-container {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.roadmap-title {
  text-align: center;
  margin-bottom: 4rem;
  font-size: 2.5rem;
  color: var(--vp-c-brand);
}

.roadmap-timeline {
  position: relative;
  padding: 2rem 0;
}

.timeline-progress {
  position: absolute;
  left: 50%;
  width: 4px;
  background: linear-gradient(to bottom, var(--vp-c-brand), var(--vp-c-brand-light));
  height: 0;
  transition: height 0.3s ease;
  transform: translateX(-50%);
}

.phase {
  position: relative;
  margin: 4rem 0;
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.5s ease;
  width: 45%;
}

.phase.left {
  left: 0;
}

.phase.right {
  left: 55%;
}

.phase.active {
  opacity: 1;
  transform: translateX(0);
}

.phase-content {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.phase-content:hover {
  transform: translateY(-5px);
}

.phase-header {
  margin-bottom: 1.5rem;
}

.phase-header h3 {
  color: var(--vp-c-brand);
  margin: 0;
  font-size: 1.5rem;
}

.date {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: var(--vp-c-brand-soft);
  border-radius: 20px;
  font-size: 0.9rem;
}

.phase-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.phase-items li {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
}

.phase-items li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--vp-c-brand);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .phase {
    width: 90%;
    left: 5% !important;
  }
  
  .timeline-progress {
    left: 0;
  }
}
</style>
