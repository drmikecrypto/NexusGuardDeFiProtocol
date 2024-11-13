Total Supply: 100,000,000 GUARD

Initial Distribution:
```typescript
interface TokenDistribution {
    insurancePool: {
        allocation: 40_000_000,    // 40%
        vesting: "No lock, operational reserve",
        purpose: "Coverage backing and claims settlement"
    },
    protocolTreasury: {
        allocation: 20_000_000,    // 20%
        vesting: "5-year linear vesting",
        purpose: "Protocol development and ecosystem growth"
    },
    teamAndDevelopment: {
        allocation: 15_000_000,    // 15%
        vesting: "3-year linear vesting with 1-year cliff",
        purpose: "Team compensation and development funding"
    },
    communityIncentives: {
        allocation: 15_000_000,    // 15%
        vesting: "4-year linear release",
        purpose: "Staking rewards and community initiatives"
    },
    initialLiquidity: {
        allocation: 10_000_000,    // 10%
        vesting: "6-month linear vesting",
        purpose: "Market making and initial liquidity"
    }
}
```
