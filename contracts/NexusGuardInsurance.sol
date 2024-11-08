// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import "./NexusGuardStorage.sol";

contract NexusGuardInsurance is NexusGuardStorage, ReentrancyGuardUpgradeable {
    using SafeMathUpgradeable for uint256;
    using SafeERC20Upgradeable for IERC20Upgradeable;
    using CountersUpgradeable for CountersUpgradeable.Counter;
    using ECDSAUpgradeable for bytes32;

    struct Claim {
        uint256 id;
        address claimant;
        address projectAddress;
        uint256 amount;
        uint256 timestamp;
        ClaimStatus status;
        uint256 votesFor;
        uint256 votesAgainst;
        mapping(address => bool) hasVoted;
        string evidence;
        uint256 coveragePeriodStart;
        uint256 coveragePeriodEnd;
        bytes32 evidenceHash;
        uint256 lastUpdateBlock;
        uint256 arbitrationFee;
        address[] voters;
        bool isEmergency;
    }

    struct PremiumQuote {
        uint256 premium;
        uint256 timestamp;
        bytes32 quoteHash;
        bool used;
        uint256 expiryTime;
        uint256 coverageAmount;
        uint8 riskCategory;
        address projectAddress;
        uint256 nonce;
    }

    struct CoveragePeriod {
        uint256 startTime;
        uint256 endTime;
        uint256 coverage;
        uint256 premium;
        bool active;
        uint256 lastClaimTime;
        uint256 remainingCoverage;
        bytes32 coverageHash;
        uint256 maxClaimAmount;
        bool autoRenew;
    }

    enum ClaimStatus { Pending, Approved, Rejected, Arbitration, Expired, Cancelled, EmergencyResolved }

    mapping(uint256 => Claim) public claims;
    mapping(address => mapping(uint256 => PremiumQuote)) private premiumQuotes;
    mapping(address => mapping(address => CoveragePeriod[])) private userCoverages;
    mapping(bytes32 => bool) private processedHashes;
    mapping(address => uint256) public totalUserCoverage;
    mapping(address => uint256) public coverageUtilization;
    
    CountersUpgradeable.Counter private _claimIdTracker;
    CountersUpgradeable.Counter private _coverageIdTracker;
    
    uint256 private constant QUOTE_VALIDITY_PERIOD = 15 minutes;
    uint256 private constant MIN_COVERAGE_PERIOD = 30 days;
    uint256 private constant MAX_COVERAGE_PERIOD = 365 days;
    uint256 private constant CLAIM_EVIDENCE_MAX_LENGTH = 1000;
    uint256 private constant MAX_PREMIUM_SLIPPAGE = 200;
    uint256 private constant MIN_PREMIUM_AMOUNT = 0.01 ether;
    uint256 private constant COVERAGE_BUFFER = 1000;
    uint256 private constant MAX_CLAIM_RATIO = 8000;
    uint256 private constant EMERGENCY_TIMEOUT = 24 hours;
    uint256 private constant MAX_VOTERS = 100;
    uint256 private constant MIN_ARBITRATION_FEE = 0.1 ether;
    
    bool private _initialized;
    bool private _processingClaim;
    
    event QuoteGenerated(address indexed user, bytes32 quoteHash, uint256 premium, uint256 coverage);
    event CoveragePeriodCreated(address indexed user, address indexed project, uint256 startTime, uint256 endTime);
    event CoverageRenewed(address indexed user, address indexed project, uint256 newEndTime);
    event ClaimEvidenceSubmitted(uint256 indexed claimId, string evidence, bytes32 evidenceHash);
    event CoverageExpired(address indexed user, address indexed project, uint256 endTime);
    event PremiumRefunded(address indexed user, uint256 amount, string reason);
    event ExcessFundsWithdrawn(address indexed recipient, uint256 amount);
    event ReserveRatioUpdated(uint256 newRatio);
    event ClaimStatusUpdated(uint256 indexed claimId, ClaimStatus newStatus);
    event EmergencyClaimResolved(uint256 indexed claimId, uint256 amount);
    event CoverageUtilizationUpdated(address indexed project, uint256 utilization);
    event ArbitrationFeeUpdated(uint256 indexed claimId, uint256 fee);
    event QuoteExpired(bytes32 indexed quoteHash);
    event ClaimTimeout(uint256 indexed claimId);
    event VoterAdded(uint256 indexed claimId, address indexed voter);
    event AutoRenewalSet(address indexed user, address indexed project, bool status);

    function __NexusGuardInsurance_init() internal initializer {
        __ReentrancyGuard_init();
        __NexusGuardStorage_init();
        _initialized = true;
    }

    modifier onlySonicChain {
        require(block.chainid == SONIC_CHAIN_ID, "InvalidChain");
        _;
    }

    modifier whenNotProcessingClaim {
        require(!_processingClaim, "ClaimInProgress");
        _;
    }

    modifier validCoverage(uint256 _coverage) {
        require(_coverage >= MIN_INSURANCE_AMOUNT && _coverage <= MAX_INSURANCE_AMOUNT, "InvalidCoverage");
        _;
    }

    modifier notBlacklisted {
        require(!users[msg.sender].isBlacklisted, "Blacklisted");
        _;
    }

function _validateDID(string memory _did) internal pure returns (bool) {
        bytes memory didBytes = bytes(_did);
        if (didBytes.length < 7 || didBytes.length > 100) return false;

        if (didBytes[0] != 0x64 || didBytes[1] != 0x69 || didBytes[2] != 0x64 || didBytes[3] != 0x3A)
            return false;

        for (uint i = 4; i < didBytes.length; i++) {
            bytes1 char = didBytes[i];
            if (!((char >= 0x30 && char <= 0x39) || (char >= 0x61 && char <= 0x7A) || char == 0x3A || char == 0x2E))
                return false;
        }
        return true;
    }

    function getPremiumQuote(
        uint256 _coverage,
        uint8 _riskCategory,
        uint256 _coveragePeriod,
        address _projectAddress
    ) public view 
      onlySonicChain 
      validCoverage(_coverage) 
      returns (uint256 premium, bytes32 quoteHash) 
    {
        require(_coveragePeriod >= MIN_COVERAGE_PERIOD && _coveragePeriod <= MAX_COVERAGE_PERIOD, "InvalidPeriod");
        require(projects[_projectAddress].isActive, "InactiveProject");
        
        premium = _calculatePremium(_coverage, _riskCategory);
        premium = premium.mul(_coveragePeriod).div(365 days);
        
        require(premium >= MIN_PREMIUM_AMOUNT, "PremiumTooLow");
        
        quoteHash = keccak256(abi.encodePacked(
            _coverage,
            _riskCategory,
            premium,
            _coveragePeriod,
            _projectAddress,
            block.timestamp,
            msg.sender,
            nonces[msg.sender]++
        ));

        return (premium, quoteHash);
    }

    function _purchaseInsurance(
        address _projectAddress,
        uint256 _coverage,
        uint256 _coveragePeriod,
        bytes32 _quoteHash
    ) internal 
      virtual 
      whenNotPaused 
      nonReentrant 
      notBlacklisted 
    {
        require(users[msg.sender].reputationScore != 0, "NotRegistered");
        
        Project storage project = projects[_projectAddress];
        require(project.isActive && project.isAudited, "InvalidProject");
        require(project.coverageUtilization.add(_coverage) <= MAX_COVERAGE_UTILIZATION, "UtilizationExceeded");

        PremiumQuote storage quote = premiumQuotes[msg.sender][uint256(_quoteHash)];
        require(!quote.used && block.timestamp <= quote.expiryTime, "InvalidQuote");

        uint256 currentPremium = _calculatePremium(_coverage, project.riskCategory);
        require(
            currentPremium <= quote.premium.mul(MAX_PREMIUM_SLIPPAGE.add(10000)).div(10000),
            "PremiumTooHigh"
        );

        quote.used = true;
        
        _processCoverageCreation(
            msg.sender,
            _projectAddress,
            _coverage,
            quote.premium,
            _coveragePeriod
        );

        project.coverageUtilization = project.coverageUtilization.add(_coverage);
        emit CoverageUtilizationUpdated(_projectAddress, project.coverageUtilization);
    }

    function _processCoverageCreation(
        address _user,
        address _project,
        uint256 _coverage,
        uint256 _premium,
        uint256 _period
    ) private {
        uint256 startTime = block.timestamp;
        uint256 endTime = startTime.add(_period);

        CoveragePeriod memory newCoverage = CoveragePeriod({
            startTime: startTime,
            endTime: endTime,
            coverage: _coverage,
            premium: _premium,
            active: true,
            lastClaimTime: 0,
            remainingCoverage: _coverage,
            coverageHash: keccak256(abi.encodePacked(_user, _project, startTime, _coverage)),
            maxClaimAmount: _coverage.mul(MAX_CLAIM_RATIO).div(10000),
            autoRenew: false
        });

        userCoverages[_user][_project].push(newCoverage);
        totalUserCoverage[_user] = totalUserCoverage[_user].add(_coverage);

        _updateInsurancePool(_premium);
        
        emit InsurancePurchased(_user, _project, _coverage, _premium);
        emit CoveragePeriodCreated(_user, _project, startTime, endTime);
    }

    function _updateInsurancePool(uint256 _premium) private {
        insurancePool.totalFunds = insurancePool.totalFunds.add(_premium);
        insurancePool.availableFunds = insurancePool.availableFunds.add(_premium);
        insurancePool.totalPremiums = insurancePool.totalPremiums.add(_premium);
        
        uint256 fee = _premium.mul(insurancePool.performanceFee).div(10000);
        insurancePool.accumulatedFees = insurancePool.accumulatedFees.add(fee);
        
        emit InsurancePoolUpdated(
            insurancePool.totalFunds,
            insurancePool.availableFunds,
            insurancePool.lockedFunds,
            insurancePool.reserveRatio
        );
    }

    function _initiateClaim(
        address _projectAddress,
        uint256 _amount,
        string memory _evidence,
        bytes calldata _signature
    ) internal virtual whenNotProcessingClaim nonReentrant {
        require(bytes(_evidence).length <= CLAIM_EVIDENCE_MAX_LENGTH, "EvidenceTooLong");
        
        User storage user = users[msg.sender];
        require(user.reputationScore != 0 && !user.isBlacklisted, "InvalidUser");
        require(block.timestamp >= user.lastClaimTimestamp + CLAIM_COOLDOWN, "ClaimCooldown");

        bytes32 evidenceHash = keccak256(abi.encodePacked(_evidence, msg.sender, _projectAddress, _amount));
        require(!processedHashes[evidenceHash], "DuplicateEvidence");
        
        (bool validCoverage, uint256 coverageIndex) = _validateUserCoverage(
            msg.sender,
            _projectAddress,
            _amount
        );
        require(validCoverage, "InvalidCoverage");

        uint256 claimId = _claimIdTracker.current();
        _claimIdTracker.increment();

        _createClaim(
            claimId,
            msg.sender,
            _projectAddress,
            _amount,
            _evidence,
            evidenceHash,
            coverageIndex
        );

        processedHashes[evidenceHash] = true;
        _processingClaim = true;
        
        emit InsuranceClaimed(msg.sender, _projectAddress, _amount, claimId);
        emit ClaimEvidenceSubmitted(claimId, _evidence, evidenceHash);
        
        _processingClaim = false;
    }

    function _createClaim(
        uint256 _claimId,
        address _claimant,
        address _projectAddress,
        uint256 _amount,
        string memory _evidence,
        bytes32 _evidenceHash,
        uint256 _coverageIndex
    ) private {
        Claim storage newClaim = claims[_claimId];
        newClaim.id = _claimId;
        newClaim.claimant = _claimant;
        newClaim.projectAddress = _projectAddress;
        newClaim.amount = _amount;
        newClaim.timestamp = block.timestamp;
        newClaim.status = ClaimStatus.Pending;
        newClaim.evidence = _evidence;
        newClaim.evidenceHash = _evidenceHash;
        newClaim.lastUpdateBlock = block.number;
        newClaim.arbitrationFee = MIN_ARBITRATION_FEE;
        newClaim.isEmergency = false;
        
        CoveragePeriod storage coverage = userCoverages[_claimant][_projectAddress][_coverageIndex];
        newClaim.coveragePeriodStart = coverage.startTime;
        newClaim.coveragePeriodEnd = coverage.endTime;
    }

    function _validateUserCoverage(
        address _user,
        address _project,
        uint256 _amount
    ) private view returns (bool, uint256) {
        CoveragePeriod[] storage coverages = userCoverages[_user][_project];
        
        for (uint256 i = 0; i < coverages.length; i++) {
            CoveragePeriod storage coverage = coverages[i];
            if (coverage.active && 
                block.timestamp >= coverage.startTime && 
                block.timestamp <= coverage.endTime &&
                coverage.remainingCoverage >= _amount &&
                _amount <= coverage.maxClaimAmount) {
                return (true, i);
            }
        }
        return (false, 0);
    }

    function _voteOnClaim(
        uint256 _claimId,
        bool _support,
        string memory _reason
    ) internal virtual whenNotProcessingClaim {
        Claim storage claim = claims[_claimId];
        require(claim.status == ClaimStatus.Pending, "InvalidStatus");
        require(!claim.hasVoted[msg.sender], "AlreadyVoted");
        require(claim.voters.length < MAX_VOTERS, "TooManyVoters");

        if (_support) {
            claim.votesFor = claim.votesFor.add(1);
        } else {
            claim.votesAgainst = claim.votesAgainst.add(1);
        }

        claim.hasVoted[msg.sender] = true;
        claim.voters.push(msg.sender);
        claim.lastUpdateBlock = block.number;

        emit VoterAdded(_claimId, msg.sender);

        _checkAndProcessClaimVotes(_claimId);
    }

    function _checkAndProcessClaimVotes(uint256 _claimId) private {
        Claim storage claim = claims[_claimId];
        uint256 totalVotes = claim.votesFor.add(claim.votesAgainst);
        uint256 requiredVotes = getRoleMemberCount(ARBITRATOR_ROLE).div(2).add(1);

        if (totalVotes >= requiredVotes) {
            if (claim.votesFor > claim.votesAgainst) {
                _approveClaim(_claimId);
            } else {
                _rejectClaim(_claimId);
            }
        }
    }

    function _approveClaim(uint256 _claimId) internal virtual whenNotProcessingClaim {
        Claim storage claim = claims[_claimId];
        require(insurancePool.availableFunds >= claim.amount, "InsufficientFunds");

        _processingClaim = true;

        _processCoverageUpdate(claim.claimant, claim.projectAddress, claim.amount);
        _processClaimPayment(claim);

        claim.status = ClaimStatus.Approved;
        
        _processingClaim = false;

        emit ClaimStatusUpdated(_claimId, ClaimStatus.Approved);
    }

    function _processCoverageUpdate(
        address _user,
        address _project,
        uint256 _amount
    ) private {
        CoveragePeriod[] storage coverages = userCoverages[_user][_project];
        for (uint256 i = 0; i < coverages.length; i++) {
            CoveragePeriod storage coverage = coverages[i];
            if (coverage.active && coverage.remainingCoverage >= _amount) {
                coverage.remainingCoverage = coverage.remainingCoverage.sub(_amount);
                coverage.lastClaimTime = block.timestamp;
                if (coverage.remainingCoverage == 0) {
                    coverage.active = false;
                }
                break;
            }
        }
        
        totalUserCoverage[_user] = totalUserCoverage[_user].sub(_amount);
        Project storage project = projects[_project];
        project.coverageUtilization = project.coverageUtilization.sub(_amount);
        
        emit CoverageUtilizationUpdated(_project, project.coverageUtilization);
    }

    function _processClaimPayment(Claim storage _claim) private {
        User storage user = users[_claim.claimant];
        
        insurancePool.totalFunds = insurancePool.totalFunds.sub(_claim.amount);
        insurancePool.availableFunds = insurancePool.availableFunds.sub(_claim.amount);
        insurancePool.totalClaims = insurancePool.totalClaims.add(_claim.amount);
        
        user.lastClaimTimestamp = uint64(block.timestamp);
        user.totalClaims = user.totalClaims.add(1);

        (bool success, ) = payable(_claim.claimant).call{value: _claim.amount}("");
        require(success, "PaymentFailed");

        emit InsurancePoolUpdated(
            insurancePool.totalFunds,
            insurancePool.availableFunds,
            insurancePool.lockedFunds,
            insurancePool.reserveRatio
        );
    }

    function _rejectClaim(uint256 _claimId) internal virtual whenNotProcessingClaim {
        Claim storage claim = claims[_claimId];
        claim.status = ClaimStatus.Rejected;
        emit ClaimStatusUpdated(_claimId, ClaimStatus.Rejected);
    }

    function _withdrawExcessFunds(
        uint256 _amount
    ) internal virtual nonReentrant whenNotProcessingClaim {
        require(_amount <= _calculateExcessFunds(), "ExcessiveAmount");
        require(_amount > 0, "ZeroAmount");
        
        insurancePool.availableFunds = insurancePool.availableFunds.sub(_amount);
        insurancePool.totalFunds = insurancePool.totalFunds.sub(_amount);
        
        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "WithdrawFailed");
        
        emit ExcessFundsWithdrawn(msg.sender, _amount);
    }

    function _calculateExcessFunds() internal view returns (uint256) {
        uint256 requiredReserves = insurancePool.totalFunds.mul(insurancePool.reserveRatio).div(10000);
        if (insurancePool.availableFunds <= requiredReserves) {
            return 0;
        }
        return insurancePool.availableFunds.sub(requiredReserves);
    }

    function _updateReserveRatio(uint256 _newRatio) internal virtual whenNotProcessingClaim {
        require(_newRatio >= MIN_RESERVE_RATIO && _newRatio <= MAX_RESERVE_RATIO, "InvalidRatio");
        insurancePool.reserveRatio = _newRatio;
        emit ReserveRatioUpdated(_newRatio);
    }

    function _updateRiskModel(
        uint8 _riskCategory,
        uint256 _basePremiumRate,
        uint256 _riskMultiplier,
        uint256 _coverageLimit
    ) internal virtual whenNotProcessingClaim {
        require(_riskCategory > 0 && _riskCategory <= MAX_RISK_CATEGORY, "InvalidCategory");
        require(_basePremiumRate > 0, "InvalidBaseRate");
        require(_riskMultiplier > 0, "InvalidMultiplier");
        require(_coverageLimit > 0, "InvalidLimit");
        
        riskModels[_riskCategory] = RiskModel({
            basePremiumRate: _basePremiumRate,
            riskMultiplier: _riskMultiplier,
            coverageLimit: _coverageLimit,
            minStakeRequired: _coverageLimit.div(10),
            maxLeverage: 5,
            liquidationThreshold: 8000,
            penaltyRate: 500,
            isActive: true
        });
        
        emit RiskModelUpdated(_riskCategory, _basePremiumRate, _riskMultiplier, _coverageLimit);
    }

    function _calculatePremium(
        uint256 _coverage,
        uint8 _riskCategory
    ) internal view virtual returns (uint256) {
        require(_riskCategory > 0 && _riskCategory <= MAX_RISK_CATEGORY, "InvalidCategory");

        (,int256 price,,,) = sonicUsdPriceFeed.latestRoundData();
        require(price > 0, "InvalidPrice");

        uint256 coverageInUsd = uint256(price).mul(_coverage).div(1e18);
        RiskModel memory riskModel = riskModels[_riskCategory];

        uint256 riskFactor = _sqrt(coverageInUsd.div(1000)).add(1);
        uint256 premiumRate = riskModel.basePremiumRate.add(
            riskModel.riskMultiplier.mul(riskFactor)
        );

        return _coverage.mul(premiumRate).div(10000);
    }

    function _sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function getUserActiveCoverages(
        address _user,
        address _projectAddress
    ) external view returns (CoveragePeriod[] memory) {
        return userCoverages[_user][_projectAddress];
    }

    function getClaimDetails(
        uint256 _claimId
    ) external view returns (
        address claimant,
        address projectAddress,
        uint256 amount,
        uint256 timestamp,
        ClaimStatus status,
        uint256 votesFor,
        uint256 votesAgainst,
        string memory evidence,
        bytes32 evidenceHash,
        uint256 lastUpdateBlock,
        bool isEmergency,
        address[] memory voters
    ) {
        Claim storage claim = claims[_claimId];
        return (
            claim.claimant,
            claim.projectAddress,
            claim.amount,
            claim.timestamp,
            claim.status,
            claim.votesFor,
            claim.votesAgainst,
            claim.evidence,
            claim.evidenceHash,
            claim.lastUpdateBlock,
            claim.isEmergency,
            claim.voters
        );
    }

    function setAutoRenewal(
        address _projectAddress,
        bool _status
    ) external nonReentrant notBlacklisted {
        CoveragePeriod[] storage coverages = userCoverages[msg.sender][_projectAddress];
        require(coverages.length > 0, "NoCoverage");
        
        for (uint256 i = 0; i < coverages.length; i++) {
            if (coverages[i].active) {
                coverages[i].autoRenew = _status;
            }
        }
        
        emit AutoRenewalSet(msg.sender, _projectAddress, _status);
    }

    receive() external payable {}
    fallback() external payable {}
}