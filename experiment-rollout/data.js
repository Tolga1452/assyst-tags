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
  * 2: Birthday activities feature
  * 3: In beta/alpha testing
  * 
  * Requirement Types
  * 0: Server must not have features
  * 1: Maximum member count
  * 2: Member count range
  * 
  * Priority Types
  * 0: Not started
  * 1: Rolling out
  * 2: Rolled out
  */

const data = {
    clyde_ai: {
        rate: 21,
        ranges: [[0, 1200]],
        experimentType: 0,
        rolloutType: 0,
        requirements: [
            {
                type: 0,
                value: ['COMMUNITY'],
                rate: 100
            },
            {
                type: 1,
                value: 100,
                rate: 11,
                ranges: [
                    [0, 100],
                    [200, 1200]
                ]
            },
            {
                type: 2,
                value: [101, 200],
                rate: 10,
                ranges: [[0, 1000]]
            }
        ]
    },
    split_permissions: {
        rate: 1,
        ranges: [[0, 100]],
        experimentType: 0,
        rolloutType: 0
    },
    channel_summaries: {
        experimentType: 0,
        rolloutType: 4
    },
    pomelo: {
        experimentType: 1,
        rolloutType: 1,
        priority: [
            {
                status: 1,
                name: 'Verified bots (server count wins name conflicts, other ones will get their discriminator appended)'
            },
            {
                status: 0,
                name: 'Brands'
            },
            {
                status: 0,
                name: 'Discord staff'
            },
            {
                status: 0,
                name: 'Partnered and verified server owners'
            },
            {
                status: 0,
                name: 'Everyone else (people who bought Nitro up to March 1, 2023 will be prioritized)'
            }
        ],
        notes: [
            {
                title: 'Checking Pomelo Usernames',
                text: 'Checking Pomelo usernames via API has patched and accounts which tried to check usernames will be IP banned from Discord.'
            }
        ]
    },
    jamspace: {
        rolloutType: 3,
        timestamp: 1685836800
    },
    color_together: {
        rolloutType: 3,
        timestamp: 1686441600
    },
    voice_messages_server: {
        rate: 100,
        experimentType: 0,
        rolloutType: 0,
        requirements: [
            {
                type: 1,
                value: 200,
                rate: 100
            }
        ]
    },
    soundboard: {
        rate: 100,
        experimentType: 0
    },
    server_guide: {
        rate: 50,
        experimentType: 0,
        rolloutType: 0
    },
    putt_party_paradise: {
        rolloutType: 3,
        timestamp: 1684713600
    }
};