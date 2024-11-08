// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

abstract contract NexusGuardStorage is Initializable {
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");
    bytes32 public constant RISK_MANAGER_ROLE = keccak256("RISK_MANAGER_ROLE");
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    bytes32 public constant ARBITRATOR_ROLE = keccak256("ARBITRATOR_ROLE");
    bytes32 public constant EMERGENCY_ROLE = keccak256("EMERGENCY_ROLE");
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");

    uint256 public constant SONIC_CHAIN_ID = 2930;
    uint256 public constant MIN_BLOCK_CONFIRMATION = 1;
    uint256 public constant MAX_BLOCK_CONFIRMATION = 12;
    uint256 public constant MAX_UINT128 = type(uint128).max;
    uint256 public constant MIN_STAKE_AMOUNT = 100 * 10**18;
    uint256 public constant MAX_STAKE_AMOUNT = 1000000 * 10**18;
    uint256 public constant MIN_INSURANCE_AMOUNT = 1000 * 10**18;
    uint256 public constant MAX_INSURANCE_AMOUNT = 10000000 * 10**18;
    uint256 public constant RATE_DENOMINATOR = 10000;
    uint256 public constant MAX_FEE_RATE = 1000;
    uint256 public constant MIN_EXECUTION_DELAY = 24 hours;
    uint256 public constant MAX_EXECUTION_DELAY = 7 days;
    uint256 public constant MIN_RESERVE_RATIO = 1000;
    uint256 public constant MAX_RESERVE_RATIO = 5000;

    IERC20Upgradeable public guardianToken;
    AggregatorV3Interface public sonicUsdPriceFeed;

    struct Project {
        address contractAddress;
        uint16 securityScore;
        bool isAudited;
        uint64 lastAuditTimestamp;
        bytes32 metadataHash;
        string auditReportURI;
        uint256 totalInsured;
        uint8 riskCategory;
        uint256 maxCoverage;
        bool isActive;
        uint256 lastUpdateBlock;
        address auditor;
        uint256 coverageUtilization;
        uint256 claimCount;
    }

    struct User {
        uint32 reputationScore;
        bool isPremium;
        uint128 insuranceCoverage;
        uint128 stakedAmount;
        uint64 stakingTimestamp;
        uint64 lastClaimTimestamp;
        mapping(uint256 => uint256) proposalVotes;
        uint256 totalClaims;
        string did;
        uint256 weightedStakeAmount;
        uint256 lastStakeUpdateTime;
        uint256 rewardDebt;
        uint256 pendingRewards;
        bool isBlacklisted;
        uint256[] activeCoverages;
        address delegateTo;
    }

    struct InsurancePool {
        uint256 totalFunds;
        uint256 availableFunds;
        uint256 lockedFunds;
        uint256 reserveRatio;
        uint256 totalPremiums;
        uint256 totalClaims;
        uint256 totalStaked;
        uint256 rewardPerShare;
        uint256 lastUpdateTime;
        uint256 accumulatedFees;
        uint256 performanceFee;
        bool emergencyMode;
    }

    struct RiskModel {
        uint256 basePremiumRate;
        uint256 riskMultiplier;
        uint256 coverageLimit;
        uint256 minStakeRequired;
        uint256 maxLeverage;
        uint256 liquidationThreshold;
        uint256 penaltyRate;
        bool isActive;
    }

    mapping(address => Project) public projects;
    mapping(address => User) public users;
    mapping(uint8 => RiskModel) public riskModels;
    mapping(address => mapping(address => bool)) public operatorApprovals;
    mapping(address => uint256) public nonces;
    mapping(bytes32 => bool) public usedSignatures;

    string public githubRepo;
    string public documentationURI;
    string[] public partnerProjects;
    string[] public supportedNetworks;
    uint256 public liquidityThreshold;
    uint256 public maxClaimRatio;
    uint256 public arbitrationThreshold;
    InsurancePool public insurancePool;
    uint256 public protocolVersion;
    address public treasury;
    bool public isUpgradeEnabled;
    uint256 public upgradeDelay;
    uint256 public lastUpgradeTime;

    uint16 public constant MAX_SECURITY_SCORE = 100;
    uint64 public constant STAKING_PERIOD = 30 days;
    uint8 public constant BASE_REWARD_RATE = 5;
    uint64 public constant CLAIM_COOLDOWN = 90 days;
    uint256 public constant PREMIUM_UPGRADE_COST = 1000 * 10**18;
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant MAX_PROPOSALS_PER_USER = 5;
    uint8 public constant MAX_RISK_CATEGORY = 5;
    uint256 public constant GRACE_PERIOD = 3 days;
    uint256 public constant EXECUTION_DELAY = 2 days;
    uint256 public constant MAX_GAS_PRICE = 500 gwei;
    uint256 public constant MAX_COVERAGE_UTILIZATION = 8000;

    function __NexusGuardStorage_init() internal initializer {
        protocolVersion = 1;
        upgradeDelay = 48 hours;
        insurancePool.reserveRatio = 2000;
        insurancePool.performanceFee = 1000;
        isUpgradeEnabled = true;
    }

    event ProjectAdded(address indexed projectAddress, uint16 initialScore, uint8 riskCategory, bytes32 metadataHash, string auditReportURI);
    event ProjectAudited(address indexed projectAddress, uint16 newScore, uint8 newRiskCategory, string auditReportURI);
    event UserRegistered(address indexed userAddress, string did);
    event InsurancePurchased(address indexed userAddress, address indexed projectAddress, uint256 coverage, uint256 premium);
    event InsuranceClaimed(address indexed userAddress, address indexed projectAddress, uint256 amount, uint256 claimId);
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount, uint256 reward);
    event UserUpgradedToPremium(address indexed userAddress);
    event SonicUsdPriceFeedUpdated(address indexed newPriceFeed);
    event InsurancePoolUpdated(uint256 totalFunds, uint256 availableFunds, uint256 lockedFunds, uint256 reserveRatio);
    event RiskModelUpdated(uint8 riskCategory, uint256 basePremiumRate, uint256 riskMultiplier, uint256 coverageLimit);
    event PartnerProjectAdded(string projectName);
    event SupportedNetworkAdded(string networkName);
    event LiquidityThresholdUpdated(uint256 newThreshold);
    event MaxClaimRatioUpdated(uint256 newRatio);
    event ArbitrationThresholdUpdated(uint256 newThreshold);
    event OperatorApprovalSet(address indexed user, address indexed operator, bool approved);
    event EmergencyModeActivated(address indexed activator, uint256 timestamp);
    event EmergencyModeDeactivated(address indexed deactivator, uint256 timestamp);
    event UpgradeDelayUpdated(uint256 newDelay);
    event TreasuryUpdated(address indexed newTreasury);
    event RewardDistributed(address indexed user, uint256 amount);
    event UserBlacklisted(address indexed user, bool status);
    event DelegationUpdated(address indexed delegator, address indexed delegatee);
    event ProtocolVersionUpdated(uint256 newVersion);
    event SignatureUsed(bytes32 indexed signatureHash);
}