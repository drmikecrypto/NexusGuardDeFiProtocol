const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { deployNexusGuardFixture, advanceTime } = require("./helpers");
const { ethers } = require("hardhat");

describe("NexusGuardDeFiProtocolV1", function() {
    let protocol;
    let guardianToken;
    let priceFeed;
    let owner;
    let auditor;
    let riskManager;
    let oracle;
    let arbitrator;
    let emergency;
    let operator;
    let user1;
    let user2;

    beforeEach(async function() {
        const fixture = await loadFixture(deployNexusGuardFixture);
        protocol = fixture.protocol;
        guardianToken = fixture.guardianToken;
        priceFeed = fixture.priceFeed;
        owner = fixture.owner;
        auditor = fixture.auditor;
        riskManager = fixture.riskManager;
        oracle = fixture.oracle;
        arbitrator = fixture.arbitrator;
        emergency = fixture.emergency;
        operator = fixture.operator;
        user1 = fixture.user1;
        user2 = fixture.user2;
    });

    describe("Protocol Initialization", function() {
        it("should initialize with correct parameters", async function() {
            expect(await guardianToken.balanceOf(owner.address)).to.be.gt(0);
            expect(await protocol.sonicUsdPriceFeed()).to.equal(priceFeed.address);
            expect(await protocol.guardianToken()).to.equal(guardianToken.address);
            expect(await protocol.protocolVersion()).to.equal(1);
        });

        it("should set up roles correctly", async function() {
            expect(await protocol.hasRole(await protocol.AUDITOR_ROLE(), auditor.address)).to.be.true;
            expect(await protocol.hasRole(await protocol.RISK_MANAGER_ROLE(), riskManager.address)).to.be.true;
            expect(await protocol.hasRole(await protocol.ORACLE_ROLE(), oracle.address)).to.be.true;
            expect(await protocol.hasRole(await protocol.ARBITRATOR_ROLE(), arbitrator.address)).to.be.true;
            expect(await protocol.hasRole(await protocol.EMERGENCY_ROLE(), emergency.address)).to.be.true;
            expect(await protocol.hasRole(await protocol.OPERATOR_ROLE(), operator.address)).to.be.true;
        });
    });

    describe("Emergency Controls", function() {
        it("should allow emergency shutdown", async function() {
            await expect(protocol.connect(emergency).toggleEmergencyMode())
                .to.emit(protocol, "EmergencyShutdown")
                .withArgs(emergency.address);

            const config = await protocol.config();
            expect(config.emergencyMode).to.be.true;
        });

        it("should allow emergency actions when in emergency mode", async function() {
            await protocol.connect(emergency).toggleEmergencyMode();

            const action = {
                target: protocol.address,
                value: 0,
                data: protocol.interface.encodeFunctionData("pause", [])
            };

            await expect(
                protocol.connect(emergency).executeEmergencyAction(
                    action.target,
                    action.value,
                    action.data
                )
            ).to.emit(protocol, "EmergencyActionExecuted");
        });
    });

    describe("Protocol Configuration", function() {
        it("should allow updating protocol configuration", async function() {
            const newConfig = {
                minDelay: 48 * 3600,
                maxDelay: 14 * 24 * 3600,
                gracePeriod: 5 * 24 * 3600,
                executionWindow: 3 * 24 * 3600,
                minimumQuorum: ethers.utils.parseEther("100000"),
                votingDelay: 2 * 24 * 3600,
                votingPeriod: 10 * 24 * 3600,
                treasury: owner.address,
                performanceFee: 1500,
                emergencyMode: false
            };

            await expect(protocol.connect(owner).updateConfig(newConfig))
                .to.emit(protocol, "ConfigUpdated");

            const config = await protocol.config();
            expect(config.minDelay).to.equal(newConfig.minDelay);
            expect(config.maxDelay).to.equal(newConfig.maxDelay);
            expect(config.performanceFee).to.equal(newConfig.performanceFee);
        });
    });

    describe("Protocol Statistics", function() {
        it("should track protocol statistics correctly", async function() {
            const stats = await protocol.getProtocolStats();
            expect(stats.totalProjects).to.equal(0);
            expect(stats.totalUsers).to.equal(0);
            expect(stats.totalInsured).to.equal(0);
            expect(stats.totalClaims).to.equal(0);
        });
    });

    describe("Protocol Upgrades", function() {
        it("should allow authorized upgrades", async function() {
            const NexusGuardV2 = await ethers.getContractFactory("NexusGuardDeFiProtocolV1");
            const newImplementation = await NexusGuardV2.deploy();

            await expect(
                protocol.connect(owner).upgradeTo(newImplementation.address)
            ).to.emit(protocol, "ProtocolUpgraded");
        });
    });
});
