const { ethers } = require("hardhat");
const { deployMockTokens, setupProtocolRoles, setupPremiumTiers } = require("./helpers");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying test environment with account:", deployer.address);

    // Deploy mock tokens
    const { guardianToken, priceFeed } = await deployMockTokens();
    
    // Deploy protocol
    const NexusGuardDeFiProtocolV1 = await ethers.getContractFactory("NexusGuardDeFiProtocolV1");
    const protocol = await upgrades.deployProxy(NexusGuardDeFiProtocolV1, [
        guardianToken.address,
        priceFeed.address,
        "test_git_hash",
        "https://test.nexusguard.com"
    ]);
    
    await protocol.deployed();

    // Setup roles and configuration
    await setupProtocolRoles(protocol, deployer);
    await setupPremiumTiers(protocol);

    // Mint test tokens
    await guardianToken.mint(deployer.address, ethers.utils.parseEther("1000000"));

    console.log("\nTest Deployment Completed:");
    console.log("GuardianToken:", guardianToken.address);
    console.log("PriceFeed:", priceFeed.address);
    console.log("Protocol:", protocol.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });