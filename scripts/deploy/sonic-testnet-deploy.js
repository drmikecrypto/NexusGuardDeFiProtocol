const { ethers, upgrades } = require("hardhat");

async function main() {
    // Similar to mainnet deployment but with testnet-specific configurations
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts to Sonic Testnet with account:", deployer.address);

    // Deploy Guardian Token with smaller initial supply for testing
    const GuardianToken = await ethers.getContractFactory("GuardianToken");
    const guardianToken = await GuardianToken.deploy(
        "NexusGuard Test Token",
        "tGUARD",
        ethers.utils.parseEther("100000") // 100k initial supply for testnet
    );
    await guardianToken.deployed();

    // Rest of deployment logic with testnet-specific parameters
    // ... [Similar to mainnet deployment but with adjusted values]
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });