const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { deployNexusGuardFixture, advanceTime } = require("./helpers");
const { ethers } = require("hardhat");

describe("NexusGuard Integration Tests", function() {
    let protocol;
    let guardianToken;
    let priceFeed;
    let owner;
    let auditor;
    let riskManager;
    let arbitrator;
    let emergency;
    let user1;
    let user2;
    let treasury;

    beforeEach(async function() {
        const fixture = await loadFixture(deployNexusGuardFixture);
        ({
            protocol,
            guardianToken,
            priceFeed,
            owner,
            auditor,
            riskManager,
            arbitrator,
            emergency,
            user1,
            user2
        } = fixture);

        // Set initial price
        await priceFeed.setPrice(ethers.utils.parseUnits("1000", 8)); // $1000 per token

        // Fund users
        await guardianToken.mint(user1.address, ethers.utils.parseEther("10000"));
        await guardianToken.mint(user2.address, ethers.utils.parseEther("10000"));
        
        // Approve token spending
        await guardianToken.connect(user1).approve(protocol.address, ethers.constants.MaxUint256);
        await guardianToken.connect(user2).approve(protocol.address, ethers.constants.MaxUint256);
    });

    describe("Complete Insurance Lifecycle", function() {
        it("should handle full insurance flow from purchase to claim", async function() {
            // 1. Register users
            await protocol.connect(user1).registerUser("did:nexus:user1");
            await protocol.connect(user2).registerUser("did:nexus:user2");

            // 2. Add project
            const projectMetadata = ethers.utils.id("project:metadata");
            await protocol.connect(auditor).addProject(
                user2.address,
                85,
                2,
                projectMetadata,
                "ipfs://project-audit"
            );

            // 3. Purchase insurance
            const coverage = ethers.utils.parseEther("1000");
            const period = 30 * 24 * 60 * 60; // 30 days
            
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

            // 4. Verify coverage
            const userCoverages = await protocol.getUserActiveCoverages(user1.address, user2.address);
            expect(userCoverages[0].coverage).to.equal(coverage);
            expect(userCoverages[0].active).to.be.true;

            // 5. Submit claim
            const claimAmount = ethers.utils.parseEther("500");
            const evidence = "Security breach at block 12345";
            await protocol.connect(user1).initiateClaim(
                user2.address,
                claimAmount,
                evidence,
                "0x"
            );

            // 6. Process claim
            const claimId = 0;
            await protocol.connect(arbitrator).voteOnClaim(claimId, true, "Valid claim");
            
            const balanceBefore = await ethers.provider.getBalance(user1.address);
            await protocol.connect(riskManager).processClaim(claimId);
            const balanceAfter = await ethers.provider.getBalance(user1.address);

            // 7. Verify claim outcome
            expect(balanceAfter.sub(balanceBefore)).to.equal(claimAmount);
            
            const claim = await protocol.getClaimDetails(claimId);
            expect(claim.status).to.equal(1); // Approved

            // 8. Verify coverage update
            const updatedCoverages = await protocol.getUserActiveCoverages(user1.address, user2.address);
            expect(updatedCoverages[0].remainingCoverage).to.equal(coverage.sub(claimAmount));
        });
    });

    describe("Emergency Procedures Integration", function() {
        it("should handle emergency mode transitions", async function() {
            // 1. Setup initial state
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

            // 2. Enter emergency mode
            await protocol.connect(emergency).toggleEmergencyMode();
            
            const config = await protocol.config();
            expect(config.emergencyMode).to.be.true;

            // 3. Submit emergency claim
            const claimAmount = ethers.utils.parseEther("500");
            await protocol.connect(user1).initiateClaim(
                user2.address,
                claimAmount,
                "Emergency situation",
                "0x"
            );

            // 4. Process emergency claim
            const claimId = 0;
            const emergencyAction = protocol.interface.encodeFunctionData("processClaim", [claimId]);
            
            await protocol.connect(emergency).executeEmergencyAction(
                protocol.address,
                0,
                emergencyAction
            );

            // 5. Verify emergency handling
            const claim = await protocol.getClaimDetails(claimId);
            expect(claim.isEmergency).to.be.true;

            // 6. Exit emergency mode
            await protocol.connect(emergency).toggleEmergencyMode();
            
            const updatedConfig = await protocol.config();
            expect(updatedConfig.emergencyMode).to.be.false;
        });
    });

    describe("Governance Integration", function() {
        it("should execute configuration changes through governance", async function() {
            // 1. Create proposal for reserve ratio change
            const newReserveRatio = 2500; // 25%
            const proposal = {
                targets: [protocol.address],
                values: [0],
                signatures: ["_updateReserveRatio(uint256)"],
                calldatas: [ethers.utils.defaultAbiCoder.encode(['uint256'], [newReserveRatio])],
                description: "Update reserve ratio to 25%"
            };

            await protocol.connect(owner).propose(
                proposal.targets,
                proposal.values,
                proposal.signatures,
                proposal.calldatas,
                proposal.description,
                0 // ProposalType.Generic
            );

            // 2. Vote on proposal
            const proposalId = 1;
            await advanceTime(2); // Past voting delay
            
            await protocol.connect(user1).castVote(proposalId, true);
            await protocol.connect(user2).castVote(proposalId, true);

            // 3. Execute proposal
            await advanceTime(7 * 24 * 60 * 60 + 1); // Past voting period
            await protocol.execute(proposalId);

            // 4. Verify changes
            const pool = await protocol.insurancePool();
            expect(pool.reserveRatio).to.equal(newReserveRatio);
        });
    });

    describe("Risk Model Integration", function() {
        it("should apply risk model changes effectively", async function() {
            // 1. Update risk model
            await protocol.connect(riskManager)._updateRiskModel(
                2, // risk category
                150, // base premium rate (1.5%)
                75,  // risk multiplier (0.75%)
                ethers.utils.parseEther("1000000") // coverage limit
            );

            // 2. Register user and project
            await protocol.connect(user1).registerUser("did:nexus:user1");
            await protocol.connect(auditor).addProject(
                user2.address,
                85,
                2,
                ethers.utils.id("metadata"),
                "ipfs://test"
            );

            // 3. Get premium quote with new risk model
            const coverage = ethers.utils.parseEther("1000");
            const period = 30 * 24 * 60 * 60;
            
            const [premium, quoteHash] = await protocol.getPremiumQuote(
                coverage,
                2,
                period,
                user2.address
            );

            // 4. Verify premium calculation
            const expectedPremium = coverage.mul(225).div(10000); // 2.25% (1.5% + 0.75%)
            expect(premium).to.be.closeTo(expectedPremium, ethers.utils.parseEther("0.1"));

            // 5. Purchase insurance with new premium
            await protocol.connect(user1).purchaseInsurance(
                user2.address,
                coverage,
                period,
                quoteHash
            );

            // 6. Verify insurance pool update
            const pool = await protocol.insurancePool();
            expect(pool.totalPremiums).to.equal(premium);
        });
    });

    describe("Multi-User Interaction Tests", function() {
        it("should handle multiple users and claims correctly", async function() {
            // 1. Register multiple users
            await Promise.all([
                protocol.connect(user1).registerUser("did:nexus:user1"),
                protocol.connect(user2).registerUser("did:nexus:user2")
            ]);

            // 2. Add project
            await protocol.connect(auditor).addProject(
                user2.address,
                85,
                2,
                ethers.utils.id("metadata"),
                "ipfs://test"
            );

            // 3. Purchase insurance for multiple users
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

            // 4. Submit multiple claims
            const claimAmount = ethers.utils.parseEther("300");
            await Promise.all([
                protocol.connect(user1).initiateClaim(
                    user2.address,
                    claimAmount,
                    "Claim 1",
                    "0x"
                ),
                protocol.connect(user2).initiateClaim(
                    user2.address,
                    claimAmount,
                    "Claim 2",
                    "0x"
                )
            ]);

            // 5. Process claims in batch
            const claimIds = [0, 1];
            await protocol.connect(operator).processBatchClaims(claimIds);

            // 6. Verify all claims processed
            const claim1 = await protocol.getClaimDetails(0);
            const claim2 = await protocol.getClaimDetails(1);
            
            expect(claim1.status).to.not.equal(0); // Not pending
            expect(claim2.status).to.not.equal(0); // Not pending
        });
    });
});
