const { expect } = require("chai");
const { ethers } = require("hardhat");
const { getCurrentTimestamp, deployMockContracts } = require("./test-helpers");

describe("NexusGuardStorage", function () {
  let nexusGuardStorage;
  let owner;
  let auditor;
  let user;
  const AUDITOR_ROLE = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("AUDITOR_ROLE"));

  beforeEach(async function () {
    [owner, auditor, user] = await ethers.getSigners();

    const NexusGuardStorage = await ethers.getContractFactory("NexusGuardStorage");
    nexusGuardStorage = await upgrades.deployProxy(NexusGuardStorage, [], { initializer: "__NexusGuardStorage_init" });
    await nexusGuardStorage.deployed();

    await nexusGuardStorage.grantRole(AUDITOR_ROLE, auditor.address);
  });

  describe("Project Management", function () {
    it("should allow auditor to add a project", async function () {
      const projectAddress = user.address;
      const securityScore = 85;
      const riskCategory = 2;
      const metadataHash = ethers.utils.id("project metadata");
      const auditReportURI = "ipfs://QmReport";

      await expect(
        nexusGuardStorage.connect(auditor).addProject(
          projectAddress,
          securityScore,
          riskCategory,
          metadataHash,
          auditReportURI
        )
      )
        .to.emit(nexusGuardStorage, "ProjectAdded")
        .withArgs(
          projectAddress,
          securityScore,
          riskCategory,
          metadataHash,
          auditReportURI
        );

      const project = await nexusGuardStorage.projects(projectAddress);
      expect(project.securityScore).to.equal(securityScore);
      expect(project.riskCategory).to.equal(riskCategory);
      expect(project.isAudited).to.be.true;
      expect(project.metadataHash).to.equal(metadataHash);
      expect(project.auditReportURI).to.equal(auditReportURI);
      expect(project.isActive).to.be.true;
    });

    it("should not allow non-auditor to add a project", async function () {
      await expect(
        nexusGuardStorage.connect(user).addProject(
          user.address,
          85,
          2,
          ethers.utils.id("metadata"),
          "ipfs://QmReport"
        )
      ).to.be.revertedWith(
        `AccessControl: account ${user.address.toLowerCase()} is missing role ${AUDITOR_ROLE}`
      );
    });
  });

  describe("Access Control", function () {
    it("should set correct admin role", async function () {
      expect(await nexusGuardStorage.hasRole(await nexusGuardStorage.DEFAULT_ADMIN_ROLE(), owner.address)).to.be.true;
    });

    it("should allow admin to grant roles", async function () {
      const newAuditor = user;
      await nexusGuardStorage.grantRole(AUDITOR_ROLE, newAuditor.address);
      expect(await nexusGuardStorage.hasRole(AUDITOR_ROLE, newAuditor.address)).to.be.true;
    });
  });
});
