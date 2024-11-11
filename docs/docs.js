// docs.js - Part 1

const documentationContent = {
    'introduction': {
        title: 'Introduction',
        content: `...`
    },
    'protocol-overview': {
        title: 'Protocol Overview',
        content: `...`
    },
            <div class="doc-content">
                <h1>Introduction</h1>
                <div class="info-card mb-8">
                    <p class="text-lg">NexusGuard is a pioneering decentralized insurance protocol specifically engineered for DeFi projects on the Sonic blockchain.</p>
                </div>
                
                <h2>The DeFi Insurance Challenge</h2>
                <p>The exponential growth of decentralized finance has created an urgent need for robust insurance solutions. As the DeFi ecosystem expands, traditional insurance models have proven inadequate in addressing the unique challenges posed by blockchain-based financial protocols.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20">
                        <h3 class="text-xl font-semibold mb-4">Key Challenges</h3>
                        <ul class="space-y-2">
                            <li>• Smart contract vulnerabilities</li>
                            <li>• Oracle failures</li>
                            <li>• Governance attacks</li>
                            <li>• Flash loan exploits</li>
                            <li>• Cross-chain bridge failures</li>
                            <li>• Protocol-specific risks</li>
                        </ul>
                    </div>
                    <div class="bg-[#111] p-6 rounded-lg border border-purple-500/20">
                        <h3 class="text-xl font-semibold mb-4">Our Solution</h3>
                        <ul class="space-y-2">
                            <li>• Dynamic multi-factor risk assessment</li>
                            <li>• Real-time risk monitoring</li>
                            <li>• Automated risk mitigation</li>
                            <li>• Market condition integration</li>
                        </ul>
                    </div>
                </div>

                <h2>Coverage Mechanisms</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div class="bg-[#111] p-4 rounded-lg border border-blue-500/20">
                        <h4 class="font-semibold mb-2">Smart Contract Protection</h4>
                        <p class="text-sm text-gray-400">Comprehensive coverage against vulnerabilities and exploits</p>
                    </div>
                    <div class="bg-[#111] p-4 rounded-lg border border-purple-500/20">
                        <h4 class="font-semibold mb-2">Protocol Coverage</h4>
                        <p class="text-sm text-gray-400">Protection against technical failures and malfunctions</p>
                    </div>
                    <div class="bg-[#111] p-4 rounded-lg border border-cyan-500/20">
                        <h4 class="font-semibold mb-2">Bridge Protection</h4>
                        <p class="text-sm text-gray-400">Coverage for cross-chain operations and bridges</p>
                    </div>
                </div>
            </div>
        `
    },
    };
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded'); // Debug log
    const mainContent = document.getElementById('mainContent');
    const links = document.querySelectorAll('.doc-link');

    function loadContent(sectionId) {
        console.log('Loading section:', sectionId); // Debug log
        const section = documentationContent[sectionId];
        if (section) {
            mainContent.classList.add('animate-pulse');
            setTimeout(() => {
                mainContent.innerHTML = section.content;
                mainContent.classList.remove('animate-pulse');
                
                // Update active state
                links.forEach(link => link.classList.remove('active'));
                document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
            }, 200);
        } else {
            console.error('Section not found:', sectionId); // Debug log
        }
    }

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = e.currentTarget.getAttribute('href').replace('#', '');
            loadContent(sectionId);
        });
    });

    // Load default section or from hash
    const defaultSection = window.location.hash.slice(1) || 'introduction';
    loadContent(defaultSection);
});
     // Add click handlers to navigation
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = e.currentTarget.getAttribute('href').replace('#', '');
            loadContent(sectionId);
        });
    });

    // Load default section or from hash
    const defaultSection = window.location.hash ? window.location.hash.replace('#', '') : 'introduction';
    loadContent(defaultSection);
});

'yield-strategies': {
    title: 'Yield Strategies',
    content: `
        <div class="doc-content">
            <h2>Yield Generation Strategies</h2>
            
            <div class="space-y-6">
                <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20">
                    <h3>Core Yield Components</h3>
                    <div class="code-block">
                        <pre><code>contract YieldManager {
    struct YieldStrategy {
        uint256 allocation;
        uint256 expectedAPY;
        uint256 risk;
        bool active;
    }
    function toggleSection(sectionId) {
    const subsections = document.getElementById(`${sectionId}-subsections`);
    const arrow = document.getElementById(`${sectionId}-arrow`);
    
    subsections.classList.toggle('hidden');
    arrow.classList.toggle('rotate-180');
}

function loadContent(contentId) {
    const mainContent = document.getElementById('mainContent');
    const content = documentationContent[contentId];
    
    if (content) {
        mainContent.innerHTML = content;
        // Highlight code blocks if present
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    }
}
    function optimizeYieldAllocation(
        uint256 availableLiquidity
    ) internal returns (uint256[] memory allocations) {
        return calculateOptimalAllocations(
            availableLiquidity,
            getCurrentYieldOpportunities()
        );
    }

    function harvestYields() external {
        // Yield harvesting logic
    }
}</code></pre>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20">
                        <h4 class="text-xl font-semibold mb-4">Strategy Types</h4>
                        <ul class="space-y-2">
                            <li>• Lending Markets</li>
                            <li>• Liquidity Provision</li>
                            <li>• Yield Farming</li>
                            <li>• Options Writing</li>
                        </ul>
                    </div>
                    <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20">
                        <h4 class="text-xl font-semibold mb-4">Risk Management</h4>
                        <ul class="space-y-2">
                            <li>• Strategy Diversification</li>
                            <li>• Risk-Adjusted Returns</li>
                            <li>• Dynamic Rebalancing</li>
                            <li>• Impermanent Loss Protection</li>
                        </ul>
                    </div>
                </div>

                <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20">
                    <h3>Yield Optimization Algorithm</h3>
                    <div class="code-block">
                        <pre><code>function optimizeYieldAllocation(
    StrategyInfo[] memory strategies,
    uint256 totalLiquidity
) internal pure returns (uint256[] memory) {
    uint256[] memory allocations = new uint256[](strategies.length);
    
    // Sort strategies by risk-adjusted returns
    strategies = sortByRiskAdjustedReturn(strategies);
    
    // Allocate based on Kelly Criterion
    for (uint256 i = 0; i < strategies.length; i++) {
        allocations[i] = calculateKellyAllocation(
            strategies[i],
            totalLiquidity
        );
    }
    
    return allocations;
}</code></pre>
                    </div>
                </div>

                <div class="bg-[#111] p-6 rounded-lg border border-blue-500/20">
                    <h3>Performance Metrics</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="p-4 bg-black/30 rounded-lg">
                            <h4 class="font-semibold mb-2">Expected APY</h4>
                            <p class="text-2xl text-blue-500">12-25%</p>
                        </div>
                        <div class="p-4 bg-black/30 rounded-lg">
                            <h4 class="font-semibold mb-2">Risk Score</h4>
                            <p class="text-2xl text-purple-500">Low-Medium</p>
                        </div>
                        <div class="p-4 bg-black/30 rounded-lg">
                            <h4 class="font-semibold mb-2">Rebalancing</h4>
                            <p class="text-2xl text-cyan-500">Weekly</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}
<code>contract NexusGuardDeFiProtocolV1 is
    Initializable,
    NexusGuardGovernance,
    NexusGuardInsurance
{
    using SafeERC20Upgradeable for IERC20Upgradeable;

    struct ProtocolState {
        bool isActive;
        uint256 lastUpdateBlock;
        uint256 totalValueLocked;
        uint256 totalCoverage;
        uint256 healthFactor;
    }

    // Implementation details...
}</code></pre>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Key Implementation Features</h3>
                    <ul class="space-y-2 text-gray-600">
                        <li>• Proxy-based upgradeability for protocol evolution</li>
                        <li>• Role-based access control for security</li>
                        <li>• Comprehensive reentrancy protection</li>
                        <li>• Emergency pause functionality</li>
                        <li>• Optimized gas consumption</li>
                    </ul>
                </div>
            </div>
        `
    },

    'risk-assessment': {
        title: 'Risk Assessment',
        content: `
            <h2 class="text-3xl font-bold mb-6">Risk Assessment Engine</h2>
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Risk Calculation Implementation</h3>
                    <pre class="bg-gray-100 p-4 rounded overflow-x-auto">
<code>library RiskCalculation {
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

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Dynamic Risk Assessment</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 class="font-semibold mb-2">Risk Factors</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Audit Score (20%)</li>
                                <li>• TVL Score (30%)</li>
                                <li>• Time Score (15%)</li>
                                <li>• Complexity Score (20%)</li>
                                <li>• Volatility Score (15%)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-2">Market Integration</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Real-time monitoring</li>
                                <li>• Market condition analysis</li>
                                <li>• Volatility tracking</li>
                                <li>• Historical data analysis</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    'coverage-types': {
        title: 'Coverage Types',
        content: `
            <h2 class="text-3xl font-bold mb-6">Coverage Types</h2>
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Available Coverage Options</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold mb-2">Smart Contract Coverage</h4>
                            <p class="text-gray-600 mb-4">Protection against:</p>
                            <ul class="list-disc pl-6 text-gray-600">
                                <li>Code vulnerabilities</li>
                                <li>Logic errors</li>
                                <li>Optimization issues</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-2">Protocol Coverage</h4>
                            <p class="text-gray-600 mb-4">Protection against:</p>
                            <ul class="list-disc pl-6 text-gray-600">
                                <li>Oracle failures</li>
                                <li>Governance attacks</li>
                                <li>Economic exploits</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Coverage Implementation</h3>
                    <pre class="bg-gray-100 p-4 rounded overflow-x-auto">
<code>contract CoverageManager {
    struct Coverage {
        uint256 coverageAmount;
        uint256 premium;
        uint256 duration;
        CoverageType coverageType;
        uint256 startTime;
        bool isActive;
    }

    enum CoverageType {
        SMART_CONTRACT,
        ORACLE_FAILURE,
        GOVERNANCE_ATTACK,
        ECONOMIC_EXPLOIT
    }
}</code></pre>
                </div>
            </div>
        `
    },
};

    'premium-calculation': {
        title: 'Premium Model',
        content: `
            <h2 class="text-3xl font-bold mb-6">Premium Calculation Model</h2>
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Dynamic Premium Calculation</h3>
                    <pre class="bg-gray-100 p-4 rounded overflow-x-auto">
<code>contract PremiumCalculator {
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

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Premium Components</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold mb-2">Base Factors</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Base Rate: 1-5% annual</li>
                                <li>• Risk Multiplier: 1x-3x</li>
                                <li>• Duration Factor: 0.8x-1.5x</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-2">Market Adjustments</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Utilization-based adjustment</li>
                                <li>• Market volatility factor</li>
                                <li>• Protocol health multiplier</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    'claims-process': {
        title: 'Claims Processing',
        content: `
            <h2 class="text-3xl font-bold mb-6">Claims Processing System</h2>
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Claims Flow</h3>
                    <div class="space-y-4">
                        <div class="border-l-4 border-blue-500 pl-4">
                            <h4 class="font-semibold">1. Claim Submission</h4>
                            <p class="text-gray-600">Users submit claims with evidence of covered events</p>
                        </div>
                        <div class="border-l-4 border-green-500 pl-4">
                            <h4 class="font-semibold">2. Automated Verification</h4>
                            <p class="text-gray-600">Smart contracts verify claim conditions</p>
                        </div>
                        <div class="border-l-4 border-yellow-500 pl-4">
                            <h4 class="font-semibold">3. Stake-Based Validation</h4>
                            <p class="text-gray-600">Validators assess and vote on claims</p>
                        </div>
                        <div class="border-l-4 border-purple-500 pl-4">
                            <h4 class="font-semibold">4. Settlement</h4>
                            <p class="text-gray-600">Automatic payout for approved claims</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Claims Contract Implementation</h3>
                    <pre class="bg-gray-100 p-4 rounded overflow-x-auto">
<code>contract ClaimsProcessor {
    struct Claim {
        uint256 claimId;
        address claimant;
        uint256 coverageId;
        uint256 amount;
        ClaimStatus status;
        uint256 timestamp;
        bytes evidence;
    }

    enum ClaimStatus {
        PENDING,
        IN_REVIEW,
        APPROVED,
        REJECTED,
        SETTLED
    }

    function submitClaim(
        uint256 coverageId,
        uint256 amount,
        bytes calldata evidence
    ) external returns (uint256 claimId) {
        // Claim submission logic
    }

    function validateClaim(
        uint256 claimId,
        bool approved,
        string calldata reason
    ) external onlyValidator {
        // Validation logic
    }
}</code></pre>
                </div>
            </div>
        `
    },

    'tokenomics': {
        title: 'Tokenomics',
        content: `
            <h2 class="text-3xl font-bold mb-6">GUARD Token Economics</h2>
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Token Distribution</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold mb-2">Initial Allocation</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Insurance Pool: 40% (40M GUARD)</li>
                                <li>• Protocol Treasury: 20% (20M GUARD)</li>
                                <li>• Team & Development: 15% (15M GUARD)</li>
                                <li>• Community Incentives: 15% (15M GUARD)</li>
                                <li>• Initial Liquidity: 10% (10M GUARD)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-2">Vesting Schedule</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Team: 3-year linear vesting</li>
                                <li>• Development: 4-year linear vesting</li>
                                <li>• Community: 2-year progressive release</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Token Utility</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="p-4 bg-gray-50 rounded">
                            <h4 class="font-semibold mb-2">Governance</h4>
                            <p class="text-gray-600">Voting rights and protocol management</p>
                        </div>
                        <div class="p-4 bg-gray-50 rounded">
                            <h4 class="font-semibold mb-2">Staking</h4>
                            <p class="text-gray-600">Earn rewards and premium shares</p>
                        </div>
                        <div class="p-4 bg-gray-50 rounded">
                            <h4 class="font-semibold mb-2">Coverage</h4>
                            <p class="text-gray-600">Premium discounts and priority</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

};

    'staking': {
        title: 'Staking System',
        content: `
            <h2 class="text-3xl font-bold mb-6">Staking Mechanism</h2>
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Staking Implementation</h3>
                    <pre class="bg-gray-100 p-4 rounded overflow-x-auto">
<code>contract StakingSystem {
    struct Stake {
        uint256 amount;
        uint256 stakingStart;
        uint256 lockPeriod;
        uint256 rewardDebt;
        StakingTier tier;
    }

    enum StakingTier {
        BASIC,      // 1 month lock
        SILVER,     // 3 months lock
        GOLD,       // 6 months lock
        PLATINUM    // 12 months lock
    }

    mapping(address => Stake) public stakes;
    
    function stake(uint256 amount, uint256 lockPeriod) external {
        // Staking logic
    }

    function calculateRewards(address staker) public view returns (uint256) {
        // Reward calculation logic
    }
}</code></pre>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Staking Benefits</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold mb-2">Reward Structure</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Base APY: 8-12%</li>
                                <li>• Premium Sharing: 20% of protocol fees</li>
                                <li>• Bonus Rewards: Up to 50% additional APY</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-2">Governance Rights</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Voting power boost</li>
                                <li>• Proposal rights</li>
                                <li>• Parameter adjustment voting</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    'governance': {
        title: 'Governance',
        content: `
            <h2 class="text-3xl font-bold mb-6">Decentralized Governance</h2>
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Governance System</h3>
                    <pre class="bg-gray-100 p-4 rounded overflow-x-auto">
<code>contract GovernanceSystem {
    struct Proposal {
        uint256 id;
        address proposer;
        uint256 startBlock;
        uint256 endBlock;
        string description;
        bytes[] actions;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
        mapping(address => bool) hasVoted;
    }

    function propose(
        bytes[] calldata actions,
        string calldata description
    ) external returns (uint256) {
        require(
            getVotingPower(msg.sender) >= proposalThreshold,
            "Insufficient voting power"
        );
        // Proposal creation logic
    }

    function castVote(uint256 proposalId, bool support) 
        external {
        // Voting logic
    }
}</code></pre>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Governance Parameters</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold mb-2">Voting Configuration</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Proposal Threshold: 100,000 GUARD</li>
                                <li>• Voting Period: 7 days</li>
                                <li>• Execution Delay: 2 days</li>
                                <li>• Minimum Quorum: 4%</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-2">Adjustable Parameters</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Premium rates</li>
                                <li>• Risk parameters</li>
                                <li>• Coverage limits</li>
                                <li>• Protocol fees</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    'yield-strategies': {
        title: 'Yield Strategies',
        content: `
            <h2 class="text-3xl font-bold mb-6">Yield Generation Strategies</h2>
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Yield Management</h3>
                    <pre class="bg-gray-100 p-4 rounded overflow-x-auto">
<code>contract YieldManager {
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

    function harvestYields() external {
        // Yield harvesting logic
    }
}</code></pre>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Strategy Components</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="p-4 bg-gray-50 rounded">
                            <h4 class="font-semibold mb-2">Lending Markets</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Supply lending</li>
                                <li>• Borrowing optimization</li>
                                <li>• Interest rate arbitrage</li>
                            </ul>
                        </div>
                        <div class="p-4 bg-gray-50 rounded">
                            <h4 class="font-semibold mb-2">Liquidity Provision</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• AMM liquidity</li>
                                <li>• Concentrated positions</li>
                                <li>• Range orders</li>
                            </ul>
                        </div>
                        <div class="p-4 bg-gray-50 rounded">
                            <h4 class="font-semibold mb-2">Yield Farming</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Protocol incentives</li>
                                <li>• Reward optimization</li>
                                <li>• Compounding strategies</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    'security': {
        title: 'Security Features',
        content: `
            <h2 class="text-3xl font-bold mb-6">Security Implementation</h2>
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Security Measures</h3>
                    <pre class="bg-gray-100 p-4 rounded overflow-x-auto">
<code>contract SecuritySystem {
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

    function validateOperation(
        bytes32 operation
    ) internal returns (bool) {
        // Security validation logic
    }
}</code></pre>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Security Features</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold mb-2">Smart Contract Security</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Multi-signature controls</li>
                                <li>• Time-locks</li>
                                <li>• Circuit breakers</li>
                                <li>• Access controls</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-2">Operational Security</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Real-time monitoring</li>
                                <li>• Automated auditing</li>
                                <li>• Risk thresholds</li>
                                <li>• Emergency responses</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

};

    'integration': {
        title: 'Integration Guide',
        content: `
            <h2 class="text-3xl font-bold mb-6">Integration Guide</h2>
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Quick Start</h3>
                    <pre class="bg-gray-100 p-4 rounded overflow-x-auto">
<code>// Initialize NexusGuard Client
const nexusGuard = new NexusGuardClient({
    rpcUrl: 'YOUR_RPC_URL',
    chainId: SONIC_CHAIN_ID,
    contractAddress: NEXUSGUARD_ADDRESS
});

// Request Coverage
const coverage = await nexusGuard.requestCoverage({
    projectAddress: YOUR_PROJECT_ADDRESS,
    coverageAmount: ethers.utils.parseEther("100000"),
    duration: 30 * 24 * 60 * 60 // 30 days
});

// Purchase Coverage
const tx = await nexusGuard.purchaseCoverage(
    coverage.id,
    coverage.premium
);</code></pre>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Integration Steps</h3>
                    <div class="space-y-4">
                        <div class="border-l-4 border-blue-500 pl-4">
                            <h4 class="font-semibold">1. Contract Integration</h4>
                            <p class="text-gray-600">Import and initialize NexusGuard contracts</p>
                            <pre class="bg-gray-100 p-4 rounded mt-2">
<code>import "@nexusguard/contracts/NexusGuardMain.sol";
import "@nexusguard/contracts/interfaces/INexusGuard.sol";</code></pre>
                        </div>
                        <div class="border-l-4 border-green-500 pl-4">
                            <h4 class="font-semibold">2. Risk Assessment Setup</h4>
                            <p class="text-gray-600">Implement risk assessment callbacks</p>
                            <pre class="bg-gray-100 p-4 rounded mt-2">
<code>function onRiskAssessment() external override returns (uint256) {
    // Implement risk assessment logic
    return calculateProjectRisk();
}</code></pre>
                        </div>
                        <div class="border-l-4 border-yellow-500 pl-4">
                            <h4 class="font-semibold">3. Coverage Management</h4>
                            <p class="text-gray-600">Handle coverage lifecycle events</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    'api-reference': {
        title: 'API Reference',
        content: `
            <h2 class="text-3xl font-bold mb-6">API Reference</h2>
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Core API Endpoints</h3>
                    <div class="space-y-4">
                        <div class="border-b pb-4">
                            <h4 class="font-semibold text-blue-600">GET /api/v1/coverage/quote</h4>
                            <p class="text-gray-600 mt-2">Get coverage quote for specified parameters</p>
                            <pre class="bg-gray-100 p-4 rounded mt-2">
<code>{
  "projectAddress": "0x...",
  "coverageAmount": "1000000000000000000000",
  "duration": 2592000,
  "coverageType": "SMART_CONTRACT"
}</code></pre>
                        </div>
                        <div class="border-b pb-4">
                            <h4 class="font-semibold text-green-600">POST /api/v1/coverage/purchase</h4>
                            <p class="text-gray-600 mt-2">Purchase coverage with quote</p>
                        </div>
                        <div class="border-b pb-4">
                            <h4 class="font-semibold text-purple-600">POST /api/v1/claims/submit</h4>
                            <p class="text-gray-600 mt-2">Submit insurance claim</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">SDK Implementation</h3>
                    <pre class="bg-gray-100 p-4 rounded overflow-x-auto">
<code>class NexusGuardSDK {
    constructor(config) {
        this.provider = new ethers.providers.JsonRpcProvider(
            config.rpcUrl
        );
        this.contract = NexusGuardContract.connect(
            config.contractAddress,
            this.provider
        );
    }

    async getCoverageQuote(params) {
        return this.contract.calculatePremium(
            params.coverageAmount,
            params.duration,
            params.coverageType
        );
    }

    async purchaseCoverage(quoteId, options) {
        return this.contract.purchaseCoverage(
            quoteId,
            options
        );
    }
}</code></pre>
                </div>
            </div>
        `
    },

    'audits': {
        title: 'Audit Reports',
        content: `
            <h2 class="text-3xl font-bold mb-6">Security Audits</h2>
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Audit Summary</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold mb-2">Primary Audit</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Auditor: CertiK</li>
                                <li>• Date: October 2024</li>
                                <li>• Status: Passed</li>
                                <li>• Critical Issues: 0</li>
                                <li>• Major Issues: 0</li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-2">Secondary Audit</h4>
                            <ul class="space-y-2 text-gray-600">
                                <li>• Auditor: ChainSecurity</li>
                                <li>• Date: September 2024</li>
                                <li>• Status: Passed</li>
                                <li>• Critical Issues: 0</li>
                                <li>• Major Issues: 0</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Security Measures</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div class="p-4 bg-gray-50 rounded">
                            <h4 class="font-semibold mb-2">Code Coverage</h4>
                            <p class="text-gray-600">100% test coverage across all critical functions</p>
                        </div>
                        <div class="p-4 bg-gray-50 rounded">
                            <h4 class="font-semibold mb-2">Formal Verification</h4>
                            <p class="text-gray-600">Mathematical proof of critical components</p>
                        </div>
                        <div class="p-4 bg-gray-50 rounded">
                            <h4 class="font-semibold mb-2">Continuous Monitoring</h4>
                            <p class="text-gray-600">24/7 security monitoring and alerts</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

};

    'roadmap': {
        title: 'Development Roadmap',
        content: `
            <h2 class="text-3xl font-bold mb-6">Project Roadmap</h2>
            <div class="space-y-6">
                <div class="relative">
                    <!-- Timeline Line -->
                    <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-600"></div>

                    <!-- Phase 1: Foundation -->
                    <div class="relative flex items-center mb-12">
                        <div class="w-1/2 pr-8 text-right">
                            <div class="bg-white p-6 rounded-lg shadow-sm">
                                <h3 class="text-xl font-bold mb-2">Phase 1: Foundation</h3>
                                <p class="text-gray-600 mb-2">Q1 2025</p>
                                <ul class="text-gray-600 space-y-1">
                                    <li>• Core protocol deployment</li>
                                    <li>• Basic risk assessment</li>
                                    <li>• Initial governance implementation</li>
                                    <li>• Coverage management system</li>
                                </ul>
                            </div>
                        </div>
                        <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
                        <div class="w-1/2 pl-8"></div>
                    </div>

                    <!-- Phase 2: Enhancement -->
                    <div class="relative flex items-center mb-12">
                        <div class="w-1/2 pr-8"></div>
                        <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
                        <div class="w-1/2 pl-8">
                            <div class="bg-white p-6 rounded-lg shadow-sm">
                                <h3 class="text-xl font-bold mb-2">Phase 2: Enhancement</h3>
                                <p class="text-gray-600 mb-2">Q2 2025</p>
                                <ul class="text-gray-600 space-y-1">
                                    <li>• Advanced risk models</li>
                                    <li>• Dynamic premium adjustment</li>
                                    <li>• Yield strategy integration</li>
                                    <li>• Enhanced governance features</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Phase 3: Scaling -->
                    <div class="relative flex items-center">
                        <div class="w-1/2 pr-8 text-right">
                            <div class="bg-white p-6 rounded-lg shadow-sm">
                                <h3 class="text-xl font-bold mb-2">Phase 3: Scaling</h3>
                                <p class="text-gray-600 mb-2">Q3-Q4 2025</p>
                                <ul class="text-gray-600 space-y-1">
                                    <li>• Cross-chain integration</li>
                                    <li>• Advanced analytics</li>
                                    <li>• Partner ecosystem development</li>
                                    <li>• Market expansion</li>
                                </ul>
                            </div>
                        </div>
                        <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full"></div>
                        <div class="w-1/2 pl-8"></div>
                    </div>
                </div>
            </div>
        `
    },

    'whitepaper': {
        title: 'Whitepaper',
        content: `
            <h2 class="text-3xl font-bold mb-6">Technical Whitepaper</h2>
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Executive Summary</h3>
                    <p class="text-gray-600">
                        NexusGuard introduces a pioneering decentralized insurance protocol specifically engineered for DeFi projects on the Sonic blockchain. 
                        By implementing advanced risk assessment models, dynamic premium calculations, and decentralized governance, the protocol provides 
                        comprehensive coverage against smart contract vulnerabilities, technical failures, and other DeFi-specific risks.
                    </p>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Technical Architecture</h3>
                    <pre class="bg-gray-100 p-4 rounded overflow-x-auto">
<code>// Core Protocol Components
├── Storage Layer
│   ├── State Management
│   ├── Access Control
│   └── Data Models
├── Insurance Layer
│   ├── Coverage Management
│   ├── Premium Calculation
│   └── Claims Processing
└── Governance Layer
    ├── Proposal System
    ├── Voting Mechanics
    └── Parameter Management</code></pre>
                </div>

                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-bold mb-4">Mathematical Models</h3>
                    <div class="space-y-4">
                        <div>
                            <h4 class="font-semibold">Risk Assessment Formula</h4>
                            <p class="text-gray-600">R = Σ(Wi * Si) * Vm</p>
                            <p class="text-gray-600 mt-2">Where:</p>
                            <ul class="list-disc pl-6 text-gray-600">
                                <li>R = Final risk score</li>
                                <li>Wi = Weight of factor i</li>
                                <li>Si = Score of factor i</li>
                                <li>Vm = Volatility multiplier</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    'glossary': {
        title: 'Glossary',
        content: `
            <h2 class="text-3xl font-bold mb-6">Technical Terminology</h2>
            <div class="space-y-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="text-xl font-bold mb-4">Core Concepts</h3>
                            <dl class="space-y-4">
                                <div>
                                    <dt class="font-semibold">APY (Annual Percentage Yield)</dt>
                                    <dd class="text-gray-600">The effective annual rate of return considering compound interest.</dd>
                                </div>
                                <div>
                                    <dt class="font-semibold">Collateralization Ratio</dt>
                                    <dd class="text-gray-600">The ratio of collateral value to the coverage amount.</dd>
                                </div>
                                <div>
                                    <dt class="font-semibold">Dynamic Risk Assessment</dt>
                                    <dd class="text-gray-600">Continuous evaluation of risk factors with real-time adjustments.</dd>
                                </div>
                            </dl>
                        </div>
                        <div>
                            <h3 class="text-xl font-bold mb-4">Technical Terms</h3>
                            <dl class="space-y-4">
                                <div>
                                    <dt class="font-semibold">ERC4626</dt>
                                    <dd class="text-gray-600">A standard interface for tokenized vault strategies.</dd>
                                </div>
                                <div>
                                    <dt class="font-semibold">Gas Optimization</dt>
                                    <dd class="text-gray-600">Techniques to reduce transaction costs on the blockchain.</dd>
                                </div>
                                <div>
                                    <dt class="font-semibold">Health Factor</dt>
                                    <dd class="text-gray-600">A metric indicating the overall health of the protocol.</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    'faq': {
        title: 'Frequently Asked Questions',
        content: `
            <h2 class="text-3xl font-bold mb-6">FAQ</h2>
            <div class="space-y-6">
                <div class="bg-white rounded-lg shadow-sm">
                    <div class="divide-y">
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2">General Questions</h3>
                            <div class="space-y-4">
                                <div>
                                    <button class="faq-question w-full text-left font-medium">
                                        What is NexusGuard?
                                    </button>
                                    <div class="faq-answer hidden mt-2 text-gray-600">
                                        NexusGuard is a decentralized insurance protocol providing comprehensive coverage for DeFi projects on the Sonic blockchain through advanced risk assessment and automated claims processing.
                                    </div>
                                </div>
                                <div>
                                    <button class="faq-question w-full text-left font-medium">
                                        How does coverage work?
                                    </button>
                                    <div class="faq-answer hidden mt-2 text-gray-600">
                                        Coverage is provided through smart contracts that automatically assess risk, calculate premiums, and process claims based on predefined conditions and real-time monitoring.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2">Technical Questions</h3>
                            <div class="space-y-4">
                                <div>
                                    <button class="faq-question w-full text-left font-medium">
                                        How is risk assessed?
                                    </button>
                                    <div class="faq-answer hidden mt-2 text-gray-600">
                                        Risk assessment uses a multi-factor model considering audit scores, TVL, protocol complexity, market conditions, and historical performance to calculate dynamic risk scores.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
};

// Initialize documentation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load default content
    loadContent('#introduction');
    
    // Add click handlers to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.currentTarget.getAttribute('href');
            loadContent(section);
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active', 'text-blue-600');
            });
            e.currentTarget.classList.add('active', 'text-blue-600');
        });
    });

    // Initialize FAQ functionality
    initializeFAQ();
});

// FAQ initialization
function initializeFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            answer.classList.toggle('hidden');
        });
    });
}

// Load content function
function loadContent(section) {
    const sectionId = section.replace('#', '');
    const content = documentationContent[sectionId];
    if (content) {
        const mainContent = document.getElementById('mainContent');
        
        // Add loading state
        mainContent.classList.add('loading');
        
        setTimeout(() => {
            mainContent.innerHTML = content.content;
            mainContent.classList.remove('loading');
            
            // Reinitialize FAQ if loading FAQ section
            if (sectionId === 'faq') {
                initializeFAQ();
            }
            
            // Scroll to top of content
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    }
}
