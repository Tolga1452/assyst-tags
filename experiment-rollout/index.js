const lastUpdate = ''; //Unix timestamp as seconds

async function experimentRollout(command, id) {
    id = id.toLowerCase();

    if (!id) return `## Usage\n\`-t ${command} <feature_id>\`\n\n## Available Feature Ids\n${Object.keys(data).map(id => `\`${id}\``).join(', ')}\n### Last Update\n\n<t:${lastUpdate}:R>`;
    if (!data[id]) return `:x: This feature id does not exist. Type **\`-t ${command}\`** to see all available feature ids.`;

    let { rate, ranges, experimentType, rolloutType, requirements, priority, notes } = data[id];
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

    let response = '';

    if (rolloutType === -1) response = `<:admin:1105416266623234138> This feature's rollout has reverted due to some security issues. Restart date is unknown.`;
    else if (rolloutType === 2) response = `<:ticket:1105416402782928927> This feature is very slowly rolling out to all ${experimentType === 0 ? 'servers' : experimentType === 1 ? 'users' : 'servers and users'} from old to new ones, this process may take a few months.`;
    else if (rolloutType === 3) response = '';
};