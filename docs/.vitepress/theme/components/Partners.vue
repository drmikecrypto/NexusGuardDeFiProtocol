<!-- docs/.vitepress/theme/components/Partners.vue -->
<template>
  <div class="partners-container">
    <h2 class="partners-title">Our Partners</h2>
    <div class="partners-grid">
      <div v-for="partner in partners" 
           :key="partner.name" 
           class="partner-card">
        <div class="partner-logo">{{ partner.logo }}</div>
        <h3>{{ partner.name }}</h3>
        <p>{{ partner.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const partners = [
  {
    logo: '🏦',
    name: 'DeFi Protocols',
    description: 'Leading DeFi protocols and platforms'
  },
  {
    logo: '🔍',
    name: 'Audit Partners',
    description: 'Top blockchain security firms'
  },
  {
    logo: '🤝',
    name: 'Integration Partners',
    description: 'Cross-chain bridges and integrators'
  },
  {
    logo: '📊',
    name: 'Data Providers',
    description: 'Oracle networks and data analytics'
  }
]
</script>

<style scoped>
.partners-container {
  padding: 4rem 2rem;
  background: var(--vp-c-bg-soft);
}

.partners-title {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: var(--vp-c-brand);
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.partner-card {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.partner-card:hover {
  transform: translateY(-5px);
}

.partner-logo {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.partner-card h3 {
  margin: 1rem 0;
  color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .partners-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .partners-grid {
    grid-template-columns: 1fr;
  }
}
</style>
