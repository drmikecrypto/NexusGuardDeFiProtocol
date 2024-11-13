System Constants and Configurations:
```
contract SystemParameters {
    // Risk Assessment Parameters
    uint256 public constant MAX_RISK_SCORE = 10000;      // 100%
    uint256 public constant MIN_RISK_SCORE = 1000;       // 10%
    uint256 public constant RISK_DECIMALS = 4;
    
    // Premium Calculation Parameters
    uint256 public constant MAX_PREMIUM_RATE = 5000;     // 50% annual
    uint256 public constant MIN_PREMIUM_RATE = 100;      // 1% annual
    uint256 public constant PREMIUM_DECIMALS = 6;
    
    // Protocol Limits
    uint256 public constant MAX_COVERAGE_RATIO = 5000;   // 50% of TVL
    uint256 public constant MIN_COVERAGE_DURATION = 30 days;
    uint256 public constant MAX_COVERAGE_DURATION = 365 days;
}
```
