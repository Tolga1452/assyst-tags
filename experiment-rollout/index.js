const lastUpdate = '1683826139'; //Unix timestamp as seconds

async function experimentRollout(command, id) {
    id = id.toLowerCase();

    if (!id) return `## Usage\n\`-t ${command} <feature_id>\`\n\n## Available Feature Ids\n${Object.keys(data).map(id => `\`${id}\``).join(', ')}\n\n### Last Update\n<t:${lastUpdate}:R>`;
    if (!data[id]) return `:x: This feature id does not exist. Type **\`-t ${command}\`** to see all available feature ids.`;

    let { rate, ranges, experimentType, rolloutType, requirements, priority, notes, timestamp } = data[id];
    let totalServers = 6700000;
    let totalUsers = 196200000;
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
    else if (rolloutType === 2) description = `🥳 This feature is a part of **Birthday Activities**. Releases ||**<t:${timestamp}:R>**||.`;
    else if (rolloutType === 3) description = `<:DEH:1098207702682980404> This feature is currently in beta/alpha testing.`;
    else if (rolloutType === 0) {
        if (rate === 0) description = `<:DEH:1098207702682980404> This feature has not started to rolling out yet.`;
        else if (rate === 100) description = `🎉 This feature has rolled out to all ${experimentType === 0 ? 'servers' : experimentType === 1 ? 'users' : 'servers and users'}!`;
        else description = `<:dehMiniContributor:1102308508466151494> This feature has rolled out to **${rate}%** of all ${experimentType === 0 ? 'servers' : experimentType === 1 ? 'users' : 'servers and users'} (**~${fixed}**)! Ranges: ${ranges.map(range => `\`${range[0]} - ${range[1]}\``).join(', ')}.`;
    };

    return `# ${id.split('_').map(word => word.replace(word.split('').shift(), word.split('').shift().toUpperCase())).join(' ')}\n${description}${priority?.length > 0 ? `\n\n## Rollout Status\n${priority.map(p => `${p.status === 0 ? '<:unchecked:1078022830828048485>' : p.status === 1 ? '<:dehMiniContributor:1102308508466151494>' : '<:checked:1062424010652123229>'} ${p.name}`).join('\n')}` : ''}${requirements?.length > 0 ? `\n\n## Requirements\n${requirements.map(requirement => `1. ${requirement.type === 0 ? `Server must have ${requirement.value.map(feature => `\`${feature}\``).join(', ')} feature(s)})` : requirement.type === 1 ? `Server must have maximum ${requirement.value} members` : `Server must have ${requirement.value[0]}-${requirement[1]} members`} for **${requirement.rate}%** (${requirement.ranges.map(range => `\`${range[0]} - ${range[1]}\``).join(', ')})`).join('\n')}` : ''}`;
};