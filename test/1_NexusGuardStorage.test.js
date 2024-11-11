const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { deployNexusGuardFixture } = require("./helpers");

describe("NexusGuardStorage", function () {
  let protocol;
  let guardianToken;
  let priceFeed;
  let owner;
  let auditor;
  let user1;
  
  beforeEach(async function () {
    const fixture = await loadFixture(deployNexusGuardFixture);
    protocol = fixture.protocol;
    guardianToken = fixture.guardianToken;
    priceFeed = fixture.priceFeed;
    owner = fixture.owner;
    auditor = fixture.auditor;
    user1 = fixture.user1;
  });

  describe("Project Management", function () {
    const projectAddress = "0x1234567890123456789012345678901234567890";
    const initialScore = 85;
    const riskCategory = 2;
    const metadataHash = ethers.utils.id("project metadata");
    const auditReportURI = "ipfs://QmReport";

    it("should allow auditor to add a project", async function () {
      await expect(
        protocol.connect(auditor).addProject(
          projectAddress,
          initialScore,
          riskCategory,
          metadataHash,
          auditReportURI
        )
      )
        .to.emit(protocol, "ProjectAdded")
        .withArgs(projectAddress, initialScore, riskCategory, metadataHash, auditReportURI);

      const project = await protocol.projects(projectAddress);
      expect(project.securityScore).to.equal(initialScore);
      expect(project.riskCategory).to.equal(riskCategory);
      expect(project.isAudited).to.be.true;
      expect(project.metadataHash).to.equal(metadataHash);
      expect(project.auditReportURI).to.equal(auditReportURI);
      expect(project.isActive).to.be.true;
    });

    it("should not allow non-auditor to add a project", async function () {
      await expect(
        protocol.connect(user1).addProject(
          projectAddress,
          initialScore,
          riskCategory,
          metadataHash,
          auditReportURI
        )
      ).to.be.revertedWith(/AccessControl: account .* is missing role .*/);
    });

    it("should validate project parameters", async function () {
      // Test invalid security score
      await expect(
        protocol.connect(auditor).addProject(
          projectAddress,
          101,
          riskCategory,
          metadataHash,
          auditReportURI
        )
      ).to.be.revertedWith("Invalid security score");

      // Test invalid risk category
      await expect(
        protocol.connect(auditor).addProject(
          projectAddress,
          initialScore,
          6,
          metadataHash,
          auditReportURI
        )
      ).to.be.revertedWith("Invalid risk category");
    });
  });

  describe("User Management", function () {
    const validDid = "did:nexus:123456789";

    it("should allow user registration with valid DID", async function () {
      await expect(protocol.connect(user1).registerUser(validDid))
        .to.emit(protocol, "UserRegistered")
        .withArgs(user1.address, validDid);

      const user = await protocol.users(user1.address);
      expect(user.did).to.equal(validDid);
      expect(user.reputationScore).to.equal(0);
      expect(user.isBlacklisted).to.be.false;
    });

    it("should not allow registration with invalid DID", async function () {
      await expect(
        protocol.connect(user1).registerUser("invalid:did")
      ).to.be.revertedWith("Invalid DID format");
    });

    it("should not allow duplicate registration", async function () {
      await protocol.connect(user1).registerUser(validDid);
      await expect(
        protocol.connect(user1).registerUser(validDid)
      ).to.be.revertedWith("Already registered");
    });
  });
});
