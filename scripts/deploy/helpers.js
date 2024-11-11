const { ethers } = require("hardhat");

async function deployMockTokens() {
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    const MockPriceFeed = await ethers.getContractFactory("MockPriceFeed");

    const guardianToken = await MockERC20.deploy("Guardian Token", "GUARD");
    const priceFeed = await MockPriceFeed.deploy();

    await guardianToken.deployed();
    await priceFeed.deployed();

    return { guardianToken, priceFeed };
}

async function setupProtocolRoles(protocol, deployer) {
    const roles = {
        ADMIN_ROLE: await protocol.ADMIN_ROLE(),
        RISK_MANAGER_ROLE: await protocol.RISK_MANAGER_ROLE(),
        EMERGENCY_ROLE: await protocol.EMERGENCY_ROLE(),
        ARBITRATOR_ROLE: await protocol.ARBITRATOR_ROLE()
    };

    for (const role of Object.values(roles)) {
        await protocol.grantRole(role, deployer.address);
    }

    return roles;
}

async function setupPremiumTiers(protocol) {
    await protocol.createPremiumTier(
        ethers.utils.parseEther("1000"),
        ethers.utils.parseEther("10000"),
        1000,
        200
    );

    await protocol.createPremiumTier(
        ethers.utils.parseEther("10000"),
        ethers.utils.parseEther("100000"),
        800,
        150
    );
}

module.exports = {
    deployMockTokens,
    setupProtocolRoles,
    setupPremiumTiers
};