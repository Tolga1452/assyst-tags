const lastUpdate = '1685988000'; //Unix timestamp in seconds

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

async function experimentRollout(command) {
    let string = message.content.split(`${command} `)[1]?.toLowerCase() ?? '';
    let [id, subcommand, index] = string.split(' ');

    if (!id) return `## Usage\n\`-t ${command} <feature_id>\`\n\n## Available Feature Ids\n${Object.keys(data).map(id => `\`${id}\``).join(', ')}\n\n### Last Update\n<t:${lastUpdate}:R>\n\n- Script made by \`✨Tolgchu✨#1452\`: <https://github.com/discordexperimenthub/assyst-tags#experiment-rollout>\n- Our Server: https://discord.gg/vK5sZYdaB6`;
    if (!data[id]) return `❌ This feature id does not exist. Type **\`-t ${command}\`** to see all available feature ids.`;

    let { rate, ranges, experimentType, rolloutType, requirements, priority, notes, timestamp } = data[id];
    let totalServers = 19000000;
    let totalUsers = 150000000;
    let count = ((experimentType === 0 ? totalServers : experimentType === 1 ? totalUsers : totalServers + totalUsers) / 100 * rate).toString().split('').reverse();
    let fixed = [];
    let group = [];
    let timer = 0;

    for (var digit of count) {
        if (timer === 3) {
            fixed.push(group.reverse());

            group = [];
            timer = 0;
        };

        group.push(digit);

        timer++;
    };

    if (group.length > 0) fixed.push(group.reverse());

    fixed = fixed.reverse().map(g => g.map(digit => digit).join('')).join('.');

    function priorityStatus(status) {
        switch (status) {
            case 0:
                return '<:unchecked:1078022830828048485>';
            case 1:
                return '<:dehMiniContributor:1102308508466151494>';
            case 2:
                return '<:checked:1062424010652123229>';
        };
    };

    let title = id.split('_').map(word => word.replace(word.split('').shift(), word.split('').shift().toUpperCase())).join(' ');
    let description = '';

    if (subcommand) {
        switch (subcommand) {
            case 'detailed':
                let priority = priority?.[(index ?? 0) - 1];
                let { name, subPriorities } = priority ?? {};

                if (!index) description = '❌ Please enter a valid index to see details.';
                else if (!priority) description = '❌ This index does not exist.';
                else if (!subPriorities) description = '❌ This index does not have any details.';
                else `# ${title} Detailed Rollout Status\n## ${name} (Index: ${index})\n${subPriorities.map(({ spame, spstatus, spposition }) => `- ${spstatus} **${spame}**${spposition ? `\n  - **Current Position:** ${spposition}` : ''}`).join('\n')}`;
                break;
            default:
                description = '❌ This subcommand does not exist. Available subcommands: \`detailed\`';
        };
    } else {
        switch (rolloutType) {
            case -2:
                description = `<:switch_accounts:1077291371720867850> This feature has been replaced by **\`${replacedBy}\`** feature.`;
                break;
            case -1:
                description = `<:dehAdmin:1102308503479140562> This feature's rollout has reverted due to some security issues. Restart date is unknown.`;
                break;
            case 1:
                description = `<:ticket:1100811774229495858> This feature is very slowly rolling out to all ${experimentType === 0 ? 'servers' : experimentType === 1 ? 'users' : 'servers and users'} from old to new ones, this process may take a few months.`;
                break;
            case 2:
                description = `🥳 This feature is a part of **Birthday Activities**. Releases/Released ||**<t:${timestamp}:R>**||.`;
                break;
            case 3:
                description = `<:DEH:1098207702682980404> This feature is currently in beta/alpha testing.`;
                break;
            default:
                switch (rate) {
                    case 0:
                        description = `<:DEH:1098207702682980404> This feature has not started to rolling out yet.`;
                        break;
                    case 100:
                        description = `🎉 This feature has rolled out to all ${experimentType === 0 ? 'servers' : experimentType === 1 ? 'users' : 'servers and users'}!`;
                        break;
                    default:
                        description = `<:dehMiniContributor:1102308508466151494> This feature has rolled out to **${rate}%** of all ${experimentType === 0 ? 'servers' : experimentType === 1 ? 'users' : 'servers and users'} (**~${fixed}**)! Ranges: ${ranges.map(range => `\`${range[0] ?? '?'} - ${range[1] ?? '?'}\``).join(', ')}.`;
                };
        };

        description = `# ${title}\n${description}${priority?.length > 0 ? `\n\n## Rollout Status\n${priority.map(p => `${priorityStatus(p.status)} ${p.name}`).join('\n')}` : ''}${requirements?.length > 0 ? `\n\n## Requirements\n${requirements?.map(requirement => `- ${requirement.type === 0 ? `Server must __not__ have ${requirement.value?.map(feature => `\`${feature}\``).join(', ')} feature(s)` : requirement.type === 1 ? `Server must have ${requirement.value?.map(feature => `\`${feature}\``).join(', ')}` : requirement.type === 2 ? `Server must have maximum ${requirement.value} members` : `Server must have ${requirement.value[0]}-${requirement.value[1]} members`} for **${requirement.rate}%** (${requirement.ranges?.map(range => `\`${range[0]} - ${range[1]}\``).join(', ')})`).join('\n')}` : ''}${notes?.length > 0 ? `\n\n## Notes\n${notes.map(note => `### ${note.title}\n${note.text}`).join('\n\n')}` : ''}\n\n${(Math.floor(Date.now() / 1000) - lastUpdate) > 43200 ? `⚠️ It had been more than 12 hours since the latest update (<t:${lastUpdate}:R>). If this data is not up-to-date, you can create an issue or pull request from our GitHub repository: <https://github.com/discordexperimenthub/assyst-tags>` : `**Last Update: <t:${lastUpdate}:R>**`}`;
    };

    return description;
};
