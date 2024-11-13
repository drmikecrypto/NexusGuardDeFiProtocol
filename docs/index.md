---
layout: home

hero:
  name: NexusGuard Protocol
  text: Advanced DeFi Insurance Protocol
  tagline: Securing the future of decentralized finance through innovative risk management
  image:
    src: /images/logo.svg
    alt: NexusGuard Protocol Logo
  actions:
    - theme: brand
      text: Get Started
      link: /introduction/
    - theme: alt
      text: View Documentation
      link: /documentation
    - theme: alt
      text: View on GitHub
      link: https://github.com/drmikecrypto/NexusGuardDeFiProtocol

features:
  - icon: 🛡️
    title: Smart Contract Coverage
    details: Comprehensive protection against vulnerabilities, exploits, and technical failures in DeFi protocols
    link: /protocol/coverage
  
  - icon: 📊
    title: Dynamic Risk Assessment
    details: AI-powered real-time risk monitoring and automated adjustments using advanced risk models
    link: /protocol/risk-assessment
  
  - icon: 💰
    title: Yield Generation
    details: Efficient capital utilization through ERC4626 vaults and sophisticated yield strategies
    link: /economic-model/yield-generation
  
  - icon: 🏛️
    title: Decentralized Governance
    details: Community-driven protocol management with stake-based voting and proposal systems
    link: /governance/
  
  - icon: 🔒
    title: Multi-layer Security
    details: Role-based access control, circuit breakers, and comprehensive security framework
    link: /protocol/security
  
  - icon: ⚡
    title: Claims Processing
    details: Automated claims validation and instant payout system for verified incidents
    link: /protocol/claims

highlights:
  - title: Protocol Parameters
    items:
      - title: Coverage Limits
        details: Support for coverage amounts from 1,000 to 10,000,000 GUARD tokens
        icon: 💎
      - title: Premium Rates
        details: Dynamic 1-5% annual premium rates adjusted based on risk assessment
        icon: 📊
      - title: Duration Options
        details: Flexible coverage periods ranging from 30 to 365 days
        icon: ⏱️

  - title: Risk Management
    items:
      - title: Real-time Monitoring
        details: Continuous assessment of protocol health and risk factors
        icon: 📈
      - title: Automated Adjustments
        details: Dynamic premium and coverage adjustments based on market conditions
        icon: ⚖️
      - title: Safety Measures
        details: Multiple security layers including audits and emergency responses
        icon: 🔐

  - title: Yield Strategies
    items:
      - title: Capital Efficiency
        details: Optimized yield generation through diversified strategies
        icon: 📈
      - title: Risk-Adjusted Returns
        details: Balanced approach to maximize returns while maintaining security
        icon: 🎯
      - title: Reward Distribution
        details: Fair distribution of yields among stakeholders
        icon: 💸
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'
</script>

<Features />

<div class="divider"></div>

<div class="protocol-metrics">
  <h2>Protocol Metrics</h2>
  <div class="metrics-grid">
    <div class="metric">
      <span class="metric-value">15%</span>
      <span class="metric-label">Target APY</span>
    </div>
    <div class="metric">
      <span class="metric-value">$50M</span>
      <span class="metric-label">Target TVL</span>
    </div>
    <div class="metric">
      <span class="metric-value">150%</span>
      <span class="metric-label">Coverage Ratio</span>
    </div>
    <div class="metric">
      <span class="metric-value">80%</span>
      <span class="metric-label">Target Utilization</span>
    </div>
  </div>
</div>

<Roadmap />

<div class="divider"></div>

<Partners />

<style scoped>
.divider {
  margin: 4rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.protocol-metrics {
  padding: 4rem 0;
  text-align: center;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 2rem auto;
  max-width: 1000px;
}

.metric {
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.metric:hover {
  transform: translateY(-5px);
}

.metric-value {
  display: block;
  font-size: 2rem;
  font-weight: bold;
  color: var(--vp-c-brand);
}

.metric-label {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
