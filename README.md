# NexusGuard Protocol

> Decentralized insurance protocol for DeFi projects on Sonic blockchain

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.20-363636)
![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)

## Overview

NexusGuard is a decentralized insurance protocol that provides comprehensive coverage against smart contract vulnerabilities and technical failures for DeFi projects. Built on Sonic blockchain, it implements advanced risk assessment models and dynamic premium calculations.

## Features

- 🔒 **Smart Contract Coverage**: Protection against vulnerabilities and exploits
- 📊 **Dynamic Risk Assessment**: Real-time risk monitoring and automated adjustments
- 💰 **Yield Generation**: Efficient capital utilization through ERC4626 vaults
- 🏛️ **Decentralized Governance**: Community-driven protocol management
- 🛡️ **Multi-layer Security**: Role-based access control and circuit breakers


## Architecture

```mermaid
graph TD;
    A[External Interface] --> B[Protocol Core];
    B --> C[Storage Layer];
    B --> D[Insurance Layer];
    B --> E[Governance Layer];
    C --> F[State Management];
    C --> G[Access Control];
    D --> H[Coverage Management];
    D --> I[Premium Calculation];
    D --> J[Claims Processing];
    E --> K[Proposal System];
    E --> L[Voting System];
    E --> M[Parameter Control];
```



```mermaid
sequenceDiagram
    participant User
    participant Protocol
    participant Risk
    participant Coverage
    
    User->>Protocol: Request Coverage
    Protocol->>Risk: Assess Risk
    Risk-->>Protocol: Risk Score
    Protocol->>Coverage: Calculate Premium
    Coverage-->>Protocol: Premium Amount
    Protocol-->>User: Coverage Quote
    User->>Protocol: Accept & Pay Premium
    Protocol->>Coverage: Issue Coverage
```

```

## Core Protocol Components

### Smart Contract Architecture

<div align="center">

| Contract | Function | Features |
|:---------|:---------|:---------|
| 🏛️ `NexusGuardStorage` | State Management | • Access Control<br>• Data Models<br>• Risk Tracking |
| 🛡️ `NexusGuardInsurance` | Coverage Systems | • Premium Calculation<br>• Claims Processing<br>• Risk Assessment |
| 🏪 `NexusGuardGovernance` | Protocol Control | • Voting Mechanism<br>• Parameter Updates<br>• Proposal System |
| 🔗 `NexusGuardDeFiProtocolV1` | Core Logic | • Component Integration<br>• External Interface<br>• Upgrade Control |

</div>

### Protocol Flow

```mermaid
flowchart TD
    A[Interface] --> B[Core]
    B --> C[Storage]
    B --> D[Insurance]
    B --> E[Governance]
```

### Component Interaction

```mermaid
flowchart LR;
    A((Protocol Core)) --> B[Storage];
    A --> C[Insurance];
    A --> D[Governance];
    B --- B1((State));
    B --- B2((Access));
    C --- C1((Coverage));
    C --- C2((Claims));
    D --- D1((Voting));
    D --- D2((Params));
```

### System Overview

<div align="center">

| Layer | Function | Access Control |
|:-----:|:--------:|:-------------:|
| Storage | Data Management | Admin Only |
| Insurance | Coverage Logic | Public/Restricted |
| Governance | Protocol Control | Token Holders |
| Core | Integration | System Only |

</div>
```


### Coverage Flow

```mermaid
stateDiagram-v2
    [*] --> RequestCoverage
    RequestCoverage --> RiskAssessment
    RiskAssessment --> PremiumCalculation
    PremiumCalculation --> CoverageActive
    CoverageActive --> ClaimSubmission
    ClaimSubmission --> ClaimValidation
    ClaimValidation --> ClaimPayout
    ClaimValidation --> ClaimRejected
    ClaimPayout --> [*]
    ClaimRejected --> [*]
```

### Yield Strategy Flow

```mermaid
graph LR
    A[Capital Pool] -->|Deposit| B[Yield Vaults]
    B -->|Generate| C[Yield]
    C -->|70%| D[Coverage Providers]
    C -->|20%| E[Protocol Reserve]
    C -->|10%| F[Governance Stakers]
    B -->|Monitor| G[Risk System]
    G -->|Adjust| B
```

## Protocol Parameters

<div align="center">

### Coverage Parameters

| Parameter | Value | Description |
|:---------:|:-----:|:------------|
| 💎 **Minimum Coverage** | 1,000 GUARD | Minimum coverage amount per policy |
| 💰 **Maximum Coverage** | 10,000,000 GUARD | Maximum coverage per project |
| ⏱️ **Coverage Duration** | 30-365 days | Valid coverage period range |
| 📊 **Base Premium Rate** | 1-5% | Annual premium rate before adjustments |
| 🎯 **Target Utilization** | 80% | Optimal capital utilization ratio |

### Risk Parameters

| Parameter | Target | Warning | Critical |
|:---------:|:------:|:-------:|:--------:|
| **Protocol TVL** | > 10M GUARD | < 5M GUARD | < 1M GUARD |
| **Collateral Ratio** | > 150% | < 130% | < 120% |
| **Risk Exposure** | < 40% | > 50% | > 60% |
| **Category Limit** | < 30% | > 35% | > 40% |

### Governance Parameters

| Parameter | Value |
|:---------:|:-----:|
| 🏛️ **Minimum Proposal Stake** | 100,000 GUARD |
| ⏳ **Voting Period** | 7 days |
| 🔒 **Timelock Period** | 2 days |
| 📊 **Quorum Requirement** | 10% |
| 🎯 **Execution Delay** | 48 hours |

</div>

## Security Framework

### Multi-Layer Security

```mermaid
pie title Security Resource Allocation
    "Smart Contract Audits" : 30
    "Continuous Monitoring" : 25
    "Risk Assessment" : 20
    "Governance Controls" : 15
    "Emergency Response" : 10
```

### Risk Assessment Matrix

<div align="center">

| Impact ↓ Likelihood → | Low | Medium | High |
|:--------------------:|:---:|:------:|:----:|
| **High** | 🟨 | 🟧 | 🟥 |
| **Medium** | 🟩 | 🟨 | 🟧 |
| **Low** | 🟩 | 🟩 | 🟨 |

</div>

## Yield Generation Strategies

```mermaid
graph TD
    subgraph Yield Strategies
        A[Strategy Selection] --> B[Risk Assessment]
        B --> C[Capital Allocation]
        C --> D[Yield Generation]
        D --> E[Reward Distribution]
    end
    subgraph Risk Management
        F[Monitor Risk] --> G[Adjust Allocation]
        G --> H[Rebalance]
        H --> I[Emergency Exit]
    end
```

## Protocol Metrics

<div align="center">

### Performance Indicators

| Metric | Target | Current |
|:------:|:------:|:-------:|
| 📈 **APY** | 15% | 12.5% |
| 💰 **TVL** | $50M | $42M |
| 🛡️ **Coverage Ratio** | 150% | 165% |
| 📊 **Utilization** | 80% | 75% |

</div>

## Integration Examples

### Core Integration Functions

```solidity
/// @notice Request coverage for a DeFi project
/// @param project Address of the DeFi project
/// @param amount Coverage amount requested
/// @param duration Coverage duration in days
/// @return premiumRequired Premium amount to be paid
function requestCoverage(
    address project,
    uint256 amount,
    uint256 duration
) external returns (uint256 premiumRequired);

/// @notice Purchase coverage after premium calculation
/// @param coverageId Unique identifier for coverage request
/// @param premium Amount of premium to be paid
/// @return success Boolean indicating coverage purchase success
function purchaseCoverage(
    uint256 coverageId,
    uint256 premium
) external returns (bool);

/// @notice Submit an insurance claim
/// @param coverageId Unique identifier for active coverage
/// @param amount Claim amount requested
/// @param evidence Supporting evidence for the claim
/// @return claimId Unique identifier for submitted claim
function submitClaim(
    uint256 coverageId,
    uint256 amount,
    bytes calldata evidence
) external returns (uint256 claimId);

**## Quick Integration Example**

solidity


// 1. Request Coverage Quote
uint256 premium = nexusGuard.requestCoverage(
    projectAddress,
    1000 ether,  // 1000 tokens coverage
    30 days
);

// 2. Purchase Coverage
bool success = nexusGuard.purchaseCoverage(
    coverageId,
    premium
);

// 3. Submit Claim (if needed)
uint256 claimId = nexusGuard.submitClaim(
    coverageId,
    500 ether,  // 500 tokens claim
    evidenceData
);
