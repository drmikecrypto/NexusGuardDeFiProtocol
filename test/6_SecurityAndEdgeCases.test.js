const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { deployNexusGuardFixture, advanceTime } = require("./helpers");
const { ethers } = require("hardhat");

describe("NexusGuard Security and Edge Cases", function() {
    let protocol;
    let guardianToken;
    let priceFeed;
    let owner;
    let auditor;
    let riskManager;
    let oracle;
    let arbitrator;
    let emergency;
    let user1;
    let user2;

    beforeEach(async function() {
        const fixture = await loadFixture(deployNexusGuardFixture);
        ({
            protocol,
            guardianToken,
            priceFeed,
            owner,
            auditor,
            riskManager,
            oracle,
            arbitrator,
            emergency,
            user1,
            user2
        } = fixture);

        await priceFeed.setPrice(ethers.utils.parseUnits("1000", 8));
    });

    describe("Security Tests", function() {
        it("should prevent unauthorized role access", async function() {
            await expect(
                protocol.connect(user1).addProject(
                    user2.address,
                    85,
                    2,
                    ethers.utils.id("metadata"),
                    "ipfs://test"
                )
            ).to.be.revertedWith(/AccessControl/);
        });

        it("should prevent double claim submissions", async function() {
            await protocol.connect(user1).registerUser("did:nexus:user1");
            
            const coverage = ethers.utils.parseEther("1000");
            const period = 30 * 24 * 60 * 60;
            const [premium, quoteHash] = await protocol.getPremiumQuote(
                coverage,
                2,
                period,
                user2.address
            );

            await protocol.connect(user1).purchaseInsurance(
                user2.address,
                coverage,
                period,
                quoteHash
            );

            await protocol.connect(user1).initiateClaim(
                user2.address,
                ethers.utils.parseEther("500"),
                "First claim",
                "0x"
            );

            await expect(
                protocol.connect(user1).initiateClaim(
                    user2.address,
                    ethers.utils.parseEther("500"),
                    "Second claim",
                    "0x"
                )
            ).to.be.revertedWith("ClaimCooldown");
        });

        it("should enforce coverage limits", async function() {
            await protocol.connect(user1).registerUser("did:nexus:user1");
            
            const coverage = ethers.utils.parseEther("10000001"); // Above maximum
            const period = 30 * 24 * 60 * 60;
            
            await expect(
                protocol.getPremiumQuote(
                    coverage,
                    2,
                    period,
                    user2.address
                )
            ).to.be.revertedWith("InvalidCoverage");
        });

        it("should prevent claim amount manipulation", async function() {
            await protocol.connect(user1).registerUser("did:nexus:user1");
            
            const coverage = ethers.utils.parseEther("1000");
            const period = 30 * 24 * 60 * 60;
            const [premium, quoteHash] = await protocol.getPremiumQuote(
                coverage,
                2,
                period,
                user2.address
            );

            await protocol.connect(user1).purchaseInsurance(
                user2.address,
                coverage,
                period,
                quoteHash
            );

            await expect(
                protocol.connect(user1).initiateClaim(
                    user2.address,
                    coverage.mul(2),
                    "Manipulated claim",
                    "0x"
                )
            ).to.be.revertedWith("InvalidCoverage");
        });
    });

    describe("Edge Cases", function() {
        it("should handle zero premium edge case", async function() {
            await protocol.connect(user1).registerUser("did:nexus:user1");
            
            const coverage = ethers.utils.parseEther("1");
            const period = 30 * 24 * 60 * 60;
            
            await expect(
                protocol.getPremiumQuote(
                    coverage,
                    1, // Lowest risk category
                    period,
                    user2.address
                )
            ).to.be.revertedWith("PremiumTooLow");
        });

        it("should handle maximum coverage period", async function() {
            await protocol.connect(user1).registerUser("did:nexus:user1");
            
            const coverage = ethers.utils.parseEther("1000");
            const period = 366 * 24 * 60 * 60; // Over 1 year
            
            await expect(
                protocol.getPremiumQuote(
                    coverage,
                    2,
                    period,
                    user2.address
                )
            ).to.be.revertedWith("InvalidPeriod");
        });

        it("should handle concurrent claims processing", async function() {
            await protocol.connect(user1).registerUser("did:nexus:user1");
            
            const coverage = ethers.utils.parseEther("1000");
            const period = 30 * 24 * 60 * 60;
            const [premium, quoteHash] = await protocol.getPremiumQuote(
                coverage,
                2,
                period,
                user2.address
            );

            await protocol.connect(user1).purchaseInsurance(
                user2.address,
                coverage,
                period,
                quoteHash
            );

            // Submit first claim
            await protocol.connect(user1).initiateClaim(
                user2.address,
                ethers.utils.parseEther("400"),
                "First claim",
                "0x"
            );

            // Try to process same claim twice
            await protocol.connect(riskManager).processClaim(0);
            await expect(
                protocol.connect(riskManager).processClaim(0)
            ).to.be.revertedWith("Invalid claim status");
        });
    });

    describe("Stress Tests", function() {
        it("should handle multiple simultaneous insurance purchases", async function() {
            await Promise.all([
                protocol.connect(user1).registerUser("did:nexus:user1"),
                protocol.connect(user2).registerUser("did:nexus:user2")
            ]);

            const coverage = ethers.utils.parseEther("1000");
            const period = 30 * 24 * 60 * 60;
            const [premium, quoteHash] = await protocol.getPremiumQuote(
                coverage,
                2,
                period,
                user2.address
            );

            await Promise.all([
                protocol.connect(user1).purchaseInsurance(
                    user2.address,
                    coverage,
                    period,
                    quoteHash
                ),
                protocol.connect(user2).purchaseInsurance(
                    user2.address,
                    coverage,
                    period,
                    quoteHash
                )
            ]);

            const user1Coverages = await protocol.getUserActiveCoverages(user1.address, user2.address);
            const user2Coverages = await protocol.getUserActiveCoverages(user2.address, user2.address);

            expect(user1Coverages.length).to.equal(1);
            expect(user2Coverages.length).to.equal(1);
        });

        it("should handle maximum number of voters", async function() {
            // Setup multiple arbitrators
            const arbitrators = await ethers.getSigners();
            const ARBITRATOR_ROLE = await protocol.ARBITRATOR_ROLE();

            for (let i = 0; i < 10; i++) {
                await protocol.grantRole(ARBITRATOR_ROLE, arbitrators[i].address);
            }

            // Create claim
            await protocol.connect(user1).registerUser("did:nexus:user1");
            const coverage = ethers.utils.parseEther("1000");
            const period = 30 * 24 * 60 * 60;
            const [premium, quoteHash] = await protocol.getPremiumQuote(
                coverage,
                2,
                period,
                user2.address
            );

            await protocol.connect(user1).purchaseInsurance(
                user2.address,
                coverage,
                period,
                quoteHash
            );

            await protocol.connect(user1).initiateClaim(
                user2.address,
                ethers.utils.parseEther("500"),
                "Multiple voters claim",
                "0x"
            );

            // Have all arbitrators vote
            for (let i = 0; i < 10; i++) {
                await protocol.connect(arbitrators[i]).voteOnClaim(0, true, "Vote " + i);
            }

            const claim = await protocol.getClaimDetails(0);
            expect(claim.votesFor).to.equal(10);
        });
    });
});
