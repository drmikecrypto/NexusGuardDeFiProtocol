The premium calculation system implements a dynamic pricing model that adjusts based on multiple factors:

```solidity
contract PremiumCalculator {
    struct PremiumFactors {
        uint256 baseRate;
        uint256 riskMultiplier;
        uint256 durationFactor;
        uint256 utilizationAdjustment;
        uint256 marketConditionFactor;
    }

    function calculatePremium(
        uint256 coverageAmount,
        PremiumFactors memory factors
    ) public view returns (uint256) {
        return coverageAmount
            .mul(factors.baseRate)
            .mul(factors.riskMultiplier)
            .mul(factors.durationFactor)
            .mul(factors.utilizationAdjustment)
            .mul(factors.marketConditionFactor)
            .div(PRECISION_FACTOR);
    }
}
```
