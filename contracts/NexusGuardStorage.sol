// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

abstract contract NexusGuardStorage is 
    Initializable, 
    ReentrancyGuardUpgradeable,
    AccessControlUpgradeable,
    PausableUpgradeable 
{
    // Rest of the storage contract code...
}