// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract MockPriceFeed is AggregatorV3Interface {
    int256 private _price;
    uint8 private _decimals = 8;

    function decimals() external view override returns (uint8) {
        return _decimals;
    }

    function description() external pure override returns (string memory) {
        return "Mock Price Feed";
    }

    function version() external pure override returns (uint256) {
        return 1;
    }

    function getRoundData(uint80)
        external
        view
        override
        returns (uint80, int256, uint256, uint256, uint80)
    {
        return (0, _price, block.timestamp, block.timestamp, 0);
    }

    function latestRoundData()
        external
        view
        override
        returns (uint80, int256, uint256, uint256, uint80)
    {
        return (0, _price, block.timestamp, block.timestamp, 0);
    }

    function setPrice(int256 price) external {
        _price = price;
    }
}