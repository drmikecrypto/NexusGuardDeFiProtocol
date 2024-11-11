// SPDX-License-Identifier: MIT pragma solidity ^0.8.20;  import "./NexusGuardStorage.sol"; import "./NexusGuardGovernance.sol"; import "./NexusGuardInsurance.sol"; import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol"; import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol"; import "@openzeppelin/contracts-upgradeable/interfaces/IERC4626Upgradeable.sol";  contract NexusGuardDeFiProtocolV1 is      Initializable,      NexusGuardGovernance,      NexusGuardInsurance  {     using SafeERC20Upgradeable for IERC20Upgradeable;      // DeFi Integration Structures     struct YieldStrategy {         address vault;          // ERC4626 vault address         uint256 allocation;     // Percentage allocation (PERCENTAGE_BASE)         bool active;         uint256 lastReport;     // Last yield report timestamp         uint256 totalDeposited;         uint256 totalWithdrawn;         uint256 expectedAPY;    // Expected APY in basis points     }      struct LiquidityPool {         uint256 totalLiquidity;         uint256 allocatedLiquidity;         uint256 minimumLiquidity;         uint256 targetLiquidity;         uint256 lastRebalance;     }      // DeFi State Variables     mapping(address => YieldStrategy) public yieldStrategies;     address[] public activeStrategies;     LiquidityPool public liquidityPool;          uint256 public constant MAX_STRATEGIES = 5;     uint256 public constant REBALANCE_INTERVAL = 1 days;     uint256 public constant MIN_YIELD_INTERVAL = 4 hours;     uint256 public constant EMERGENCY_WITHDRAWAL_DELAY = 6 hours;      // Yield tracking     struct YieldReport {         uint256 timestamp;         uint256 amount;         uint256 apy;         address strategy;     }     YieldReport[] public yieldReports;      // Events     event StrategyAdded(address indexed vault, uint256 allocation);     event StrategyUpdated(address indexed vault, uint256 newAllocation);     event YieldHarvested(address indexed strategy, uint256 amount, uint256 apy);     event LiquidityRebalanced(uint256 timestamp, uint256 totalLiquidity);     event EmergencyWithdrawalInitiated(address indexed strategy, uint256 amount);     event EmergencyWithdrawalCompleted(address indexed strategy, uint256 amount);      // DeFi Integration Functions     function addYieldStrategy(         address vault,         uint256 allocation,         uint256 expectedAPY     ) external onlyRole(ADMIN_ROLE) {         require(vault != address(0), "Invalid vault address");         require(allocation <= PERCENTAGE_BASE, "Invalid allocation");         require(activeStrategies.length < MAX_STRATEGIES, "Max strategies reached");                  // Verify vault compatibility         require(IERC4626Upgradeable(vault).asset() == address(guardianToken),                  "Incompatible vault asset");          uint256 totalAllocation = _getTotalAllocation();         require(totalAllocation + allocation <= PERCENTAGE_BASE,                  "Allocation exceeds 100%");          YieldStrategy storage strategy = yieldStrategies[vault];         require(!strategy.active, "Strategy already exists");          strategy.vault = vault;         strategy.allocation = allocation;         strategy.active = true;         strategy.expectedAPY = expectedAPY;         strategy.lastReport = block.timestamp;          activeStrategies.push(vault);          emit StrategyAdded(vault, allocation);          // Trigger rebalance if needed         if (_shouldRebalance()) {             _rebalanceLiquidity();         }     }      function updateStrategyAllocation(         address vault,         uint256 newAllocation     ) external onlyRole(ADMIN_ROLE) {         YieldStrategy storage strategy = yieldStrategies[vault];         require(strategy.active, "Strategy not active");                  uint256 totalAllocation = _getTotalAllocation() - strategy.allocation + newAllocation;         require(totalAllocation <= PERCENTAGE_BASE, "Allocation exceeds 100%");          strategy.allocation = newAllocation;         emit StrategyUpdated(vault, newAllocation);          // Rebalance if needed         if (_shouldRebalance()) {             _rebalanceLiquidity();         }     }      function harvestYield() external nonReentrant {         require(_shouldHarvestYield(), "Too soon to harvest");          uint256 totalYield = 0;         uint256 totalValue = 0;          for (uint256 i = 0; i < activeStrategies.length; i++) {             address vaultAddress = activeStrategies[i];             YieldStrategy storage strategy = yieldStrategies[vaultAddress];                          if (!strategy.active) continue;              IERC4626Upgradeable vault = IERC4626Upgradeable(vaultAddress);                          // Calculate yield             uint256 currentBalance = vault.convertToAssets(vault.balanceOf(address(this)));             if (currentBalance > strategy.totalDeposited - strategy.totalWithdrawn) {                 uint256 yield = currentBalance - (strategy.totalDeposited - strategy.totalWithdrawn);                                  // Withdraw yield                 vault.withdraw(yield, address(this), address(this));                                  strategy.totalWithdrawn += yield;                 totalYield += yield;                                  // Calculate APY                 uint256 timeDiff = block.timestamp - strategy.lastReport;                 uint256 apy = (yield * 365 days * PERCENTAGE_BASE) /                               (strategy.totalDeposited * timeDiff);                                  yieldReports.push(YieldReport({                     timestamp: block.timestamp,                     amount: yield,                     apy: apy,                     strategy: vaultAddress                 }));                  emit YieldHarvested(vaultAddress, yield, apy);                 strategy.lastReport = block.timestamp;             }                          totalValue += currentBalance;         }          // Distribute yield to stakers         if (totalYield > 0) {             _distributeYield(totalYield);         }          // Update liquidity pool         liquidityPool.totalLiquidity = guardianToken.balanceOf(address(this)) + totalValue;         emit LiquidityRebalanced(block.timestamp, liquidityPool.totalLiquidity);     }      function initiateEmergencyWithdrawal(         address strategy     ) external onlyRole(EMERGENCY_ROLE) whenEmergency {         YieldStrategy storage yieldStrategy = yieldStrategies[strategy];         require(yieldStrategy.active, "Strategy not active");          IERC4626Upgradeable vault = IERC4626Upgradeable(strategy);         uint256 balance = vault.balanceOf(address(this));         require(balance > 0, "No balance to withdraw");          // Queue emergency withdrawal         emergencyWithdrawals[strategy] = EmergencyWithdrawal({             timestamp: block.timestamp,             amount: balance,             executed: false         });          emit EmergencyWithdrawalInitiated(strategy, balance);     }      function completeEmergencyWithdrawal(         address strategy     ) external onlyRole(EMERGENCY_ROLE) whenEmergency {         EmergencyWithdrawal storage withdrawal = emergencyWithdrawals[strategy];         require(!withdrawal.executed, "Withdrawal already executed");         require(             block.timestamp >= withdrawal.timestamp + EMERGENCY_WITHDRAWAL_DELAY,             "Withdrawal delay not met"         );          IERC4626Upgradeable vault = IERC4626Upgradeable(strategy);         vault.withdraw(             withdrawal.amount,             address(this),             address(this)         );          withdrawal.executed = true;         YieldStrategy storage yieldStrategy = yieldStrategies[strategy];         yieldStrategy.active = false;          // Remove from active strategies         for (uint256 i = 0; i < activeStrategies.length; i++) {             if (activeStrategies[i] == strategy) {                 activeStrategies[i] = activeStrategies[activeStrategies.length - 1];                 activeStrategies.pop();                 break;             }         }          emit EmergencyWithdrawalCompleted(strategy, withdrawal.amount);     }      // Internal DeFi Functions     function _getTotalAllocation() internal view returns (uint256) {         uint256 total = 0;         for (uint256 i = 0; i < activeStrategies.length; i++) {             if (yieldStrategies[activeStrategies[i]].active) {                 total += yieldStrategies[activeStrategies[i]].allocation;             }         }         return total;     }      function _shouldRebalance() internal view returns (bool) {         return block.timestamp >= liquidityPool.lastRebalance + REBALANCE_INTERVAL;     }      function _shouldHarvestYield() internal view returns (bool) {         return block.timestamp >= liquidityPool.lastRebalance + MIN_YIELD_INTERVAL;     }      function _rebalanceLiquidity() internal {         uint256 totalBalance = guardianToken.balanceOf(address(this));                  // Calculate target amounts for each strategy         for (uint256 i = 0; i < activeStrategies.length; i++) {             address vaultAddress = activeStrategies[i];             YieldStrategy storage strategy = yieldStrategies[vaultAddress];                          if (!strategy.active) continue;              IERC4626Upgradeable vault = IERC4626Upgradeable(vaultAddress);             uint256 currentBalance = vault.convertToAssets(vault.balanceOf(address(this)));             uint256 targetBalance = (totalBalance * strategy.allocation) / PERCENTAGE_BASE;              if (currentBalance < targetBalance) {                 // Deposit more                 uint256 depositAmount = targetBalance - currentBalance;                 guardianToken.approve(vaultAddress, depositAmount);                 vault.deposit(depositAmount, address(this));                 strategy.totalDeposited += depositAmount;             } else if (currentBalance > targetBalance) {                 // Withdraw excess                 uint256 withdrawAmount = currentBalance - targetBalance;                 vault.withdraw(withdrawAmount, address(this), address(this));                 strategy.totalWithdrawn += withdrawAmount;             }         }          liquidityPool.lastRebalance = block.timestamp;         liquidityPool.totalLiquidity = totalBalance;                  emit LiquidityRebalanced(block.timestamp, liquidityPool.totalLiquidity);     }      function _distributeYield(uint256 amount) internal {
        // Implementation of yield distribution
        require(amount > 0, "No yield to distribute");
        require(totalStaked > 0, "No stakers");
        
        // Distribute proportionally to stakers
        uint256 rewardPerToken = (amount * PERCENTAGE_BASE) / totalStaked;
        
        // Record in current reward cycle
        uint256 currentCycle = rewardsCycles.length - 1;
        rewardsCycles[currentCycle].rewardPool += amount;
    }
     // Advanced Premium Management    // Advanced Premium Management
    struct PremiumPool {
        uint256 totalPremiums;
        uint256 allocatedPremiums;
        uint256 unallocatedPremiums;
        uint256 investedPremiums;
        uint256 lastUpdateBlock;
    }

    struct PremiumTier {
        uint256 minCoverage;
        uint256 maxCoverage;
        uint256 baseRate;
        uint256 multiplier;
        bool active;
    }

    struct DynamicPricing {
        uint256 utilizationRate;     // Current utilization in basis points
        uint256 targetUtilization;   // Target utilization in basis points
        int256 priceAdjustment;      // Current price adjustment in basis points
        uint256 lastUpdate;
        uint256 updateInterval;
    }

    // Premium State Variables
    PremiumPool public premiumPool;
    mapping(uint256 => PremiumTier) public premiumTiers;
    DynamicPricing public dynamicPricing;
    uint256 public constant MAX_PREMIUM_TIERS = 5;
    uint256 public currentTierCount;

    // Premium Discount Tracking
    struct DiscountProgram {
        uint256 stakingDiscount;     // Discount for long-term stakers
        uint256 volumeDiscount;      // Discount for high-volume users
        uint256 loyaltyDiscount;     // Discount for repeat customers
        uint256 minStakingTime;      // Minimum staking time for discount
        uint256 minVolume;           // Minimum volume for discount
    }
    DiscountProgram public discountProgram;
    mapping(address => uint256) public userPremiumVolume;
    mapping(address => uint256) public userCoverageCount;

    // Events
    event PremiumTierCreated(uint256 indexed tierId, uint256 minCoverage, uint256 maxCoverage);
    event PremiumTierUpdated(uint256 indexed tierId, uint256 baseRate, uint256 multiplier);
    event DynamicPricingUpdated(uint256 utilizationRate, int256 priceAdjustment);
    event DiscountProgramUpdated(uint256 stakingDiscount, uint256 volumeDiscount, uint256 loyaltyDiscount);
    event PremiumCollected(address indexed user, uint256 amount, uint256 discount);
    event PremiumInvested(uint256 amount, uint256 timestamp);

    function initializePremiumManagement() internal {
        dynamicPricing = DynamicPricing({
            utilizationRate: 0,
            targetUtilization: 8000, // 80%
            priceAdjustment: 0,
            lastUpdate: block.timestamp,
            updateInterval: 1 days
        });

        discountProgram = DiscountProgram({
            stakingDiscount: 1000,   // 10%
            volumeDiscount: 1500,    // 15%
            loyaltyDiscount: 500,    // 5%
            minStakingTime: 90 days,
            minVolume: 1000 ether    // 1000 tokens
        });
    }

    function createPremiumTier(
        uint256 minCoverage,
        uint256 maxCoverage,
        uint256 baseRate,
        uint256 multiplier
    ) external onlyRole(ADMIN_ROLE) {
        require(currentTierCount < MAX_PREMIUM_TIERS, "Max tiers reached");
        require(maxCoverage > minCoverage, "Invalid coverage range");
        require(baseRate <= 5000, "Base rate too high"); // Max 50%

        uint256 tierId = currentTierCount++;
        premiumTiers[tierId] = PremiumTier({
            minCoverage: minCoverage,
            maxCoverage: maxCoverage,
            baseRate: baseRate,
            multiplier: multiplier,
            active: true
        });

        emit PremiumTierCreated(tierId, minCoverage, maxCoverage);
    }

    function calculatePremiumWithDiscounts(
        address user,
        uint256 coverageAmount,
        uint256 duration,
        uint256 riskScore
    ) public view returns (uint256 premium, uint256 discount) {
        // Get base premium
        premium = _calculateBasePremium(coverageAmount, duration, riskScore);
        
        // Calculate applicable discounts
        discount = _calculateUserDiscounts(user, premium);
        
        // Apply dynamic pricing adjustment
        int256 adjustment = dynamicPricing.priceAdjustment;
        if (adjustment != 0) {
            if (adjustment > 0) {
                premium += (premium * uint256(adjustment)) / PERCENTAGE_BASE;
            } else {
                premium -= (premium * uint256(-adjustment)) / PERCENTAGE_BASE;
            }
        }

        // Apply discount
        if (discount > 0) {
            premium = premium - ((premium * discount) / PERCENTAGE_BASE);
        }

        return (premium, discount);
    }

    function updateDynamicPricing() public {
        require(block.timestamp >= dynamicPricing.lastUpdate + dynamicPricing.updateInterval, 
                "Too soon to update");

        // Calculate current utilization
        uint256 newUtilizationRate = (insurancePool.totalPayouts * PERCENTAGE_BASE) / 
                                    (premiumPool.totalPremiums + 1);

        // Update price adjustment based on utilization
        if (newUtilizationRate > dynamicPricing.targetUtilization) {
            // Increase prices
            dynamicPricing.priceAdjustment += int256(
                (newUtilizationRate - dynamicPricing.targetUtilization) / 10
            );
        } else {
            // Decrease prices
            dynamicPricing.priceAdjustment -= int256(
                (dynamicPricing.targetUtilization - newUtilizationRate) / 10
            );
        }

        // Cap adjustments
        if (dynamicPricing.priceAdjustment > 5000) {  // Max 50% increase
            dynamicPricing.priceAdjustment = 5000;
        } else if (dynamicPricing.priceAdjustment < -3000) {  // Max 30% decrease
            dynamicPricing.priceAdjustment = -3000;
        }

        dynamicPricing.utilizationRate = newUtilizationRate;
        dynamicPricing.lastUpdate = block.timestamp;

        emit DynamicPricingUpdated(newUtilizationRate, dynamicPricing.priceAdjustment);
    }

    function updateDiscountProgram(
        uint256 _stakingDiscount,
        uint256 _volumeDiscount,
        uint256 _loyaltyDiscount,
        uint256 _minStakingTime,
        uint256 _minVolume
    ) external onlyRole(ADMIN_ROLE) {
        require(_stakingDiscount <= 3000, "Staking discount too high"); // Max 30%
        require(_volumeDiscount <= 3000, "Volume discount too high");   // Max 30%
        require(_loyaltyDiscount <= 2000, "Loyalty discount too high"); // Max 20%

        discountProgram = DiscountProgram({
            stakingDiscount: _stakingDiscount,
            volumeDiscount: _volumeDiscount,
            loyaltyDiscount: _loyaltyDiscount,
            minStakingTime: _minStakingTime,
            minVolume: _minVolume
        });

        emit DiscountProgramUpdated(_stakingDiscount, _volumeDiscount, _loyaltyDiscount);
    }

    // Internal Premium Functions
    function _calculateBasePremium(
        uint256 coverageAmount,
        uint256 duration,
        uint256 riskScore
    ) internal view returns (uint256) {
        // Find applicable tier
        uint256 applicableTier = 0;
        for (uint256 i = 0; i < currentTierCount; i++) {
            if (premiumTiers[i].active &&
                coverageAmount >= premiumTiers[i].minCoverage &&
                coverageAmount <= premiumTiers[i].maxCoverage) {
                applicableTier = i;
                break;
            }
        }

        PremiumTier storage tier = premiumTiers[applicableTier];
        
        // Calculate base premium
        uint256 annualPremium = (coverageAmount * tier.baseRate) / PERCENTAGE_BASE;
        
        // Apply risk multiplier
        annualPremium = (annualPremium * (PERCENTAGE_BASE + 
                        (riskScore * tier.multiplier) / 100)) / PERCENTAGE_BASE;
        
        // Adjust for duration
        return (annualPremium * duration) / 365 days;
    }

    function _calculateUserDiscounts(
        address user,
        uint256 premium
    ) internal view returns (uint256 totalDiscount) {
        // Check staking discount
        if (stakes[user].amount > 0 && 
            block.timestamp - stakes[user].timestamp >= discountProgram.minStakingTime) {
            totalDiscount += discountProgram.stakingDiscount;
        }

        // Check volume discount
        if (userPremiumVolume[user] >= discountProgram.minVolume) {
            totalDiscount += discountProgram.volumeDiscount;
        }

        // Check loyalty discount
        if (userCoverageCount[user] >= 3) {  // 3 or more coverages
            totalDiscount += discountProgram.loyaltyDiscount;
        }

        // Cap total discount
        if (totalDiscount > 4000) { // Max 40% total discount
            totalDiscount = 4000;
        }

        return totalDiscount;
    }

    function _recordPremiumPayment(
        address user,
        uint256 premium
    ) internal {
        userPremiumVolume[user] += premium;
        userCoverageCount[user] += 1;
        
        premiumPool.totalPremiums += premium;
        premiumPool.unallocatedPremiums += premium;
        
        emit PremiumCollected(user, premium, 0);
    }     // Protocol-wide Risk Management    // Protocol-wide Risk Management
    struct ProtocolRiskMetrics {
        uint256 totalRiskExposure;          // Total risk-weighted exposure
        uint256 maxRiskExposure;            // Maximum allowed risk exposure
        uint256 currentUtilization;         // Current utilization rate
        uint256 healthFactor;               // Overall protocol health factor
        uint256 lastAssessment;             // Last risk assessment timestamp
    }

    struct RiskLimit {
        uint256 perProjectLimit;            // Maximum exposure per project
        uint256 perCategoryLimit;           // Maximum exposure per risk category
        uint256 minCollateralization;       // Minimum collateralization ratio
        uint256 maxUtilization;             // Maximum protocol utilization
    }

    struct RiskMetric {
        uint256 value;                      // Current value
        uint256 threshold;                  // Alert threshold
        uint256 critical;                   // Critical threshold
        bool breached;                      // Whether threshold is breached
    }

    // Risk Management State
    ProtocolRiskMetrics public riskMetrics;
    RiskLimit public riskLimits;
    mapping(bytes32 => RiskMetric) public riskMetrics;
    mapping(uint256 => uint256) public categoryExposure;
    
    // Risk Events
    event RiskMetricUpdated(bytes32 indexed metric, uint256 value, bool breached);
    event RiskLimitUpdated(string limitType, uint256 newValue);
    event RiskAssessmentPerformed(uint256 timestamp, uint256 healthFactor);
    event RiskAlertTriggered(bytes32 indexed metric, uint256 value, uint256 threshold);
    event EmergencyActionTriggered(bytes32 indexed reason, uint256 timestamp);

    // Modifiers
    modifier withinRiskLimits(address project, uint256 amount) {
        require(_checkRiskLimits(project, amount), "Risk limits exceeded");
        _;
    }

    // Risk Management Functions
    function performRiskAssessment() external nonReentrant {
        require(
            block.timestamp >= riskMetrics.lastAssessment + 1 days,
            "Too frequent assessment"
        );

        // Update protocol risk metrics
        uint256 totalCoverage = _calculateTotalCoverage();
        uint256 totalCollateral = _calculateTotalCollateral();
        uint256 utilizationRate = _calculateUtilizationRate();

        // Calculate health factor
        uint256 newHealthFactor = _calculateHealthFactor(
            totalCoverage,
            totalCollateral,
            utilizationRate
        );

        // Update risk metrics
        riskMetrics.totalRiskExposure = totalCoverage;
        riskMetrics.currentUtilization = utilizationRate;
        riskMetrics.healthFactor = newHealthFactor;
        riskMetrics.lastAssessment = block.timestamp;

        // Check for breached limits
        _checkRiskMetrics();

        emit RiskAssessmentPerformed(block.timestamp, newHealthFactor);
    }

    function updateRiskLimits(
        uint256 _perProjectLimit,
        uint256 _perCategoryLimit,
        uint256 _minCollateralization,
        uint256 _maxUtilization
    ) external onlyRole(RISK_MANAGER_ROLE) {
        require(_minCollateralization >= 12000, "Collateralization too low"); // 120%
        require(_maxUtilization <= 9000, "Utilization too high"); // 90%

        riskLimits = RiskLimit({
            perProjectLimit: _perProjectLimit,
            perCategoryLimit: _perCategoryLimit,
            minCollateralization: _minCollateralization,
            maxUtilization: _maxUtilization
        });

        emit RiskLimitUpdated("PerProjectLimit", _perProjectLimit);
        emit RiskLimitUpdated("PerCategoryLimit", _perCategoryLimit);
        emit RiskLimitUpdated("MinCollateralization", _minCollateralization);
        emit RiskLimitUpdated("MaxUtilization", _maxUtilization);
    }

    function setRiskMetricThresholds(
        bytes32 metric,
        uint256 threshold,
        uint256 critical
    ) external onlyRole(RISK_MANAGER_ROLE) {
        require(threshold < critical, "Invalid thresholds");

        RiskMetric storage riskMetric = riskMetrics[metric];
        riskMetric.threshold = threshold;
        riskMetric.critical = critical;

        emit RiskMetricUpdated(metric, riskMetric.value, riskMetric.breached);
    }

    // Risk Mitigation Functions
    function mitigateRisk(
        address project,
        uint256 riskLevel
    ) external onlyRole(RISK_MANAGER_ROLE) {
        require(riskLevel <= 3, "Invalid risk level");

        if (riskLevel >= 2) {
            // High risk: Reduce exposure
            _reduceProjectExposure(project);
        }

        if (riskLevel == 3) {
            // Critical risk: Emergency measures
            _triggerEmergencyMeasures(project);
        }

        // Update project risk assessment
        _updateProjectRiskAssessment(project, riskLevel);
    }

    function rebalanceRiskExposure() external nonReentrant {
        require(_shouldRebalanceRisk(), "Rebalance not needed");

        uint256[] memory overexposedCategories = _identifyOverexposedCategories();
        
        for (uint256 i = 0; i < overexposedCategories.length; i++) {
            uint256 category = overexposedCategories[i];
            uint256 excess = categoryExposure[category] - riskLimits.perCategoryLimit;
            
            if (excess > 0) {
                _rebalanceCategory(category, excess);
            }
        }
    }

    // Internal Risk Management Functions
    function _calculateHealthFactor(
        uint256 totalCoverage,
        uint256 totalCollateral,
        uint256 utilizationRate
    ) internal pure returns (uint256) {
        // Base health factor from collateralization
        uint256 collateralFactor = (totalCollateral * PERCENTAGE_BASE) / totalCoverage;
        
        // Adjust for utilization
        uint256 utilizationFactor = PERCENTAGE_BASE - (utilizationRate / 10);
        
        return (collateralFactor * utilizationFactor) / PERCENTAGE_BASE;
    }

    function _checkRiskLimits(
        address project,
        uint256 amount
    ) internal view returns (bool) {
        Project storage projectData = projects[project];
        
        // Check project limit
        if (projectData.totalCoverage + amount > riskLimits.perProjectLimit) {
            return false;
        }
        
        // Check category limit
        if (categoryExposure[projectData.riskCategory] + amount > riskLimits.perCategoryLimit) {
            return false;
        }
        
        // Check protocol utilization
        uint256 newUtilization = ((riskMetrics.totalRiskExposure + amount) * PERCENTAGE_BASE) /
                                _calculateTotalCollateral();
        if (newUtilization > riskLimits.maxUtilization) {
            return false;
        }
        
        return true;
    }

    function _checkRiskMetrics() internal {
        bytes32[] memory metricKeys = _getRiskMetricKeys();
        
        for (uint256 i = 0; i < metricKeys.length; i++) {
            RiskMetric storage metric = riskMetrics[metricKeys[i]];
            
            if (metric.value > metric.critical) {
                _triggerEmergencyAction(metricKeys[i]);
                metric.breached = true;
            } else if (metric.value > metric.threshold && !metric.breached) {
                emit RiskAlertTriggered(metricKeys[i], metric.value, metric.threshold);
                metric.breached = true;
            } else if (metric.value <= metric.threshold && metric.breached) {
                metric.breached = false;
            }
        }
    }

    function _reduceProjectExposure(address project) internal {
        Project storage projectData = projects[project];
        
        // Calculate reduction needed
        uint256 currentExposure = projectData.totalCoverage;
        uint256 targetExposure = (currentExposure * 80) / 100; // Reduce by 20%
        
        // Update project limits
        uint256 reduction = currentExposure - targetExposure;
        projectData.totalCoverage = targetExposure;
        
        // Update category exposure
        categoryExposure[projectData.riskCategory] -= reduction;
        
        // Update protocol metrics
        riskMetrics.totalRiskExposure -= reduction;
    }

    function _triggerEmergencyMeasures(address project) internal {
        // Pause new coverage for the project
        Project storage projectData = projects[project];
        projectData.active = false;
        
        // Trigger emergency action
        bytes32 reason = keccak256(abi.encodePacked("HIGH_RISK_PROJECT", project));
        emit EmergencyActionTriggered(reason, block.timestamp);
        
        // Additional emergency measures can be implemented here
    }

    function _rebalanceCategory(uint256 category, uint256 excess) internal {
        // Find all projects in category
        address[] memory categoryProjects = _getProjectsInCategory(category);
        
        // Calculate reduction per project
        uint256 reductionPerProject = excess / categoryProjects.length;
        
        for (uint256 i = 0; i < categoryProjects.length; i++) {
            Project storage projectData = projects[categoryProjects[i]];
            
            if (projectData.totalCoverage > reductionPerProject) {
                projectData.totalCoverage -= reductionPerProject;
                categoryExposure[category] -= reductionPerProject;
                riskMetrics.totalRiskExposure -= reductionPerProject;
            }
        }
    }

    // View Functions
    function getProtocolRiskMetrics() external view returns (
        uint256 totalExposure,
        uint256 healthFactor,
        uint256 utilization,
        bool emergencyState
    ) {
        return (
            riskMetrics.totalRiskExposure,
            riskMetrics.healthFactor,
            riskMetrics.currentUtilization,
            parameters.emergencyMode
        );
    }

    function getCategoryRiskMetrics(uint256 category) external view returns (
        uint256 exposure,
        uint256 limit,
        uint256 utilizationRate
    ) {
        exposure = categoryExposure[category];
        limit = riskLimits.perCategoryLimit;
        utilizationRate = (exposure * PERCENTAGE_BASE) / limit;
    }

    function _getProjectsInCategory(uint256 category) internal view returns (address[] memory) {
        // Implementation to return all projects in a category
        // This is a placeholder - actual implementation would need to track projects per category
    }

    function _getRiskMetricKeys() internal pure returns (bytes32[] memory) {
        // Return all risk metric keys for checking
        // This is a placeholder - actual implementation would define all risk metrics
    }
} }