---
layout: home

hero:
  name: "NexusGuard Protocol"
  text: "Enterprise-Grade DeFi Insurance Protocol"
  tagline: "Revolutionizing DeFi security through advanced risk management, AI-powered assessment, and comprehensive coverage solutions"
  image:
    src: /images/logo.svg
    alt: NexusGuard Protocol
  actions:
    - theme: brand
      text: Quick Start
      link: /quickstart/
    - theme: brand
      text: Documentation
      link: /documentation/
    - theme: alt
      text: GitHub
      link: https://github.com/drmikecrypto/NexusGuardDeFiProtocol
    - theme: alt
      text: Whitepaper
      link: /whitepaper/

features:
  - icon: 🛡️
    title: Advanced Smart Contract Coverage
    details: Military-grade protection against vulnerabilities, exploits, and technical failures. Real-time threat monitoring with AI-powered risk detection.
    link: /protocol/coverage
    linkText: Explore Coverage →
  
  - icon: 🤖
    title: AI-Powered Risk Assessment
    details: Cutting-edge machine learning models for real-time risk analysis. Predictive analytics for early threat detection and automated risk scoring.
    link: /protocol/risk-assessment
    linkText: View Risk Models →
  
  - icon: 💎
    title: Optimized Yield Generation
    details: Sophisticated yield strategies using ERC4626 vaults. Dynamic rebalancing and multi-layer risk management for sustainable returns.
    link: /economic-model/yield
    linkText: Learn About Yields →
  
  - icon: ⚡
    title: Instant Claims Processing
    details: Automated validation and lightning-fast payouts. Decentralized oracle network ensures accurate and fair claims assessment.
    link: /protocol/claims
    linkText: Claims Process →
  
  - icon: 🏛️
    title: Robust Governance Framework
    details: Advanced DAO mechanisms with quadratic voting. Multi-signature controls and time-locked execution for enhanced security.
    link: /governance/
    linkText: Governance Details →
  
  - icon: 🔐
    title: Enterprise Security Architecture
    details: Military-grade encryption and multi-layer security. Regular audits, bug bounties, and real-time threat monitoring.
    link: /security/
    linkText: Security Model →

statistics:
  - value: "$50M+"
    label: "Total Value Locked"
    trend: "+25% monthly"
    
  - value: "99.99%"
    label: "System Uptime"
    trend: "Industry Leading"
    
  - value: "<2 min"
    label: "Claim Processing"
    trend: "Fastest in DeFi"
    
  - value: "150%+"
    label: "Coverage Ratio"
    trend: "Above Target"

ecosystem:
  title: "NexusGuard Ecosystem"
  partners:
    - name: "Leading DeFi Protocols"
      count: "25+"
      
    - name: "Security Auditors"
      count: "5"
      
    - name: "Insurance Partners"
      count: "10"
      
    - name: "Technical Integrations"
      count: "30+"

highlights:
  - category: "Technology Stack"
    items:
      - "EVM Compatible Smart Contracts"
      - "Zero-Knowledge Proofs"
      - "Layer 2 Optimization"
      - "Cross-Chain Architecture"
      
  - category: "Risk Management"
    items:
      - "AI-Powered Risk Scoring"
      - "Real-time Monitoring"
      - "Automated Circuit Breakers"
      - "Dynamic Risk Adjustment"
      
  - category: "Coverage Options"
    items:
      - "Smart Contract Protection"
      - "Oracle Failure Coverage"
      - "Bridge Security Insurance"
      - "Governance Attack Protection"

footer:
  links:
    - title: "Resources"
      items:
        - text: "Documentation"
          link: "/docs/"
        - text: "API Reference"
          link: "/api/"
        - text: "Tutorials"
          link: "/tutorials/"
          
    - title: "Community"
      items:
        - text: "Discord"
          link: "#"
        - text: "Twitter"
          link: "#"
        - text: "Forum"
          link: "#"
          
    - title: "More"
      items:
        - text: "Blog"
          link: "/blog/"
        - text: "GitHub"
          link: "https://github.com/drmikecrypto/NexusGuardDeFiProtocol"
        - text: "Careers"
          link: "/careers/"
---


<script setup>
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
:root {
  --nexus-primary: #3498db;
  --nexus-secondary: #2ecc71;
  --nexus-accent: #e74c3c;
  --nexus-background: #f8f9fa;
  --nexus-text: #2c3e50;
}
  
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
