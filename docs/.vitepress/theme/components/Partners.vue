<!-- docs/.vitepress/theme/components/Partners.vue -->
<template>
  <section class="partners-container" aria-labelledby="partners-title">
    <h2 id="partners-title" class="partners-title">Our Partners</h2>
    <div class="partners-grid">
      <article 
        v-for="partner in partners" 
        :key="partner.name" 
        class="partner-card"
      >
        <div class="partner-logo" aria-hidden="true">{{ partner.logo }}</div>
        <h3>{{ partner.name }}</h3>
        <p>{{ partner.description }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Partner {
  logo: string
  name: string
  description: string
}

const partners: Partner[] = [
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
  padding: clamp(2rem, 5vw, 4rem);
  background: var(--vp-c-bg-soft);
}

.partners-title {
  text-align: center;
  margin-block-end: clamp(2rem, 4vw, 3rem);
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: var(--vp-c-brand);
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  gap: clamp(1rem, 3vw, 2rem);
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 1rem;
}

.partner-card {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: clamp(1.5rem, 3vw, 2rem);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.partner-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.partner-logo {
  font-size: clamp(2.5rem, 5vw, 3rem);
  margin-block-end: 1rem;
}

.partner-card h3 {
  margin-block: 1rem;
  color: var(--vp-c-brand);
  font-size: clamp(1.25rem, 3vw, 1.5rem);
}

.partner-card p {
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

@media (prefers-reduced-motion: reduce) {
  .partner-card {
    transition: none;
  }
  
  .partner-card:hover {
    transform: none;
  }
}
</style>
