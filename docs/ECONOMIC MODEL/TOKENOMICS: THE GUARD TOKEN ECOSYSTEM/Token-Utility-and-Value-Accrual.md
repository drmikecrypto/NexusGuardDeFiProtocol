GUARD Token Utility Mechanisms:

1. Governance Rights
```solidity
contract GuardGovernance {
    struct VotingPower {
        uint256 baseVotes;         // From token holdings
        uint256 stakingMultiplier; // Based on staking duration
        uint256 reputationBonus;   // Based on protocol participation
    }
    
    function calculateVotingPower(
        address user
    ) public view returns (uint256) {
        VotingPower memory power = getVotingPower(user);
        return power.baseVotes
            .mul(power.stakingMultiplier)
            .add(power.reputationBonus);
    }
}
```

2. Premium Discounts
```solidity
contract PremiumDiscounts {
    struct DiscountTiers {
        uint256 bronzeThreshold;   // 1,000 GUARD
        uint256 silverThreshold;   // 5,000 GUARD
        uint256 goldThreshold;     // 10,000 GUARD
        uint256 platinumThreshold; // 50,000 GUARD
    }
    
    struct DiscountRates {
        uint256 bronzeDiscount;    // 5%
        uint256 silverDiscount;    // 10%
        uint256 goldDiscount;      // 15%
        uint256 platinumDiscount;  // 20%
    }
}
```

3. Staking Rewards
```solidity
contract StakingRewards {
    struct RewardStructure {
        uint256 baseAPY;          // 8% base rate
        uint256 bonusAPY;         // Up to 12% additional
        uint256 premiumShare;     // Share of protocol premiums
        uint256 yieldShare;       // Share of yield returns
    }
    
    struct StakingTiers {
        uint256 tier1Duration;    // 3 months
        uint256 tier2Duration;    // 6 months
        uint256 tier3Duration;    // 12 months
        uint256 tier4Duration;    // 24 months
    }
}
```
