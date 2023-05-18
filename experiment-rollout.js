const lastUpdate = { //This object will be updated when the data object is updated
    timestamp: 1684437968, //Unix timestamp as seconds
    details: '`markdown` rollout has updated and renamed to `markdown_server`.'
};

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
  * 0: Server must NOT have features
  * 1: Server must have features
  * 2: Maximum member count
  * 3: Member count range
  * 
  * Priority Types
  * 0: Not started
  * 1: Rolling out
  * 2: Rolled out
  */
const data = {
    clyde_ai: {
        id: '2023-03_clyde_ai',
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
                rate: 10,
                ranges: [[0, 1000]]
            }
        ]
    },
    split_permissions: {
        id: '2023-03_split_permissions',
        rate: 1,
        ranges: [[0, 100]],
        experimentType: 0,
        rolloutType: 0
    },
    channel_summaries: {
        id: '2023-02_p13n_summarization',
        experimentType: 0,
        rolloutType: 3
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
                status: 2,
                name: 'Brands'
            },
            {
                status: 1,
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
        rolloutType: 2,
        timestamp: 1685836800
    },
    color_together: {
        rolloutType: 2,
        timestamp: 1686441600
    },
    voice_messages_server: {
        id: '2023-01_voice_messages',
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
        id: '2023-02_onboarding_home_admin',
        rate: 50,
        ranges: [[5000, 10000]],
        experimentType: 0,
        rolloutType: 0
    },
    putt_party_paradise: {
        rolloutType: 2,
        timestamp: 1684713600
    },
    birthday_activities: {
        rate: 100,
        rolloutType: 0,
        experimentType: 1,
    },
    birthday_avatar_decorations: {
        rolloutType: 2,
        timestamp: 1684108800
    },
    free_activities: {
        rolloutType: 2,
        timestamp: 1684108800
    },
    activities_in_dms: {
        id: '2023-01_activities_in_gdm',
        rate: 100,
        rolloutType: 0,
        experimentType: 1,
    },
    nitro_trials: {
        rolloutType: 2,
        timestamp: 1684108800
    },
    markdown_server: {
        id: '2023-03_improved_message_markdown_guild',
        rate: 50,
        ranges: [[5000, 10000]],
        experimentType: 0,
        rolloutType: 0,
        notes: [
            {
                title: 'Masked Links',
                text: 'Current rollout does not include **masked links**.'
            }
        ]
    },
    pronouns: {
        id: '2022-01_pronouns',
        experimentType: 1,
        rolloutType: 0,
        rate: 1,
        ranges: [[null, null]]
    }
};

async function experimentRollout(command, featureId) {
    featureId = featureId.toLowerCase();

    if (!featureId) return `## Usage\n\`-t ${command} <feature_id>\`\nOr you can use an experiment id.\n\n## Available Feature Ids\n${Object.keys(data).map(id => `\`${id}\``).join(', ')}\n\n## Last Update\n> ${lastUpdate.details}\non <t:${lastUpdate.timestamp}:R>\n\n- Script made by \`✨Tolgchu✨#1452\`: <https://github.com/discordexperimenthub/assyst-tags#experiment-rollout>\n- Our Server: https://discord.gg/vK5sZYdaB6`;

    let experiment = Object.entries(data).find(([fId, eId]) => fId === featureId || eId === featureId)?.[1] ?? null;

    if (!experiment) return `:x: This feature id does not exist. Type **\`-t ${command}\`** to see all available feature ids.`;

    let { rate, ranges, experimentType, rolloutType, requirements, priority, notes, timestamp, id } = experiment;
    let totalServers = 19000000;
    let totalUsers = 15000000;
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

    return `# ${id.split('_').map(word => word.replace(word.split('').shift(), word.split('').shift().toUpperCase())).join(' ')}\n${description}${priority?.length > 0 ? `\n\n## Rollout Status\n${priority.map(p => `${p.status === 0 ? '<:unchecked:1078022830828048485>' : p.status === 1 ? '<:dehMiniContributor:1102308508466151494>' : '<:checked:1062424010652123229>'} ${p.name}`).join('\n')}` : ''}${requirements?.length > 0 ? `\n\n## Requirements\n${requirements?.map(requirement => `- ${requirement.type === 0 ? `Server must __not__ have ${requirement.value?.map(feature => `\`${feature}\``).join(', ')} feature(s)` : requirement.type === 1 ? `Server must have ${requirement.value?.map(feature => `\`${feature}\``).join(', ')}` : requirement.type === 2 ? `Server must have maximum ${requirement.value} members` : `Server must have ${requirement.value[0]}-${requirement.value[1]} members`} for **${requirement.rate}%** (${requirement.ranges?.map(range => `\`${range[0]} - ${range[1]}\``).join(', ')})`).join('\n')}` : ''}${notes?.length > 0 ? `\n\n## Notes\n${notes.map(note => `### ${note.title}\n${note.text}`).join('\n\n')}` : ''}\n\n${(Math.floor(Date.now() / 1000) - lastUpdate.timestamp) > 86400 ? `⚠️ It had been over 24 hours since the latest update (<t:${lastUpdate.timestamp}:R>)! Data of the experiment may be not up-to-date. You can create a pull request or issue from our GitHub repository.` : `**Last Update: <t:${lastUpdate.timestamp}:R>**`}`;
};