const lastUpdate = '1686152806'; //Unix timestamp in seconds

async function experimentRollout(command, override = null) { // `override` IS ONLY FOR DEVELOPMENT
    const data = await fetch(`https://raw.githubusercontent.com/discordexperimenthub/assyst-tags/${override ?? 'main'}/experiment-rollout/data.json`).then(res => res.json());

    let string = message.content.split(`${command} `)[1]?.toLowerCase() ?? '';
    let [id, subcommand] = string.split(' ');

    if (!id) return `## Usage\n\`-t ${command} <feature_id>\`\n\n## Available Feature Ids\n${Object.keys(data).map(id => `\`${id}\``).join(', ')}\n\n### Last Update\n<t:${lastUpdate}:R>\n\n- Script made by \`✨Tolgchu✨#1452\`: <https://github.com/discordexperimenthub/assyst-tags#experiment-rollout>\n- Our Server: https://discord.gg/vK5sZYdaB6`;
    if (!data[id]) return `❌ This feature id does not exist. Type **\`-t ${command}\`** to see all available feature ids.`;

    let { rate, ranges, experimentType, rolloutType, requirements, priority, notes, timestamp, replacedBy, details } = data[id];
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
                if (!details) return '❌ This feature does not have any detailed rollout status.';

                const extra = {
                    pomeloData: await fetch('https://arewepomeloyet.com/api/v1/pomelos').then(res => res.json())
                };

                let output = [];

                for (var detail of details) {
                    let evalOutput;

                    if (detail.description.startsWith('$js:')) evalOutput = await eval(detail.description.split(':')[1].replaceAll('{pomeloData}', JSON.stringify(extra.pomeloData)));

                    output.push(`## ${title}\n${evalOutput ?? detail.description}\n\n### Source\n- **${detail.source.title}:** ${detail.source.link}`);
                };

                description = `# ${title} Detailed Rollout Status\n${output.map(o => o).join('\n\n')}\n\n# ⚠️ WARNING!\nAll of these sources are unofficial! Do not completely trust them!`;
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

        description = `# ${title}\n${description}${priority?.length > 0 ? `\n\n## Rollout Status\n${priority.map(p => `${priorityStatus(p.status)} ${p.name}`).join('\n')}` : ''}${details?.length > 0 ? `\n\n## Detailed Rollout\nThis feature has some detailed rollout status. Type **\`-t ${command} ${id} detailed\`** to see all.` : ''}${requirements?.length > 0 ? `\n\n## Requirements\n${requirements?.map(requirement => `- ${requirement.type === 0 ? `Server must __not__ have ${requirement.value?.map(feature => `\`${feature}\``).join(', ')} feature(s)` : requirement.type === 1 ? `Server must have ${requirement.value?.map(feature => `\`${feature}\``).join(', ')}` : requirement.type === 2 ? `Server must have maximum ${requirement.value} members` : `Server must have ${requirement.value[0]}-${requirement.value[1]} members`} for **${requirement.rate}%** (${requirement.ranges?.map(range => `\`${range[0]} - ${range[1]}\``).join(', ')})`).join('\n')}` : ''}${notes?.length > 0 ? `\n\n## Notes\n${notes.map(note => `### ${note.title}\n${note.text}`).join('\n\n')}` : ''}\n\n${(Math.floor(Date.now() / 1000) - lastUpdate) > 43200 ? `⚠️ It had been more than 12 hours since the latest update (<t:${lastUpdate}:R>). If this data is not up-to-date, you can create an issue or pull request from our GitHub repository: <https://github.com/discordexperimenthub/assyst-tags>` : `**Last Update: <t:${lastUpdate}:R>**`}`;
    };

    return description;
};