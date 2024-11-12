// Content mapping for all sections
const documentationContent = {
    'abstract': {
        title: 'Abstract',
        content: `
            <div class="doc-content">
                <h1 class="text-4xl font-bold mb-8 gradient-text">Abstract</h1>
                <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                    <p class="text-lg text-gray-300">
                        NexusGuard introduces a pioneering decentralized insurance protocol specifically engineered for DeFi projects on the Sonic blockchain. By implementing advanced risk assessment models, dynamic premium calculations, and decentralized governance, the protocol provides comprehensive coverage against smart contract vulnerabilities, technical failures, and other DeFi-specific risks. Through innovative yield generation strategies and sophisticated risk management mechanisms, NexusGuard creates a sustainable and efficient insurance ecosystem that benefits both DeFi projects and their users.
                    </p>
                </div>
            </div>
        `
    },

    'introduction': {
        title: 'Introduction',
        content: `
            <div class="doc-content">
                <h1 class="text-4xl font-bold mb-8 gradient-text">1. Introduction</h1>
                <div id="defi-insurance-challenge">
                    <h2 class="text-3xl font-bold mb-6">1.1 The DeFi Insurance Challenge</h2>
                    <p class="text-gray-300 mb-6">
                        The exponential growth of decentralized finance has created an urgent need for robust insurance solutions. As the DeFi ecosystem expands, traditional insurance models have proven inadequate in addressing the unique challenges posed by blockchain-based financial protocols.
                    </p>
                    
                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <h3 class="text-xl font-semibold mb-4 text-blue-400">Key Challenges</h3>
                        <ul class="space-y-2 text-gray-300">
                            <li>• Smart contract vulnerabilities</li>
                            <li>• Oracle failures</li>
                            <li>• Governance attacks</li>
                            <li>• Flash loan exploits</li>
                            <li>• Cross-chain bridge failures</li>
                            <li>• Protocol-specific risks</li>
                        </ul>
                    </div>
                </div>

                <div id="nexusguard-solution">
                    <h2 class="text-3xl font-bold mb-6">1.2 The NexusGuard Solution</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20">
                            <h3 class="text-xl font-semibold mb-4 text-blue-400">Risk Management</h3>
                            <ul class="space-y-2 text-gray-300">
                                <li>• Dynamic multi-factor risk assessment</li>
                                <li>• Real-time risk monitoring</li>
                                <li>• Automated risk mitigation</li>
                                <li>• Market condition integration</li>
                            </ul>
                        </div>
                        <div class="bg-[#111] p-6 rounded-lg border border-purple-500/20">
                            <h3 class="text-xl font-semibold mb-4 text-purple-400">Coverage Mechanisms</h3>
                            <ul class="space-y-2 text-gray-300">
                                <li>• Smart contract vulnerability protection</li>
                                <li>• Protocol failure coverage</li>
                                <li>• Governance attack insurance</li>
                                <li>• Bridge failure protection</li>
                                <li>• Liquidation protection</li>
                                <li>• Impermanent loss coverage</li>
                            </ul>
                        </div>
                        <div class="bg-[#111] p-6 rounded-lg border border-cyan-500/20">
                            <h3 class="text-xl font-semibold mb-4 text-cyan-400">Operational Excellence</h3>
                            <ul class="space-y-2 text-gray-300">
                                <li>• Automated claims processing</li>
                                <li>• Stake-based validation</li>
                                <li>• Efficient capital utilization</li>
                                <li>• Yield generation strategies</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    'protocol-architecture': {
        title: 'Protocol Architecture',
        content: `
            <div class="doc-content">
                <h1 class="text-4xl font-bold mb-8 gradient-text">2. Protocol Architecture</h1>
                <div id="core-components">
                    <h2 class="text-3xl font-bold mb-6">2.1 Core Components</h2>
                    <p class="text-gray-300 mb-6">
                        The NexusGuard protocol consists of four primary components working in harmony:
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20">
                            <h3 class="text-xl font-semibold mb-4 text-blue-400">Storage Layer (NexusGuardStorage.sol)</h3>
                            <ul class="space-y-2 text-gray-300">
                                <li>• State management and persistence</li>
                                <li>• Access control framework</li>
                                <li>• Data model implementation</li>
                                <li>• Risk assessment tracking</li>
                                <li>• Premium calculation parameters</li>
                            </ul>
                        </div>
                        <div class="bg-[#111] p-6 rounded-lg border border-purple-500/20">
                            <h3 class="text-xl font-semibold mb-4 text-purple-400">Insurance Layer (NexusGuardInsurance.sol)</h3>
                            <ul class="space-y-2 text-gray-300">
                                <li>• Coverage management</li>
                                <li>• Premium calculations</li>
                                <li>• Claims processing</li>
                                <li>• Risk assessment implementation</li>
                                <li>• Dynamic pricing mechanisms</li>
                            </ul>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div class="bg-[#111] p-6 rounded-lg border border-cyan-500/20">
                            <h3 class="text-xl font-semibold mb-4 text-cyan-400">Governance Layer (NexusGuardGovernance.sol)</h3>
                            <ul class="space-y-2 text-gray-300">
                                <li>• Proposal system</li>
                                <li>• Voting mechanics</li>
                                <li>• Parameter management</li>
                                <li>• Emergency responses</li>
                                <li>• Protocol upgrades</li>
                            </ul>
                        </div>
                        <div class="bg-[#111] p-6 rounded-lg border border-green-500/20">
                            <h3 class="text-xl font-semibold mb-4 text-green-400">Core Protocol (NexusGuardDeFiProtocolV1.sol)</h3>
                            <ul class="space-y-2 text-gray-300">
                                <li>• Component coordination</li>
                                <li>• External interactions</li>
                                <li>• Yield strategy management</li>
                                <li>• Risk mitigation implementation</li>
                                <li>• Emergency controls</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
  'technical-implementation': {
        title: 'Technical Implementation',
        content: `
            <div class="doc-content">
                <h1 class="text-4xl font-bold mb-8 gradient-text">3. Technical Implementation</h1>
                
                <div id="smart-contract-architecture">
                    <h2 class="text-3xl font-bold mb-6">3.1 Smart Contract Architecture</h2>
                    <p class="text-gray-300 mb-6">
                        NexusGuard's technical foundation is built on a modular, upgradeable smart contract architecture designed for security, efficiency, and extensibility.
                    </p>

                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <h3 class="text-xl font-semibold mb-4">Contract Hierarchy</h3>
                        <div class="code-block">
                            <pre><code class="language-solidity">// Core Protocol Implementation
contract NexusGuardDeFiProtocolV1 is
    Initializable,
    NexusGuardGovernance,
    NexusGuardInsurance
{
    using SafeERC20Upgradeable for IERC20Upgradeable;

    // Protocol State Management
    struct ProtocolState {
        bool isActive;
        uint256 lastUpdateBlock;
        uint256 totalValueLocked;
        uint256 totalCoverage;
        uint256 healthFactor;
    }
}</code></pre>
                        </div>

                        <div class="mt-6">
                            <h4 class="text-lg font-semibold mb-3 text-blue-400">Key Implementation Features</h4>
                            <ul class="space-y-2 text-gray-300">
                                <li>• Proxy-based upgradeability for protocol evolution</li>
                                <li>• Role-based access control for security</li>
                                <li>• Comprehensive reentrancy protection</li>
                                <li>• Emergency pause functionality</li>
                                <li>• Optimized gas consumption</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="risk-assessment-engine">
                    <h2 class="text-3xl font-bold mb-6">3.2 Risk Assessment Engine</h2>
                    <p class="text-gray-300 mb-6">
                        The risk assessment engine forms the core of NexusGuard's insurance capabilities, implementing a sophisticated multi-factor analysis model.
                    </p>

                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <h3 class="text-xl font-semibold mb-4">Risk Calculation Implementation</h3>
                        <div class="code-block">
                            <pre><code class="language-solidity">library RiskCalculation {
    using SafeMath for uint256;
    
    uint256 constant PRECISION = 1e18;
    
    struct RiskFactors {
        uint256 auditScore;    // 20% weight
        uint256 tvlScore;      // 30% weight
        uint256 timeScore;     // 15% weight
        uint256 complexityScore; // 20% weight
        uint256 volatilityScore; // 15% weight
    }
    
    function calculateRiskScore(
        RiskFactors memory factors,
        uint256 marketCondition
    ) internal pure returns (uint256) {
        uint256 baseScore = computeBaseScore(factors);
        return adjustForMarketConditions(baseScore, marketCondition);
    }
}</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    'risk-management': {
        title: 'Risk Management System',
        content: `
            <div class="doc-content">
                <h1 class="text-4xl font-bold mb-8 gradient-text">4. Risk Management System</h1>

                <div id="dynamic-risk-assessment">
                    <h2 class="text-3xl font-bold mb-6">4.1 Dynamic Risk Assessment</h2>
                    <p class="text-gray-300 mb-6">
                        NexusGuard employs a dynamic risk assessment system that continuously evaluates and adjusts risk parameters based on real-time data.
                    </p>

                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <h3 class="text-xl font-semibold mb-4">Market Integration</h3>
                        <div class="code-block">
                            <pre><code class="language-solidity">contract DynamicRiskManager {
    struct MarketConditions {
        uint256 volatilityIndex;
        uint256 marketSentiment;
        uint256 systemicRisk;
        uint256 lastUpdate;
    }

    function updateRiskParameters(
        address project
    ) external returns (uint256 newRiskScore) {
        MarketConditions memory market = getCurrentMarketConditions();
        RiskFactors memory factors = getCurrentRiskFactors(project);
        newRiskScore = RiskCalculation.calculateRiskScore(
            factors,
            market
        );
        emit RiskScoreUpdated(project, newRiskScore);
        return newRiskScore;
    }
}</code></pre>
                        </div>
                    </div>
                </div>

                <div id="risk-mitigation-strategies">
                    <h2 class="text-3xl font-bold mb-6">4.2 Risk Mitigation Strategies</h2>
                    <p class="text-gray-300 mb-6">
                        The protocol implements automated risk mitigation strategies to maintain system stability:
                    </p>

                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <div class="code-block">
                            <pre><code class="language-solidity">contract RiskMitigation {
    enum MitigationAction {
        ADJUST_PREMIUM,
        REDUCE_EXPOSURE,
        INCREASE_COLLATERAL,
        PAUSE_COVERAGE
    }

    function executeMitigation(
        address project,
        uint256 riskLevel
    ) internal returns (bool) {
        MitigationAction action = determineMitigationAction(riskLevel);
        return implementMitigation(project, action);
    }
}</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
  'economic-model': {
        title: 'Economic Model',
        content: `
            <div class="doc-content">
                <h1 class="text-4xl font-bold mb-8 gradient-text">5. Economic Model</h1>

                <div id="token-economics">
                    <h2 class="text-3xl font-bold mb-6">5.1 Token Economics</h2>
                    <p class="text-gray-300 mb-6">
                        The GUARD token serves as the cornerstone of the NexusGuard ecosystem, facilitating governance, staking, and insurance operations.
                    </p>

                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <h3 class="text-xl font-semibold mb-4">Token Distribution</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ul class="space-y-2 text-gray-300">
                                <li>• Insurance Pool: 40% (40,000,000 GUARD)</li>
                                <li>• Protocol Treasury: 20% (20,000,000 GUARD)</li>
                                <li>• Team & Development: 15% (15,000,000 GUARD)</li>
                                <li>• Community Incentives: 15% (15,000,000 GUARD)</li>
                                <li>• Initial Liquidity: 10% (10,000,000 GUARD)</li>
                            </ul>
                            <div class="chart-container">
                                <!-- Add chart visualization here if needed -->
                            </div>
                        </div>
                    </div>
                </div>

                <div id="premium-management">
                    <h2 class="text-3xl font-bold mb-6">5.2 Premium Management</h2>
                    <p class="text-gray-300 mb-6">
                        The premium calculation system implements a dynamic pricing model that adjusts based on multiple factors:
                    </p>

                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <div class="code-block">
                            <pre><code class="language-solidity">contract PremiumCalculator {
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
}</code></pre>
                        </div>
                    </div>
                </div>

                <div id="yield-generation">
                    <h2 class="text-3xl font-bold mb-6">5.3 Yield Generation</h2>
                    <p class="text-gray-300 mb-6">
                        NexusGuard maximizes capital efficiency through sophisticated yield generation strategies:
                    </p>

                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <div class="code-block">
                            <pre><code class="language-solidity">contract YieldManager {
    struct YieldStrategy {
        uint256 allocation;
        uint256 expectedAPY;
        uint256 risk;
        bool active;
    }

    function optimizeYieldAllocation(
        uint256 availableLiquidity
    ) internal returns (uint256[] memory allocations) {
        return calculateOptimalAllocations(
            availableLiquidity,
            getCurrentYieldOpportunities()
        );
    }
}</code></pre>
                        </div>
                    </div>
                </div>

                <div id="tokenomics">
                    <h2 class="text-3xl font-bold mb-6">5.4 Tokenomics: The GUARD Token Ecosystem</h2>
                    
                    <div id="token-distribution">
                        <h3 class="text-2xl font-bold mb-4">5.4.1 Token Distribution and Vesting</h3>
                        <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                            <p class="text-gray-300 mb-4">Total Supply: 100,000,000 GUARD</p>
                            <div class="code-block">
                                <pre><code class="language-typescript">interface TokenDistribution {
    insurancePool: {
        allocation: 40_000_000, // 40%
        vesting: "No lock, operational reserve",
        purpose: "Coverage backing and claims settlement"
    },
    protocolTreasury: {
        allocation: 20_000_000, // 20%
        vesting: "5-year linear vesting",
        purpose: "Protocol development and ecosystem growth"
    },
    teamAndDevelopment: {
        allocation: 15_000_000, // 15%
        vesting: "3-year linear vesting with 1-year cliff",
        purpose: "Team compensation and development funding"
    },
    communityIncentives: {
        allocation: 15_000_000, // 15%
        vesting: "4-year linear release",
        purpose: "Staking rewards and community initiatives"
    },
    initialLiquidity: {
        allocation: 10_000_000, // 10%
        vesting: "6-month linear vesting",
        purpose: "Market making and initial liquidity"
    }
}</code></pre>
                            </div>
                        </div>
                    </div>

                    <div id="token-utility">
                        <h3 class="text-2xl font-bold mb-4">5.4.2 Token Utility and Value Accrual</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <!-- Governance Rights -->
                            <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20">
                                <h4 class="text-xl font-semibold mb-4 text-blue-400">Governance Rights</h4>
                                <div class="code-block">
                                    <pre><code class="language-solidity">contract GuardGovernance {
    struct VotingPower {
        uint256 baseVotes;
        uint256 stakingMultiplier;
        uint256 reputationBonus;
    }
}</code></pre>
                                </div>
                            </div>

                            <!-- Premium Discounts -->
                            <div class="bg-[#111] p-6 rounded-lg border border-purple-500/20">
                                <h4 class="text-xl font-semibold mb-4 text-purple-400">Premium Discounts</h4>
                                <div class="code-block">
                                    <pre><code class="language-solidity">contract PremiumDiscounts {
    struct DiscountTiers {
        uint256 bronzeThreshold;   // 1,000 GUARD
        uint256 silverThreshold;   // 5,000 GUARD
        uint256 goldThreshold;     // 10,000 GUARD
        uint256 platinumThreshold; // 50,000 GUARD
    }
}</code></pre>
                                </div>
                            </div>

                            <!-- Staking Rewards -->
                            <div class="bg-[#111] p-6 rounded-lg border border-cyan-500/20">
                                <h4 class="text-xl font-semibold mb-4 text-cyan-400">Staking Rewards</h4>
                                <div class="code-block">
                                    <pre><code class="language-solidity">contract StakingRewards {
    struct RewardStructure {
        uint256 baseAPY;        // 8% base rate
        uint256 bonusAPY;       // Up to 12% additional
        uint256 premiumShare;   // Share of protocol premiums
        uint256 yieldShare;     // Share of yield returns
    }
}</code></pre>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
  'governance-security': {
        title: 'Governance and Security',
        content: `
            <div class="doc-content">
                <h1 class="text-4xl font-bold mb-8 gradient-text">6. Governance and Security</h1>

                <div id="decentralized-governance">
                    <h2 class="text-3xl font-bold mb-6">6.1 Decentralized Governance</h2>
                    <p class="text-gray-300 mb-6">
                        The governance system ensures community-driven protocol evolution while maintaining operational security:
                    </p>

                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <div class="code-block">
                            <pre><code class="language-solidity">contract GovernanceSystem {
    struct Proposal {
        uint256 id;
        address proposer;
        uint256 startTime;
        uint256 endTime;
        bytes[] actions;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
    }

    function createProposal(
        bytes[] calldata actions,
        string calldata description
    ) external returns (uint256) {
        require(
            getVotingPower(msg.sender) >= proposalThreshold,
            "Insufficient voting power"
        );
        return _createProposal(actions, description);
    }
}</code></pre>
                        </div>
                    </div>
                </div>

                <div id="security-mechanisms">
                    <h2 class="text-3xl font-bold mb-6">6.2 Security Mechanisms</h2>
                    <p class="text-gray-300 mb-6">
                        Comprehensive security measures protect the protocol and its users:
                    </p>

                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <div class="code-block">
                            <pre><code class="language-solidity">contract SecuritySystem {
    struct SecurityCheck {
        bytes32 checkId;
        uint256 threshold;
        uint256 cooldownPeriod;
        bool isActive;
    }

    modifier withSecurityChecks(bytes32 operation) {
        require(
            validateOperation(operation),
            "Security check failed"
        );
        _;
        updateSecurityMetrics(operation);
    }
}</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    'applications-development': {
        title: 'Applications and Development',
        content: `
            <div class="doc-content">
                <h1 class="text-4xl font-bold mb-8 gradient-text">7. Practical Applications and Future Development</h1>

                <div id="real-world-use-cases">
                    <h2 class="text-3xl font-bold mb-6">7.1 Real-World Use Cases</h2>
                    <p class="text-gray-300 mb-6">
                        NexusGuard provides practical solutions for various DeFi scenarios:
                    </p>

                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <div class="code-block">
                            <pre><code class="language-typescript">interface InsuranceCaseStudy {
    protocol: {
        type: "Yield Aggregator" | "DEX" | "Lending" | "Bridge",
        coverage: {
            type: string,
            amount: number,
            duration: number
        },
        results: {
            userConfidence: number,
            tvlGrowth: number,
            riskReduction: number
        }
    }
}</code></pre>
                        </div>
                    </div>
                </div>

                <div id="development-roadmap">
                    <h2 class="text-3xl font-bold mb-6">7.2 Development Roadmap</h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <!-- Phase 1 -->
                        <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20">
                            <h3 class="text-xl font-semibold mb-4 text-blue-400">Phase 1: Foundation (Q1 2025)</h3>
                            <ul class="space-y-2 text-gray-300">
                                <li>• Core protocol deployment</li>
                                <li>• Basic risk assessment</li>
                                <li>• Initial governance implementation</li>
                                <li>• Coverage management system</li>
                            </ul>
                        </div>

                        <!-- Phase 2 -->
                        <div class="bg-[#111] p-6 rounded-lg border border-purple-500/20">
                            <h3 class="text-xl font-semibold mb-4 text-purple-400">Phase 2: Enhancement (Q2 2025)</h3>
                            <ul class="space-y-2 text-gray-300">
                                <li>• Advanced risk models</li>
                                <li>• Dynamic premium adjustment</li>
                                <li>• Yield strategy integration</li>
                                <li>• Enhanced governance features</li>
                            </ul>
                        </div>

                        <!-- Phase 3 -->
                        <div class="bg-[#111] p-6 rounded-lg border border-cyan-500/20">
                            <h3 class="text-xl font-semibold mb-4 text-cyan-400">Phase 3: Scaling (Q3-Q4 2025)</h3>
                            <ul class="space-y-2 text-gray-300">
                                <li>• Cross-chain integration</li>
                                <li>• Advanced analytics</li>
                                <li>• Partner ecosystem development</li>
                                <li>• Market expansion</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    'technical-specifications': {
        title: 'Technical Specifications',
        content: `
            <div class="doc-content">
                <h1 class="text-4xl font-bold mb-8 gradient-text">8. Technical Specifications</h1>

                <div id="protocol-parameters">
                    <h2 class="text-3xl font-bold mb-6">8.1 Protocol Parameters</h2>
                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <div class="code-block">
                            <pre><code class="language-solidity">contract SystemParameters {
    // Risk Assessment Parameters
    uint256 public constant MAX_RISK_SCORE = 10000; // 100%
    uint256 public constant MIN_RISK_SCORE = 1000;  // 10%
    uint256 public constant RISK_DECIMALS = 4;

    // Premium Calculation Parameters
    uint256 public constant MAX_PREMIUM_RATE = 5000; // 50% annual
    uint256 public constant MIN_PREMIUM_RATE = 100;  // 1% annual
    uint256 public constant PREMIUM_DECIMALS = 6;

    // Protocol Limits
    uint256 public constant MAX_COVERAGE_RATIO = 5000; // 50% of TVL
    uint256 public constant MIN_COVERAGE_DURATION = 30 days;
    uint256 public constant MAX_COVERAGE_DURATION = 365 days;
}</code></pre>
                        </div>
                    </div>
                </div>

                <div id="performance-specifications">
                    <h2 class="text-3xl font-bold mb-6">8.2 Performance Specifications</h2>
                    <p class="text-gray-300 mb-6">
                        The protocol meets or exceeds the following performance metrics:
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20">
                            <h3 class="text-xl font-semibold mb-4 text-blue-400">Transaction Processing</h3>
                            <ul class="space-y-2 text-gray-300">
                                <li>• Coverage Purchase: 180,000 gas (average)</li>
                                <li>• Claim Submission: 150,000 gas (average)</li>
                                <li>• Risk Assessment: 120,000 gas (average)</li>
                                <li>• Yield Harvesting: 250,000 gas (average)</li>
                            </ul>
                        </div>

                        <div class="bg-[#111] p-6 rounded-lg border border-purple-500/20">
                            <h3 class="text-xl font-semibold mb-4 text-purple-400">System Capacity</h3>
                            <ul class="space-y-2 text-gray-300">
                                <li>• Maximum Concurrent Users: 10,000</li>
                                <li>• Transaction Throughput: 100 TPS</li>
                                <li>• State Growth: Linear</li>
                                <li>• Response Time: < 3 seconds</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
  'integration-guidelines': {
        title: 'Integration Guidelines',
        content: `
            <div class="doc-content">
                <h1 class="text-4xl font-bold mb-8 gradient-text">9. Integration Guidelines</h1>

                <div id="getting-started">
                    <h2 class="text-3xl font-bold mb-6">9.1 Getting Started</h2>
                    <p class="text-gray-300 mb-6">First Steps:</p>

                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <div class="code-block">
                            <pre><code class="language-typescript">class NexusGuardClient {
    private provider: ethers.providers.Provider;
    private protocol: NexusGuardProtocol;

    constructor(config: NexusGuardConfig) {
        this.provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
        this.protocol = NexusGuardProtocol.connect(
            config.protocolAddress,
            this.provider
        );
    }

    async initialize(): Promise<void> {
        await this.validateConnection();
        await this.syncProtocolState();
        console.log("NexusGuard client initialized successfully");
    }
}</code></pre>
                        </div>
                    </div>
                </div>

                <div id="implementation-examples">
                    <h2 class="text-3xl font-bold mb-6">9.2 Implementation Examples</h2>
                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <h3 class="text-xl font-semibold mb-4">Coverage Integration</h3>
                        <div class="code-block">
                            <pre><code class="language-typescript">class CoverageManager {
    async purchaseCoverage(
        projectAddress: string,
        amount: BigNumber,
        duration: number
    ): Promise<CoverageDetails> {
        // Calculate risk score and premium
        const riskScore = await this.assessProjectRisk(projectAddress);
        const premium = await this.calculatePremium(amount, duration, riskScore);

        // Execute coverage purchase
        const tx = await this.protocol.purchaseCoverage(
            projectAddress,
            amount,
            duration,
            { value: premium }
        );

        // Wait for confirmation and return details
        const receipt = await tx.wait();
        return this.processCoverageReceipt(receipt);
    }
}</code></pre>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    'mathematical-appendix': {
        title: 'Mathematical Appendix',
        content: `
            <div class="doc-content">
                <h1 class="text-4xl font-bold mb-8 gradient-text">10. Mathematical Appendix</h1>

                <div id="risk-assessment-formulas">
                    <h2 class="text-3xl font-bold mb-6">10.1 Risk Assessment Formulas</h2>
                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <h3 class="text-xl font-semibold mb-4">Base Risk Score Calculation</h3>
                        <div class="formula-block p-4 bg-black/30 rounded mb-4">
                            <p class="text-lg text-gray-300">R = Σ(Wi * Si) * Vm</p>
                        </div>
                        <div class="mt-4">
                            <p class="text-gray-300 mb-2">Where:</p>
                            <ul class="space-y-2 text-gray-300">
                                <li>R = Final risk score</li>
                                <li>Wi = Weight of factor i</li>
                                <li>Si = Score of factor i</li>
                                <li>Vm = Volatility multiplier</li>
                            </ul>
                        </div>
                        <div class="mt-6">
                            <p class="text-gray-300 mb-2">Components:</p>
                            <ul class="space-y-2 text-gray-300">
                                <li>• Audit Score (W1 = 0.20)</li>
                                <li>• TVL Score (W2 = 0.30)</li>
                                <li>• Time Score (W3 = 0.15)</li>
                                <li>• Complexity Score (W4 = 0.20)</li>
                                <li>• Volatility Score (W5 = 0.15)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="premium-calculation-model">
                    <h2 class="text-3xl font-bold mb-6">10.2 Premium Calculation Model</h2>
                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <h3 class="text-xl font-semibold mb-4">Dynamic Premium Formula</h3>
                        <div class="formula-block p-4 bg-black/30 rounded mb-4">
                            <p class="text-lg text-gray-300">P = C * Rb * Rm * Dt * (1 + Da) * (1 - Ds)</p>
                        </div>
                        <div class="mt-4">
                            <p class="text-gray-300 mb-2">Where:</p>
                            <ul class="space-y-2 text-gray-300">
                                <li>P = Final premium</li>
                                <li>C = Coverage amount</li>
                                <li>Rb = Base rate for tier</li>
                                <li>Rm = Risk multiplier</li>
                                <li>Dt = Duration factor</li>
                                <li>Da = Dynamic adjustment</li>
                                <li>Ds = Discount factor</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="capital-efficiency-model">
                    <h2 class="text-3xl font-bold mb-6">10.3 Capital Efficiency Model</h2>
                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <h3 class="text-xl font-semibold mb-4">Optimal Allocation Formula</h3>
                        <div class="formula-block p-4 bg-black/30 rounded mb-4">
                            <p class="text-lg text-gray-300">Ai = Li * (Wi * Ri) / Σ(Wj * Rj)</p>
                        </div>
                        <div class="mt-4">
                            <p class="text-gray-300 mb-2">Where:</p>
                            <ul class="space-y-2 text-gray-300">
                                <li>Ai = Allocation to strategy i</li>
                                <li>Li = Available liquidity</li>
                                <li>Wi = Weight of strategy i</li>
                                <li>Ri = Expected return of strategy i</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    'glossary': {
        title: 'Glossary of Terms',
        content: `
            <div class="doc-content">
                <h1 class="text-4xl font-bold mb-8 gradient-text">11. Glossary of Terms</h1>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20">
                        <dl class="space-y-4">
                            <div>
                                <dt class="text-xl font-semibold text-blue-400">APY (Annual Percentage Yield)</dt>
                                <dd class="text-gray-300 mt-2">The effective annual rate of return considering compound interest.</dd>
                            </div>
                            <div>
                                <dt class="text-xl font-semibold text-blue-400">Collateralization Ratio</dt>
                                <dd class="text-gray-300 mt-2">The ratio of collateral value to the coverage amount.</dd>
                            </div>
                            <div>
                                <dt class="text-xl font-semibold text-blue-400">Dynamic Risk Assessment</dt>
                                <dd class="text-gray-300 mt-2">Continuous evaluation of risk factors with real-time adjustments.</dd>
                            </div>
                        </dl>
                    </div>

                    <div class="bg-[#111] p-6 rounded-lg border border-purple-500/20">
                        <dl class="space-y-4">
                            <div>
                                <dt class="text-xl font-semibold text-purple-400">ERC4626</dt>
                                <dd class="text-gray-300 mt-2">A standard interface for tokenized vault strategies.</dd>
                            </div>
                            <div>
                                <dt class="text-xl font-semibold text-purple-400">Gas Optimization</dt>
                                <dd class="text-gray-300 mt-2">Techniques to reduce transaction costs on the blockchain.</dd>
                            </div>
                            <div>
                                <dt class="text-xl font-semibold text-purple-400">Health Factor</dt>
                                <dd class="text-gray-300 mt-2">A metric indicating the overall health of the protocol.</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        `
    },

    'conclusion': {
        title: 'Conclusion',
        content: `
            <div class="doc-content">
                <h1 class="text-4xl font-bold mb-8 gradient-text">12. Conclusion and Future Directions</h1>

                <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                    <p class="text-gray-300 mb-6">
                        As the DeFi ecosystem continues to evolve, NexusGuard stands at the forefront of blockchain insurance innovation. 
                        Through its sophisticated risk assessment mechanisms, dynamic premium calculations, and robust governance framework, 
                        the protocol provides a comprehensive solution to the pressing challenges facing decentralized finance.
                    </p>
                </div>

                <div id="key-achievements">
                    <h2 class="text-3xl font-bold mb-6">12.1 Key Achievements</h2>
                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20 mb-8">
                        <ul class="space-y-2 text-gray-300">
                            <li>• Real-time risk assessment incorporating market dynamics</li>
                            <li>• Automated claims processing with stake-based validation</li>
                            <li>• Efficient capital utilization through yield generation</li>
                            <li>• Decentralized governance with specialized roles</li>
                            <li>• Dynamic premium adjustment based on multiple risk factors</li>
                        </ul>
                    </div>
                </div>

                <div id="future-research">
                    <h2 class="text-3xl font-bold mb-6">12.2 Future Research Directions</h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20">
                            <h3 class="text-xl font-semibold mb-4 text-blue-400">Machine Learning Integration</h3>
                            <div class="code-block">
                                <pre><code class="language-python">class RiskML:
    """Next-generation risk assessment using machine learning"""
    def __init__(self):
        self.model = DeepLearningModel()
        self.risk_factors = RiskFactorAnalyzer()

    async def predict_risk(self, protocol_data: ProtocolData) -> RiskScore:
        features = await self.risk_factors.extract_features(protocol_data)
        return self.model.predict(features)</code></pre>
                            </div>
                        </div>

                        <div class="bg-[#111] p-6 rounded-lg border border-purple-500/20">
                            <h3 class="text-xl font-semibold mb-4 text-purple-400">Cross-Chain Risk Assessment</h3>
                            <div class="code-block">
                                <pre><code class="language-solidity">interface ICrossChainRisk {
    function evaluateCrossChainRisk(
        address[] calldata protocols,
        uint256[] calldata chainIds
    ) external view returns (
        uint256 globalRiskScore,
        RiskBreakdown[] memory chainBreakdown
    );
}</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
};

// Navigation and content loading functionality
document.addEventListener('DOMContentLoaded', function() {
    // Debug logging
    console.log('Documentation JS loaded');
    
    // Initialize content
    const defaultSection = window.location.hash.slice(1) || 'abstract';
    loadContent(defaultSection);
    
    // Add event listeners for navigation
    document.querySelectorAll('.doc-link').forEach(link => {
        link.addEventListener('click', function(e) {
            const sectionId = this.textContent.toLowerCase().replace(/[\d\.\s]+/g, '').trim();
            toggleSection(sectionId);
        });
    });
    
    document.querySelectorAll('.doc-sublink').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').replace('#', '');
            loadContent(sectionId);
            
            // Update active states
            document.querySelectorAll('.doc-sublink').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

function toggleSection(sectionId) {
    const subsections = document.getElementById(`${sectionId}-subsections`);
    const arrow = document.getElementById(`${sectionId}-arrow`);
    
    if (subsections) {
        subsections.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
    }
    
    // Load main section content if available
    if (documentationContent[sectionId]) {
        loadContent(sectionId);
    }
}

function loadContent(sectionId) {
    console.log('Loading section:', sectionId);
    const mainContent = document.getElementById('mainContent');
    const content = documentationContent[sectionId];
    
    if (content) {
        mainContent.classList.add('animate-pulse');
        
        setTimeout(() => {
            mainContent.innerHTML = content.content;
            mainContent.classList.remove('animate-pulse');
            
            // Initialize syntax highlighting
            if (typeof Prism !== 'undefined') {
                Prism.highlightAll();
            }
            
            // Scroll to top
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    } else {
        console.error('Section not found:', sectionId);
    }
}
