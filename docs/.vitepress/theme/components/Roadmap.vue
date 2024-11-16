<template>
  <section class="roadmap-container" aria-labelledby="roadmap-title">
    <h2 id="roadmap-title" class="roadmap-title">Development Roadmap</h2>
    <div 
      class="roadmap-timeline" 
      ref="timelineRef"
      role="list"
    >
      <div 
        class="timeline-progress" 
        :style="{ height: scrollProgress + '%' }"
        aria-hidden="true"
      ></div>
      <article 
        v-for="(phase, index) in phases" 
        :key="index" 
        class="phase" 
        :class="{ 
          'active': isActive(index),
          'left': index % 2 === 0,
          'right': index % 2 === 1 
        }"
        :ref="el => phaseElements[index] = el"
        role="listitem"
      >
        <div class="phase-content">
          <header class="phase-header">
            <h3>{{ phase.title }}</h3>
            <time class="date">{{ phase.date }}</time>
          </header>
          <ul class="phase-items" role="list">
            <li 
              v-for="(item, i) in phase.items" 
              :key="i"
              :style="{ '--item-delay': `${i * 0.2}s` }"
              role="listitem"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </article>
    </div>
  </section>
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
  const threshold = window.innerHeight * 0.8
  return rect.top < threshold && rect.bottom > 0
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

const debouncedScroll = () => {
  let timeout
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => handleScroll(), 16)
  }
}

onMounted(() => {
  const scrollHandler = debouncedScroll()
  window.addEventListener('scroll', scrollHandler, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.roadmap-container {
  padding: clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem);
  max-width: min(1200px, 90vw);
  margin: 0 auto;
}

.roadmap-title {
  text-align: center;
  margin-block-end: clamp(2rem, 6vw, 4rem);
  font-size: clamp(2rem, 5vw, 2.5rem);
  color: var(--vp-c-brand);
}

.roadmap-timeline {
  position: relative;
  padding-block: 2rem;
  container-type: inline-size;
}

.timeline-progress {
  position: absolute;
  inset-inline-start: 50%;
  width: 4px;
  background: linear-gradient(to bottom, var(--vp-c-brand), var(--vp-c-brand-light));
  height: 0;
  transition: height 0.3s ease;
  transform: translateX(-50%);
}

.phase {
  position: relative;
  margin-block: 4rem;
  opacity: 0;
  transform: translateX(-50px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  width: 45%;
}

.phase.left {
  inset-inline-start: 0;
}

.phase.right {
  inset-inline-start: 55%;
}

.phase.active {
  opacity: 1;
  transform: translateX(0);
}

.phase-content {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: clamp(1.5rem, 4vw, 2rem);
  box-shadow: 0 4px 12px rgb(0 0 0 / 10%);
  transition: transform 0.3s ease;
}

@media (hover: hover) {
  .phase-content:hover {
    transform: translateY(-5px);
  }
}

.phase-header {
  margin-block-end: 1.5rem;
}

.phase-header h3 {
  color: var(--vp-c-brand);
  margin: 0;
  font-size: clamp(1.25rem, 3vw, 1.5rem);
}

.date {
  display: inline-block;
  margin-block-start: 0.5rem;
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
  margin-block: 0.75rem;
  padding-inline-start: 1.5rem;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.5s ease forwards;
  animation-delay: var(--item-delay);
}

.phase-items li::before {
  content: "→";
  position: absolute;
  inset-inline-start: 0;
  color: var(--vp-c-brand);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@container (max-width: 768px) {
  .phase {
    width: 90%;
    inset-inline-start: 5% !important;
  }
  
  .timeline-progress {
    inset-inline-start: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .phase,
  .phase-content,
  .timeline-progress {
    transition: none;
  }
  
  .phase-items li {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
