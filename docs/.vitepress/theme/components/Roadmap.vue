<template>
  <div class="roadmap-container">
    <div class="roadmap-timeline">
      <div v-for="(phase, index) in phases" :key="index" 
           class="phase" :class="{ 'active': isActive(index) }">
        <div class="phase-content">
          <h3>{{ phase.title }}</h3>
          <span class="date">{{ phase.date }}</span>
          <ul>
            <li v-for="(item, i) in phase.items" :key="i">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const phases = [
  {
    title: 'Phase 1: Foundation',
    date: 'Q1 2025',
    items: [
      'Core protocol development',
      'Smart contract implementation',
      'Initial security audits'
    ]
  },
  // Add other phases
]

// Add scroll animation logic
</script>

<style scoped>
.roadmap-container {
  /* Add your styles */
}
</style>
