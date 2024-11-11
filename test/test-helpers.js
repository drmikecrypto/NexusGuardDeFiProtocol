const { ethers } = require("hardhat");

async function advanceTime(seconds) {
  await ethers.provider.send("evm_increaseTime", [seconds]);
  await ethers.provider.send("evm_mine");
}

async function getCurrentTimestamp() {
  const blockNumber = await ethers.provider.getBlockNumber();
  const block = await ethers.provider.getBlock(blockNumber);
  return block.timestamp;
}

async function deployMockContracts() {
  // Deploy MockERC20
  const MockERC20 = await ethers.getContractFactory("MockERC20");
  const guardToken = await MockERC20.deploy("Guardian Token", "GUARD");

  // Deploy MockPriceFeed
  const MockPriceFeed = await ethers.getContractFactory("MockPriceFeed");
  const priceFeed = await MockPriceFeed.deploy();

  return { guardToken, priceFeed };
}

module.exports = {
  advanceTime,
  getCurrentTimestamp,
  deployMockContracts
};
