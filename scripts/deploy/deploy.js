const { ethers, upgrades } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy Mock Tokens for testing
    console.log("\nDeploying Mock Tokens...");
    const MockERC20 = await ethers.getContractFactory("MockERC20");
    const guardianToken = await MockERC20.deploy("Guardian Token", "GUARD");
    await guardianToken.deployed();
    console.log("GuardianToken deployed to:", guardianToken.address);

    const MockPriceFeed = await ethers.getContractFactory("MockPriceFeed");
    const priceFeed = await MockPriceFeed.deploy();
    await priceFeed.deployed();
    console.log("PriceFeed deployed to:", priceFeed.address);

    // Deploy Main Protocol
    console.log("\nDeploying NexusGuard Protocol...");
    const NexusGuardDeFiProtocolV1 = await ethers.getContractFactory("NexusGuardDeFiProtocolV1");
    
    const protocol = await upgrades.deployProxy(NexusGuardDeFiProtocolV1, [
        guardianToken.address,
        priceFeed.address,
        "initial_git_hash",
        "https://docs.nexusguard.com"
    ], {
        initializer: 'initialize',
        kind: 'uups'
    });
    
    await protocol.deployed();
    console.log("NexusGuardDeFiProtocolV1 deployed to:", protocol.address);

    // Setup initial roles
    console.log("\nSetting up roles...");
    const ADMIN_ROLE = await protocol.ADMIN_ROLE();
    const RISK_MANAGER_ROLE = await protocol.RISK_MANAGER_ROLE();
    const EMERGENCY_ROLE = await protocol.EMERGENCY_ROLE();
    const ARBITRATOR_ROLE = await protocol.ARBITRATOR_ROLE();

    await protocol.grantRole(ADMIN_ROLE, deployer.address);
    await protocol.grantRole(RISK_MANAGER_ROLE, deployer.address);
    await protocol.grantRole(EMERGENCY_ROLE, deployer.address);
    await protocol.grantRole(ARBITRATOR_ROLE, deployer.address);

    // Initialize Premium Management
    console.log("\nInitializing Premium Management...");
    await protocol.initializePremiumManagement();

    // Create initial premium tiers
    console.log("\nCreating Premium Tiers...");
    await protocol.createPremiumTier(
        ethers.utils.parseEther("1000"),    // minCoverage
        ethers.utils.parseEther("10000"),   // maxCoverage
        1000,                               // baseRate (10%)
        200                                 // multiplier (2x)
    );

    await protocol.createPremiumTier(
        ethers.utils.parseEther("10000"),   // minCoverage
        ethers.utils.parseEther("100000"),  // maxCoverage
        800,                                // baseRate (8%)
        150                                 // multiplier (1.5x)
    );

    // Set initial risk limits
    console.log("\nSetting Risk Limits...");
    await protocol.updateRiskLimits(
        ethers.utils.parseEther("100000"),  // perProjectLimit
        ethers.utils.parseEther("500000"),  // perCategoryLimit
        12000,                              // minCollateralization (120%)
        8000                                // maxUtilization (80%)
    );

    // Verify contracts
    console.log("\nVerifying contracts...");
    try {
        await hre.run("verify:verify", {
            address: guardianToken.address,
            constructorArguments: ["Guardian Token", "GUARD"],
        });

        await hre.run("verify:verify", {
            address: priceFeed.address,
            constructorArguments: [],
        });

        console.log("Contract verification completed");
    } catch (error) {
        console.error("Error during verification:", error);
    }

    // Log deployment addresses
    console.log("\nDeployment Summary:");
    console.log("====================");
    console.log("GuardianToken:", guardianToken.address);
    console.log("PriceFeed:", priceFeed.address);
    console.log("NexusGuardDeFiProtocolV1:", protocol.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });