const lastUpdate = '1686995821'; //Unix timestamp in seconds

async function experimentRollout(command, override = null) { // `override` IS ONLY FOR DEVELOPMENT
    const data = await fetch(`https://raw.githubusercontent.com/discordexperimenthub/assyst-tags/${(override && override !== '') ?? 'main'}/experiment-rollout/data.json`).then(res => res.json());

    let string = message.content.split(`${command} `)[1]?.toLowerCase() ?? '';
    let [id, subcommand, index] = string.split(' ');

    if (!id) return `## Usage\n\`-t ${command} <feature_id>\`\n\n## Available Feature Ids\n${Object.keys(data).map(id => `\`${id}\``).join(', ')}\n\n### Last Update\n<t:${lastUpdate}:R>\n### Contact & Support\n- **Script made by @tolgchu:** <https://github.com/discordexperimenthub/assyst-tags#experiment-rollout>\n- **Our Server:** https://discord.gg/experiments`;
    if (!data[id]) return `❌ This feature id does not exist. Type **\`-t ${command}\`** to see all available feature ids.`;

    let { rate, ranges, experimentType, rolloutType, requirements, priority, notes, timestamp, replacedBy, details } = data[id];
    let totalServers = 19000000;
    let totalUsers = 150000000;
    let count = ((experimentType === 0 ? totalServers : experimentType === 1 ? totalUsers : totalServers + totalUsers) / 100 * rate);

    function fixNumber(n) {
        n = n.toString().split('').reverse();

        let fixedNumber = [];
        let group = [];
        let timer = 0;

        for (var digit of n) {
            if (timer === 3) {
                fixedNumber.push(group.reverse());

                group = [];
                timer = 0;
            };

            group.push(digit);

            timer++;
        };

        if (group.length > 0) fixedNumber.push(group.reverse());

        return fixedNumber.reverse().map(g => g.map(digit => digit).join('')).join('.');
    };

    let fixed = fixNumber(count);

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

    function fixString(t) {
        return t.split('_').map(word => word.replace(word.split('').shift(), word.split('').shift().toUpperCase())).join(' ');
    };

    let title = fixString(id);
    let description = '';

    if (subcommand) {
        switch (subcommand) {
            case 'detailed':
                if (!details) return '❌ This feature does not have any detailed rollout status.';

                const scripts = {
                    pomelo: async () => {
                        const pomelo = await fetch('https://arewepomeloyet.com/api/v1/pomelos').then(res => res.json());

                        let latest = pomelo.stats.pop();

                        return `**Total:** ${fixNumber(pomelo.total)} users got access\n\n**Latest Stage:** ${latest.date}\n**Total of Stage:** ${latest.totalCount} users got access\n**Nitro Users of Stage:** ${latest.nitroCount}\n**Early Supporters of Stage:** ${latest.earlySupporterCount}\n**Non-Nitro Users of Stage:** ${latest.nonNitroCount}\n\n**Last Pomelo:** <t:${Math.floor(pomelo.lastPomeloAt / 1000)}:R>\n**Last Update:** <t:${Math.floor(pomelo.lastUpdatedAt / 1000)}:R>`;
                    },
                    pomelo2: async () => {
                        const baseUrl = 'https://discordrollout.nekos.sh/api';
                        const alerts = (await fetch(`${baseUrl}/alerts/full`).then(res => res.json())).alerts;
                        const timeline = await fetch(`${baseUrl}/data/timeline/latest`).then(res => res.json());
                        const status = await fetch(`${baseUrl}/data/status`).then(res => res.json());

                        let updateData = {
                            started: undefined,
                            timestamp: undefined,
                            wave: undefined,
                            rollout: undefined
                        };
                        let update = timeline.updates.find(u => !u.rollouts.find(r => !Object.values(r)[0].toLowerCase().includes('should begin')));

                        if (update) {
                            updateData.started = true;
                            updateData.wave = update.wave;

                            let currentRollout = Object.entries(update.rollouts.reverse().find(r => !Object.values(r)[0].toLowerCase().includes('should begin')));

                            updateData.rollout = currentRollout[1];
                            updateData.timestamp = currentRollout[0];
                        } else {
                            updateData.started = false;
                            updateData.wave = 0;

                            let currentRollout = Object.entries(timeline.updates[0].rollouts[0]);

                            updateData.rollout = currentRollout[1];
                            updateData.timestamp = currentRollout[0];
                        };

                        return `${alerts.map(alert => `> **${alert.type}:** ${alert.text}`).join('\n\n')}\n\n**Day:** ${timeline.day} - ${fixString(timeline.type)} (${updateData.wave ? 'Started' : `Expected to start`} <t:${updateData.timestamp}:R>)\n- **Wave:** ${updateData.wave ? `#${updateData.wave}` : 'None'}${timeline.updates.length !== updateData.wave ? ` (Wave #${updateData.wave + 1} expected to start <t:${Object.keys(timeline.updates.find(u => u.wave === updateData.wave + 1).rollouts[0])[0]}):R>` : ''}${updateData.started ? `\n- **Status:** ${updateData.rollout}` : ''}\n**Current Stage of Nitro Users:** ${status.confirmed.nitro.toLowerCase().includes('completed') ? 'Completed' : status.confirmed.nitro}\n- **Current Stage of Non-Nitro Users:** ${status.confirmed.nonnitro.toLowerCase().includes('completed') ? 'Completed' : status.confirmed.nonnitro}`;
                    }
                };

                let output = [];

                for (var detail of details) {
                    let evalOutput;

                    if (detail.description.startsWith('$js:')) evalOutput = await scripts[detail.description.split(':')[1]]();

                    output.push(`## ${detail.title}\n${evalOutput ?? detail.description}\n\n### Source\n- **${detail.source.title}:** <${detail.source.link}>`);
                };

                let detailPerPage = 2;
                let pages = [];
                let newOutput = null;
                let limit = Math.ceil(output.length / detailPerPage);

                for (let i = 0; i < limit; i++) {
                    newOutput = output.splice(0, detailPerPage);
                    pages.push(newOutput);
                };

                if (!index || index <= 0 || index > pages.length) index = 1;

                let pageContent = pages[index - 1]?.map(o => o).join('\n\n') ?? '';

                description = `# ${title} Detailed Rollout Status\n${pageContent}\n\n**Page ${index} of ${pages.length} | \`-t ${command} ${id} detailed <index>\`**\n\n# ⚠️ WARNING!\nAll of these sources are unofficial! Do not completely trust them!`;
                break;
            default:
                description = '❌ This subcommand does not exist. Available subcommands: \`detailed\`';
        };
    } else {
        description = `***We have temporary disabled the tag only for \`-t ${command} pomelo detailed\` untill end of Pomelo rollout because otherwise it passes Assyst's limit.***`;
    };

    return `${description}\n\n${(Math.floor(Date.now() / 1000) - lastUpdate) > 43200 ? `⚠️ It had been more than 12 hours since the latest update (<t:${lastUpdate}:R>). If this data is not up-to-date, you can create an issue or pull request from our GitHub repository: <https://github.com/discordexperimenthub/assyst-tags>` : `**Last Update: <t:${lastUpdate}:R>**`}`;
};