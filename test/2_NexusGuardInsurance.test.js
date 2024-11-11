const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { deployNexusGuardFixture, advanceTime } = require("./helpers");
const { ethers } = require("hardhat");

describe("NexusGuardInsurance", function () {
    let protocol;
    let guardianToken;
    let priceFeed;
    let owner;
    let auditor;
    let riskManager;
    let user1;
    let user2;
    
    beforeEach(async function () {
        const fixture = await loadFixture(deployNexusGuardFixture);
        protocol = fixture.protocol;
        guardianToken = fixture.guardianToken;
        priceFeed = fixture.priceFeed;
        owner = fixture.owner;
        auditor = fixture.auditor;
        riskManager = fixture.riskManager;
        user1 = fixture.user1;
        user2 = fixture.user2;

        // Register users
        await protocol.connect(user1).registerUser("did:nexus:user1");
        await protocol.connect(user2).registerUser("did:nexus:user2");

        // Add test project
        await protocol.connect(auditor).addProject(
            user2.address,
            85,
            2,
            ethers.utils.id("metadata"),
            "ipfs://test"
        );

        // Set price feed data
        await priceFeed.setPrice(ethers.utils.parseUnits("1000", 8)); // $1000 per token
    });

    describe("Premium Calculation", function () {
        it("should calculate premium correctly based on coverage and risk", async function () {
            const coverage = ethers.utils.parseEther("1000");
            const period = 30 * 24 * 60 * 60; // 30 days

            const [premium, quoteHash] = await protocol.getPremiumQuote(
                coverage,
                2, // risk category
                period,
                user2.address
            );

            // Base rate (1%) + Risk multiplier (2 * 0.5%) = 2%
            const expectedPremium = coverage.mul(200).div(10000);
            expect(premium).to.equal(expectedPremium);
            expect(quoteHash).to.not.equal(ethers.constants.HashZero);
        });

        it("should reject invalid coverage amounts", async function () {
            const period = 30 * 24 * 60 * 60;

            await expect(
                protocol.getPremiumQuote(
                    ethers.utils.parseEther("0.1"), // Below minimum
                    2,
                    period,
                    user2.address
                )
            ).to.be.revertedWith("InvalidCoverage");

            await expect(
                protocol.getPremiumQuote(
                    ethers.utils.parseEther("10000001"), // Above maximum
                    2,
                    period,
                    user2.address
                )
            ).to.be.revertedWith("InvalidCoverage");
        });
    });

    describe("Insurance Purchase", function () {
        let quoteHash;
        let premium;
        const coverage = ethers.utils.parseEther("1000");
        const period = 30 * 24 * 60 * 60;

        beforeEach(async function () {
            [premium, quoteHash] = await protocol.getPremiumQuote(
                coverage,
                2,
                period,
                user2.address
            );

            // Approve payment token spending
            await guardianToken.connect(user1).approve(protocol.address, premium);
        });

        it("should successfully purchase insurance", async function () {
            await expect(
                protocol.connect(user1).purchaseInsurance(
                    user2.address,
                    coverage,
                    period,
                    quoteHash
                )
            )
                .to.emit(protocol, "InsurancePurchased")
                .withArgs(user1.address, user2.address, coverage, premium);

            const userCoverages = await protocol.getUserActiveCoverages(user1.address, user2.address);
            expect(userCoverages.length).to.equal(1);
            expect(userCoverages[0].coverage).to.equal(coverage);
            expect(userCoverages[0].active).to.be.true;
        });

        it("should update insurance pool after purchase", async function () {
            const poolBefore = await protocol.insurancePool();
            
            await protocol.connect(user1).purchaseInsurance(
                user2.address,
                coverage,
                period,
                quoteHash
            );

            const poolAfter = await protocol.insurancePool();
            expect(poolAfter.totalFunds).to.equal(poolBefore.totalFunds.add(premium));
            expect(poolAfter.availableFunds).to.equal(poolBefore.availableFunds.add(premium));
            expect(poolAfter.totalPremiums).to.equal(poolBefore.totalPremiums.add(premium));
        });
    });

    describe("Claims Processing", function () {
        let coverage;
        let period;
        let premium;
        let quoteHash;

        beforeEach(async function () {
            coverage = ethers.utils.parseEther("1000");
            period = 30 * 24 * 60 * 60;
            [premium, quoteHash] = await protocol.getPremiumQuote(
                coverage,
                2,
                period,
                user2.address
            );

            await guardianToken.connect(user1).approve(protocol.address, premium);
            await protocol.connect(user1).purchaseInsurance(
                user2.address,
                coverage,
                period,
                quoteHash
            );
        });

        it("should allow valid claim submission", async function () {
            const claimAmount = ethers.utils.parseEther("500");
            const evidence = "Hack occurred at block 123456";
            const signature = ethers.utils.arrayify("0x00"); // Mock signature

            await expect(
                protocol.connect(user1).initiateClaim(
                    user2.address,
                    claimAmount,
                    evidence,
                    signature
                )
            )
                .to.emit(protocol, "ClaimSubmitted");

            const claimId = 0; // First claim
            const claim = await protocol.getClaimDetails(claimId);
            expect(claim.claimant).to.equal(user1.address);
            expect(claim.amount).to.equal(claimAmount);
            expect(claim.status).to.equal(0); // Pending
        });

        it("should process approved claim correctly", async function () {
            const claimAmount = ethers.utils.parseEther("500");
            const evidence = "Hack occurred at block 123456";
            const signature = ethers.utils.arrayify("0x00");

            await protocol.connect(user1).initiateClaim(
                user2.address,
                claimAmount,
                evidence,
                signature
            );

            const claimId = 0;
            const balanceBefore = await ethers.provider.getBalance(user1.address);

            // Process claim approval
            await protocol.connect(riskManager).processClaim(claimId);

            const balanceAfter = await ethers.provider.getBalance(user1.address);
            expect(balanceAfter.sub(balanceBefore)).to.equal(claimAmount);

            const claim = await protocol.getClaimDetails(claimId);
            expect(claim.status).to.equal(1); // Approved
        });
    });

    describe("Coverage Utilization", function () {
        it("should track project coverage utilization correctly", async function () {
            const coverage = ethers.utils.parseEther("1000");
            const period = 30 * 24 * 60 * 60;
            const [premium, quoteHash] = await protocol.getPremiumQuote(
                coverage,
                2,
                period,
                user2.address
            );

            await guardianToken.connect(user1).approve(protocol.address, premium);
            await protocol.connect(user1).purchaseInsurance(
                user2.address,
                coverage,
                period,
                quoteHash
            );

            const project = await protocol.projects(user2.address);
            expect(project.coverageUtilization).to.equal(coverage);
        });

        it("should enforce maximum coverage utilization", async function () {
            const maxCoverage = ethers.utils.parseEther("10000000");
            const period = 30 * 24 * 60 * 60;
            const [premium, quoteHash] = await protocol.getPremiumQuote(
                maxCoverage,
                2,
                period,
                user2.address
            );

            await guardianToken.connect(user1).approve(protocol.address, premium);
            await expect(
                protocol.connect(user1).purchaseInsurance(
                    user2.address,
                    maxCoverage,
                    period,
                    quoteHash
                )
            ).to.be.revertedWith("UtilizationExceeded");
        });
    });

    describe("Auto Renewal", function () {
        it("should allow setting auto renewal preference", async function () {
            const coverage = ethers.utils.parseEther("1000");
            const period = 30 * 24 * 60 * 60;
            const [premium, quoteHash] = await protocol.getPremiumQuote(
                coverage,
                2,
                period,
                user2.address
            );

            await guardianToken.connect(user1).approve(protocol.address, premium);
            await protocol.connect(user1).purchaseInsurance(
                user2.address,
                coverage,
                period,
                quoteHash
            );

            await expect(
                protocol.connect(user1).setAutoRenewal(user2.address, true)
            )
                .to.emit(protocol, "AutoRenewalSet")
                .withArgs(user1.address, user2.address, true);

            const coverages = await protocol.getUserActiveCoverages(user1.address, user2.address);
            expect(coverages[0].autoRenew).to.be.true;
        });
    });
});
