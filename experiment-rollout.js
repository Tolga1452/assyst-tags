const lastUpdate = '1684944273'; //Unix timestamp in seconds

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
        rolloutType: 0
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
                status: 0,
                name: 'Verified bots | Ordered by server count'
            },
            {
                status: 0,
                name: 'Everyone else | Ordered by Nitro/Account creation | Needs Nitro bought before 1st March 2023'
            }
        ],
        notes: [
            {
                title: 'Checking claimed/reserved names',
                text: 'Checking claimed names can be done through Friend requests. This however, is not recommended as it can lead to your account triggering spam/bot detections and thus getting suspended or banned entirely.'
            },
            {
                title: 'Pomelo reservations',
                text: 'Unnamed Discord partners have confirmed that Discord took a snapshot of all usernames and have reserved a bunch of usernames, even for normal users.'
            },
            {
                title: 'Bot name conflicts',
                text: 'If two or more bots have the same name the bot which is in more guilds will get the username. The other ones will get their discriminator appended to their name. I.e. @bot1234.'
            }
        ]
    },
    jamspace: {
        rolloutType: 2,
        timestamp: 1685836800
    },
    color_together: {
        rolloutType: 2,
        timestamp: 1686441600
    },
    voice_messages_server: {
        rate: 100,
        experimentType: 0,
        rolloutType: 0,
        requirements: [
            {
                type: 2,
                value: 200,
                rate: 100,
                ranges: [[0, 10000]]
            }
        ]
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
    }
};

async function experimentRollout(command, id) {
    id = id.toLowerCase();

    if (!id) return `## Usage\n\`-t ${command} <feature_id>\`\n\n## Available Feature Ids\n${Object.keys(data).map(id => `\`${id}\``).join(', ')}\n\n### Last Update\n<t:${lastUpdate}:R>\n\n- Script made by \`✨Tolgchu✨#1452\`: <https://github.com/discordexperimenthub/assyst-tags#experiment-rollout>\n- Our Server: https://discord.gg/vK5sZYdaB6`;
    if (!data[id]) return `:x: This feature id does not exist. Type **\`-t ${command}\`** to see all available feature ids.`;

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

    let description = '';

    if (rolloutType === -1) description = `<:dehAdmin:1102308503479140562> This feature's rollout has reverted due to some security issues. Restart date is unknown.`;
    else if (rolloutType === 1) description = `<:ticket:1100811774229495858> This feature is very slowly rolling out to all ${experimentType === 0 ? 'servers' : experimentType === 1 ? 'users' : 'servers and users'} from old to new ones, this process may take a few months.`;
    else if (rolloutType === 2) description = `🥳 This feature is a part of **Birthday Activities**. Releases/Released ||**<t:${timestamp}:R>**||.`;
    else if (rolloutType === 3) description = `<:DEH:1098207702682980404> This feature is currently in beta/alpha testing.`;
    else if (rolloutType === 0) {
        if (rate === 0) description = `<:DEH:1098207702682980404> This feature has not started to rolling out yet.`;
        else if (rate === 100) description = `🎉 This feature has rolled out to all ${experimentType === 0 ? 'servers' : experimentType === 1 ? 'users' : 'servers and users'}!`;
        else description = `<:dehMiniContributor:1102308508466151494> This feature has rolled out to **${rate}%** of all ${experimentType === 0 ? 'servers' : experimentType === 1 ? 'users' : 'servers and users'} (**~${fixed}**)! Ranges: ${ranges.map(range => `\`${range[0] ?? '?'} - ${range[1] ?? '?'}\``).join(', ')}.`;
    };

    return `# ${id.split('_').map(word => word.replace(word.split('').shift(), word.split('').shift().toUpperCase())).join(' ')}\n${description}${priority?.length > 0 ? `\n\n## Rollout Status\n${priority.map(p => `${p.status === 0 ? '<:unchecked:1078022830828048485>' : p.status === 1 ? '<:dehMiniContributor:1102308508466151494>' : '<:checked:1062424010652123229>'} ${p.name}`).join('\n')}` : ''}${requirements?.length > 0 ? `\n\n## Requirements\n${requirements?.map(requirement => `- ${requirement.type === 0 ? `Server must __not__ have ${requirement.value?.map(feature => `\`${feature}\``).join(', ')} feature(s)` : requirement.type === 1 ? `Server must have ${requirement.value?.map(feature => `\`${feature}\``).join(', ')}` : requirement.type === 2 ? `Server must have maximum ${requirement.value} members` : `Server must have ${requirement.value[0]}-${requirement.value[1]} members`} for **${requirement.rate}%** (${requirement.ranges?.map(range => `\`${range[0]} - ${range[1]}\``).join(', ')})`).join('\n')}` : ''}${notes?.length > 0 ? `\n\n## Notes\n${notes.map(note => `### ${note.title}\n${note.text}`).join('\n\n')}` : ''}\n\n${(Math.floor(Date.now() / 1000) - lastUpdate) > 43200 ? `⚠️ It had been more than 12 hours since the latest update (<t:${lastUpdate}:R>). If this data is not up-to-date, you can create an issue or pull request from our GitHub repository: <https://github.com/discordexperimenthub/assyst-tags>` : `**Last Update: <t:${lastUpdate}:R>**`}`;
};