const { time } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers, upgrades } = require("hardhat");

async function deployNexusGuardFixture() {
    // Get signers
    const [owner, auditor, riskManager, oracle, arbitrator, emergency, operator, user1, user2] = await ethers.getSigners();

    // Deploy MockERC20
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    const guardianToken = await MockERC20.deploy("Guardian Token", "GUARD");

    // Deploy MockPriceFeed
    const MockPriceFeed = await ethers.getContractFactory("MockPriceFeed");
    const priceFeed = await MockPriceFeed.deploy();

    // Deploy Protocol
    const NexusGuardDeFiProtocolV1 = await ethers.getContractFactory("NexusGuardDeFiProtocolV1");
    const protocol = await upgrades.deployProxy(NexusGuardDeFiProtocolV1, [
        await guardianToken.getAddress(),
        await priceFeed.getAddress(),
        "https://github.com/nexusguard",
        "https://docs.nexusguard.io"
    ]);

    return {
        protocol,
        guardianToken,
        priceFeed,
        owner,
        auditor,
        riskManager,
        oracle,
        arbitrator,
        emergency,
        operator,
        user1,
        user2
    };
}

module.exports = {
    deployNexusGuardFixture
};
