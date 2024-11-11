const { expect } = require("chai");
const { ethers } = require("hardhat");
const { getCurrentTimestamp, deployMockContracts } = require("./test-helpers");

describe("NexusGuardInsurance", function () {
  let insurance;
  let owner;
  let auditor;
  let user;
  let mockPriceFeed;
  let mockGuardToken;
  const AUDITOR_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AUDITOR_ROLE"));

  beforeEach(async function () {
    [owner, auditor, user] = await ethers.getSigners();

    // Deploy mock contracts
    const { guardToken, priceFeed } = await deployMockContracts();
    mockGuardToken = guardToken;
    mockPriceFeed = priceFeed;

    // Deploy Insurance contract
    const NexusGuardInsurance = await ethers.getContractFactory("NexusGuardInsurance");
    insurance = await upgrades.deployProxy(NexusGuardInsurance, 
      [mockPriceFeed.address],
      { initializer: "initialize" }
    );
    await insurance.deployed();

    // Setup roles
    await insurance.grantRole(AUDITOR_ROLE, auditor.address);
  });

  describe("Initialization", function () {
    it("should initialize with correct price feed", async function () {
      expect(await insurance.sonicUsdPriceFeed()).to.equal(mockPriceFeed.address);
    });

    it("should set correct initial reserve ratio", async function () {
      const pool = await insurance.insurancePool();
      expect(pool.reserveRatio).to.equal(2000); // 20%
    });
  });

  describe("Premium Calculation", function () {
    beforeEach(async function () {
      // Add a test project first
      await insurance.connect(auditor).addProject(
        user.address,
        85, // security score
        2,  // risk category
        ethers.utils.id("metadata"),
        "ipfs://test"
      );
    });

    it("should calculate premium correctly", async function () {
      const coverage = ethers.utils.parseEther("1000"); // 1000 tokens
      const period = 30 * 24 * 60 * 60; // 30 days

      const [premium, quoteHash] = await insurance.getPremiumQuote(
        coverage,
        2, // risk category
        period,
        user.address
      );

      // Base rate (1%) + Risk multiplier (2 * 0.5%) = 2%
      const expectedPremium = coverage.mul(200).div(10000); // 2% of coverage
      expect(premium).to.equal(expectedPremium);
      expect(quoteHash).to.not.equal(ethers.constants.HashZero);
    });

    it("should revert for invalid coverage period", async function () {
      const coverage = ethers.utils.parseEther("1000");
      const shortPeriod = 29 * 24 * 60 * 60; // 29 days
      const longPeriod = 366 * 24 * 60 * 60; // 366 days

      await expect(
        insurance.getPremiumQuote(coverage, 2, shortPeriod, user.address)
      ).to.be.revertedWith("Period too short");

      await expect(
        insurance.getPremiumQuote(coverage, 2, longPeriod, user.address)
      ).to.be.revertedWith("Period too long");
    });

    it("should revert for inactive project", async function () {
      const coverage = ethers.utils.parseEther("1000");
      const period = 30 * 24 * 60 * 60;
      
      // Try to get quote for non-existent project
      await expect(
        insurance.getPremiumQuote(
          coverage,
          2,
          period,
          ethers.constants.AddressZero
        )
      ).to.be.revertedWith("Project not active");
    });
  });

  describe("Events", function () {
    it("should emit correct events on project addition", async function () {
      const projectAddress = user.address;
      const securityScore = 85;
      const riskCategory = 2;
      const metadataHash = ethers.utils.id("metadata");
      const auditReportURI = "ipfs://test";

      await expect(
        insurance.connect(auditor).addProject(
          projectAddress,
          securityScore,
          riskCategory,
          metadataHash,
          auditReportURI
        )
      )
        .to.emit(insurance, "ProjectAdded")
        .withArgs(
          projectAddress,
          securityScore,
          riskCategory,
          metadataHash,
          auditReportURI
        );
    });
  });
});
