const { ethers, upgrades } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    // Deploy Guardian Token first
    console.log("\nDeploying Guardian Token...");
    const GuardianToken = await ethers.getContractFactory("GuardianToken");
    const guardianToken = await GuardianToken.deploy(
        "NexusGuard Token",
        "GUARD",
        ethers.utils.parseEther("1000000") // 1 million initial supply
    );
    await guardianToken.deployed();
    console.log("GuardianToken deployed to:", guardianToken.address);

    // Deploy Price Feed
    console.log("\nDeploying Price Feed...");
    const PriceFeed = await ethers.getContractFactory("SonicPriceFeed");
    const priceFeed = await PriceFeed.deploy();
    await priceFeed.deployed();
    console.log("PriceFeed deployed to:", priceFeed.address);

    // Deploy Main Protocol
    console.log("\nDeploying NexusGuard Protocol...");
    const NexusGuardDeFiProtocolV1 = await ethers.getContractFactory("NexusGuardDeFiProtocolV1");
    
    const protocol = await upgrades.deployProxy(NexusGuardDeFiProtocolV1, [
        guardianToken.address,
        priceFeed.address,
        process.env.PROTOCOL_GIT_HASH || "initial_deployment",
        "https://docs.nexusguard.sonic.network"
    ], {
        initializer: 'initialize',
        kind: 'uups'
    });
    
    await protocol.deployed();
    console.log("NexusGuardDeFiProtocolV1 deployed to:", protocol.address);

    // Setup roles and initial configuration
    console.log("\nSetting up protocol roles and configuration...");
    
    const ADMIN_ROLE = await protocol.ADMIN_ROLE();
    const RISK_MANAGER_ROLE = await protocol.RISK_MANAGER_ROLE();
    const EMERGENCY_ROLE = await protocol.EMERGENCY_ROLE();
    const ARBITRATOR_ROLE = await protocol.ARBITRATOR_ROLE();

    // Grant roles
    await protocol.grantRole(ADMIN_ROLE, deployer.address);
    await protocol.grantRole(RISK_MANAGER_ROLE, deployer.address);
    await protocol.grantRole(EMERGENCY_ROLE, deployer.address);
    await protocol.grantRole(ARBITRATOR_ROLE, deployer.address);

    // Initialize Premium Management
    await protocol.initializePremiumManagement();

    // Create initial premium tiers
    console.log("\nSetting up premium tiers...");
    await protocol.createPremiumTier(
        ethers.utils.parseEther("1000"),    // minCoverage: 1,000 GUARD
        ethers.utils.parseEther("10000"),   // maxCoverage: 10,000 GUARD
        1000,                               // baseRate: 10%
        200                                 // multiplier: 2x
    );

    await protocol.createPremiumTier(
        ethers.utils.parseEther("10000"),   // minCoverage: 10,000 GUARD
        ethers.utils.parseEther("100000"),  // maxCoverage: 100,000 GUARD
        800,                                // baseRate: 8%
        150                                 // multiplier: 1.5x
    );

    // Set risk limits
    console.log("\nSetting risk limits...");
    await protocol.updateRiskLimits(
        ethers.utils.parseEther("100000"),  // perProjectLimit: 100,000 GUARD
        ethers.utils.parseEther("500000"),  // perCategoryLimit: 500,000 GUARD
        12000,                              // minCollateralization: 120%
        8000                                // maxUtilization: 80%
    );

    // Write deployment addresses to a file
    const fs = require('fs');
    const deploymentInfo = {
        network: network.name,
        guardianToken: guardianToken.address,
        priceFeed: priceFeed.address,
        protocol: protocol.address,
        timestamp: new Date().toISOString(),
        deployer: deployer.address
    };

    fs.writeFileSync(
        `deployment-${network.name}-${new Date().toISOString().split('T')[0]}.json`,
        JSON.stringify(deploymentInfo, null, 2)
    );

    console.log("\nDeployment Summary:");
    console.log("====================");
    console.log("Network:", network.name);
    console.log("GuardianToken:", guardianToken.address);
    console.log("PriceFeed:", priceFeed.address);
    console.log("NexusGuardDeFiProtocolV1:", protocol.address);
    console.log("Deployer:", deployer.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });