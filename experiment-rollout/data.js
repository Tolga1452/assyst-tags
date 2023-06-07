const data = {
    clyde_ai: {
        rate: 12,
        ranges: [[0, 1200]],
        experimentType: 0,
        rolloutType: 0,
        requirements: [
            {
                type: 0,
                value: ['COMMUNITY'],
                rate: 100,
                ranges: [[0, 10000]]
            },
            {
                type: 2,
                value: 100,
                rate: 11,
                ranges: [
                    [0, 100],
                    [200, 1200]
                ]
            },
            {
                type: 3,
                value: [101, 200],
                rate: 1,
                ranges: [[100, 200]]
            }
        ]
    },
    split_permissions: {
        rate: 1,
        ranges: [[0, 100]],
        experimentType: 0,
        rolloutType: 0,
        notes: [
            {
                title: 'Rollout Date',
                text: 'This feature is expected to be rolled out on **June 30**.'
            }
        ]
    },
    channel_summaries: {
        experimentType: 0,
        rolloutType: 3
    },
    pomelo: {
        experimentType: 1,
        rolloutType: 1,
        priority: [
            {
                status: 2,
                name: 'Brands / Large bots | Reserved unless Discord partner for brands'
            },
            {
                status: 2,
                name: 'Discord Staff | Staff and personal accounts'
            },
            {
                status: 2,
                name: 'Partnered / verified / 100+ USD/month server subscription server owners'
            },
            {
                status: 1,
                name: 'Everyone else | Ordered by Nitro/Account creation | Needs Nitro bought before 1st March 2023 | More details: `rollout priority 4`',
                subPriorities: [
                    {
                        status: 2,
                        name: '2015 Accounts'
                    },
                    {
                        status: 1,
                        name: '2016 Accounts',
                        position: 'Regular Users'
                    },
                    {
                        status: 0,
                        name: '2017 Accounts'
                    },
                    {
                        status: 0,
                        name: '2018 Accounts'
                    },
                    {
                        status: 0,
                        name: '2019 Accounts'
                    },
                    {
                        status: 0,
                        name: '2020 Accounts'
                    },
                    {
                        status: 0,
                        name: '2021 Accounts'
                    },
                    {
                        status: 0,
                        name: '2022 Accounts'
                    },
                    {
                        status: 0,
                        name: '2023 Accounts'
                    }
                ]
            }
        ],
        notes: [
            {
                title: 'Bots',
                text: 'Bots are not forced to have unique usernames.'
            }
        ]
    },
    jamspace: {
        rolloutType: 2,
        timestamp: 1685404800
    },
    color_together: {
        rolloutType: -2,
        replacedBy: 'poker_night_update'
    },
    server_guide: {
        rate: 50,
        ranges: [[5000, 10000]],
        experimentType: 0,
        rolloutType: 0
    },
    markdown_server: {
        rate: 100,
        ranges: [[0, 10000]],
        experimentType: 0,
        rolloutType: 0,
        notes: [
            {
                title: 'Masked Links',
                text: 'Rollouts do not include **masked links**.'
            }
        ]
    },
    pronouns: {
        experimentType: 1,
        rolloutType: 0,
        rate: 1,
        ranges: [[null, null]]
    },
    clyde_dm: {
        experimentType: 1,
        rolloutType: 0,
        rate: 50,
        ranges: [[0, 5000]]
    },
    channel_emojis: {
        experimentType: 1,
        rolloutType: 0,
        rate: 0,
        notes: [
            {
                title: 'Other Ways',
                text: 'Channel Emojis are enabled by default on Tabs v2 on mobile. It also randomly appears on desktop.'
            }
        ]
    },
    media_channels: {
        experimentType: 0,
        rolloutType: 0,
        rate: 25,
        ranges: [[0, 2500]],
        requirements: [
            {
                type: 1,
                value: ['ROLE_SUBSCRIPTIONS_ENABLED'],
                rate: 25,
                ranges: [[0, 2500]]
            }
        ]
    },
    poker_night_update: {
        rolloutType: 2,
        timestamp: 1693603200
    }
};