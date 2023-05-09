/**
  * Experiment Types
  * 0: Server
  * 1: User
  * 2: Server and User
  * 
  * Rollout Types
  * -1: Rollout has reverted due to security issues
  * 0: Regular rollout
  * 1: Very slow rollout from old to new
  * 2: Rollout by server feature
  * 3: Birthday activities feature
  * 4: In beta/alpha testing
  * 
  * Requirement Types
  * 0: Max member count
  */

module.exports = {
    clyde_ai: {
        rate: 21,
        experimentType: 0,
        rolloutType: 0
    },
    split_permissions: {
        rate: 100,
        experimentType: 0,
        rolloutType: 0,
        requirements: [
            {
                type: 0,
                value: 50
            }
        ]
    }
};