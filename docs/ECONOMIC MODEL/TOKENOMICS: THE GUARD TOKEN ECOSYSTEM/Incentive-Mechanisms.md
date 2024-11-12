Staking and Participation Rewards:
```
contract IncentiveMechanics {
    struct Incentives {
        StakingRewards staking;
        ValidationRewards validation;
        GovernanceRewards governance;
        LiquidityRewards liquidity;
    }
    
    struct StakingRewards {
        uint256 baseRate;         // 8% APY
        uint256 maxBoost;         // Up to 20% APY
        uint256 lockupBonus;      // Additional 2% per month locked
        uint256 maxLockup;        // 24 months
    }
    
    struct ValidationRewards {
        uint256 claimAssessment;  // 1% of claim amount
        uint256 riskValidation;   // 0.5% of premium
        uint256 accuracyBonus;    // Up to 50% boost
    }
}
```
