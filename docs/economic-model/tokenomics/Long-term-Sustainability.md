Protocol Health Metrics:
```
contract ProtocolHealth {
    struct HealthMetrics {
        uint256 circulatingSupply;
        uint256 stakingRatio;     // % of supply staked
        uint256 treasuryBalance;
        uint256 insuranceReserves;
    }
    
    struct Thresholds {
        uint256 minStakingRatio;  // 30%
        uint256 targetStakingRatio; // 50%
        uint256 minReserveRatio;   // 150%
        uint256 targetReserveRatio; // 200%
    }
}
```
