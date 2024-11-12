Token Release Schedule:
```
interface EmissionSchedule {
    year1: {
        total: 30_000_000,
        breakdown: {
            initialLiquidity: 10_000_000,
            teamAndDev: 0,  // Cliff period
            communityIncentives: 3_750_000,
            treasury: 4_000_000
        }
    },
    year2: {
        total: 25_000_000,
        breakdown: {
            teamAndDev: 5_000_000,
            communityIncentives: 3_750_000,
            treasury: 4_000_000
        }
    },
    year3: {
        total: 25_000_000,
        breakdown: {
            teamAndDev: 5_000_000,
            communityIncentives: 3_750_000,
            treasury: 4_000_000
        }
    },
    year4: {
        total: 20_000_000,
        breakdown: {
            teamAndDev: 5_000_000,
            communityIncentives: 3_750_000,
            treasury: 4_000_000
        }
    }
}
```
