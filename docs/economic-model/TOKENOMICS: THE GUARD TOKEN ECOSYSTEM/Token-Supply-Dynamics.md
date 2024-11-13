Supply Management:
```solidity
contract TokenSupplyManagement {
    struct SupplyControls {
        bool hasMaxSupply;        // True
        uint256 maxSupply;        // 100,000,000 GUARD
        bool hasBurnMechanism;    // True
        bool hasMintingRights;    // False after initial distribution
    }
    
    struct BurnMechanism {
        uint256 percentPremiums;  // 10% of premiums
        uint256 percentFees;      // 20% of protocol fees
        bool autoExecute;         // True
    }
}
```
