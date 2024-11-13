---
layout: home

hero:
  name: NexusGuard Protocol
  text: Advanced DeFi Insurance Protocol
  tagline: Securing the future of decentralized finance through innovative risk management and comprehensive coverage solutions
  image:
    src: /images/logo.svg
    alt: NexusGuard Protocol
  actions:
    - theme: brand
      text: Get Started
      link: /introduction/
    - theme: alt
      text: Read Documentation
      link: /documentation/
    - theme: alt
      text: View on GitHub
      link: https://github.com/drmikecrypto/NexusGuardDeFiProtocol

features:
  - icon: 🛡️
    title: Smart Contract Coverage
    details: Comprehensive protection against vulnerabilities, bugs, and exploits in smart contract code. Our advanced monitoring system continuously scans for potential threats.
    link: /protocol/coverage
    linkText: Learn about coverage →
  
  - icon: 📊
    title: Risk Assessment
    details: AI-powered risk analysis and real-time monitoring of protocol vulnerabilities. Dynamic risk scoring and automated adjustments.
    link: /protocol/risk-assessment
    linkText: Explore risk models →
  
  - icon: 💰
    title: Yield Generation
    details: Optimized capital utilization through advanced yield farming strategies. ERC4626-compliant vaults maximize returns while maintaining security.
    link: /economic-model/yield-generation
    linkText: View strategies →
  
  - icon: ⚡
    title: Claims Processing
    details: Automated claims validation and instant payout system for verified incidents. Stake-based validation ensures fair and efficient processing.
    link: /protocol/claims
    linkText: Learn about claims →
  
  - icon: 🏛️
    title: Decentralized Governance
    details: Community-driven protocol management through the GUARD token. Stake-based voting and proposal systems for protocol evolution.
    link: /governance/
    linkText: View governance →
  
  - icon: 🔒
    title: Multi-layer Security
    details: Comprehensive security framework including audits, monitoring, and emergency responses. Role-based access control and circuit breakers.
    link: /protocol/security
    linkText: Explore security →
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'
import { ref } from 'vue'

const protocolMetrics = ref([
  {
    value: '150%',
    label: 'Coverage Ratio',
    description: 'Maintaining strong coverage reserves'
  },
  {
    value: '$50M',
    label: 'Target TVL',
    description: 'Projected total value locked'
  },
  {
    value: '15%',
    label: 'Target APY',
    description: 'Estimated annual yield'
  },
  {
    value: '80%',
    label: 'Utilization',
    description: 'Optimal capital efficiency'
  }
])

const highlights = ref([
  {
    title: 'Dynamic Risk Assessment',
    items: [
      'Real-time monitoring of protocols',
      'AI-powered risk analysis',
      'Automated risk adjustments',
      'Market condition integration'
    ]
  },
  {
    title: 'Coverage Mechanisms',
    items: [
      'Smart contract vulnerability protection',
      'Protocol failure coverage',
      'Governance attack insurance',
      'Bridge failure protection'
    ]
  },
  {
    title: 'Operational Excellence',
    items: [
      'Automated claims processing',
      'Stake-based validation',
      'Efficient capital utilization',
      'Yield generation strategies'
    ]
  }
])
</script>

<template>
  <div class="landing-content">
    <Features class="features-section" />
    
    <div class="metrics-section">
      <h2>Protocol Metrics</h2>
      <div class="metrics-grid">
        <div v-for="metric in protocolMetrics" 
             :key="metric.label" 
             class="metric-card">
          <div class="metric-value">{{ metric.value }}</div>
          <div class="metric-label">{{ metric.label }}</div>
          <div class="metric-description">{{ metric.description }}</div>
        </div>
      </div>
    </div>

    <div class="highlights-section">
      <h2>Protocol Highlights</h2>
      <div class="highlights-grid">
        <div v-for="highlight in highlights" 
             :key="highlight.title" 
             class="highlight-card">
          <h3>{{ highlight.title }}</h3>
          <ul>
            <li v-for="item in highlight.items" 
                :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>

    <Roadmap class="roadmap-section" />
    
    <Partners class="partners-section" />

    <div class="cta-section">
      <h2>Ready to Get Started?</h2>
      <p>Explore our documentation to learn more about NexusGuard Protocol</p>
      <div class="cta-buttons">
        <a href="/introduction/" class="cta-button primary">Start Building</a>
        <a href="/documentation/" class="cta-button secondary">Read Docs</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing-content {
  padding-bottom: 4rem;
}

.metrics-section {
  padding: 4rem 2rem;
  background: var(--vp-c-bg-soft);
}

.metrics-section h2,
.highlights-section h2 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: var(--vp-c-brand);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.metric-card {
  background: var(--vp-c-bg);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-5px);
}

.metric-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--vp-c-brand);
}

.metric-label {
  font-size: 1.2rem;
  margin: 0.5rem 0;
  color: var(--vp-c-text-1);
}

.metric-description {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.highlights-section {
  padding: 4rem 2rem;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.highlight-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
}

.highlight-card h3 {
  color: var(--vp-c-brand);
  margin-bottom: 1.5rem;
}

.highlight-card ul {
  list-style: none;
  padding: 0;
}

.highlight-card li {
  margin: 0.75rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.highlight-card li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--vp-c-brand);
}

.cta-section {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--vp-c-bg-soft);
}

.cta-section h2 {
  font-size: 2.5rem;
  color: var(--vp-c-brand);
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--vp-c-text-2);
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.cta-button {
  display: inline-block;
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
}

.cta-button.primary {
  background: var(--vp-c-brand);
  color: white;
}

.cta-button.secondary {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand);
  border: 1px solid var(--vp-c-brand);
}

.cta-button:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .metrics-grid,
  .highlights-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .metrics-section,
  .highlights-section,
  .cta-section {
    padding: 2rem 1rem;
  }
}
</style>
