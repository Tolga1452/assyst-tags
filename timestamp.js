function timestamp(tag) {
    let string = message.content.split(`${tag} `)[1]?.toLowerCase() ?? '';
    let [command] = string.split(' ');

    if (!command) return `## Usage\n\`-t ${tag} <command>\`\n\n## Available Commands\n- **\`now\` -** Get current timestamp.\n- **\`create\` -** Create a timestamp.\n\n- Script made by \`✨Tolgchu✨#1452\`: <https://github.com/discordexperimenthub/assyst-tags#experiment-rollout>\n- Our Server: https://discord.gg/experiments`;

    let response = '';

    switch (command) {
        case 'now':
            let milliseconds = Date.now();
            let seconds = Math.floor(milliseconds / 1000);

            response = `## Current Timestamp\n<t:${seconds}:F>\n- **In Seconds:** ${seconds}\n- **In Milliseconds:** ${milliseconds}\n\n## Discord Timestamp Styles\n- **<t:${seconds}:t>:** \`<t:${seconds}:t>\`\n- **<t:${seconds}:T>:** \`<t:${seconds}:T>\`\n- **<t:${seconds}:d>:** \`<t:${seconds}:d>\`\n- **<t:${seconds}:D>:** \`<t:${seconds}:D>\`\n- **<t:${seconds}:f> (Default):** \`<t:${seconds}:f>\` or \`<t:${seconds}>\`\n- **<t:${seconds}:F>:** \`<t:${seconds}:F>\`\n- **<t:${seconds}:R>:** \`<t:${seconds}:R>\``;
            break;

        case 'create':
            let regex = /^\d{4}-\d{2}-\d{2}(?: \d{2}:\d{2}:\d{2})?(?: [+-]\d{2}:\d{2})?$/
            let trydate = string.split(`${command} `)[1];

            if (!trydate || !trydate.match(regex)) return `❌ Please enter a valid date!\n- **Usage:** \`-t ${tag} create <YYYY-MM-DD> [<HH:mm:ss>] [<time_zone>]\`\n**Example:** \`-t ${tag} create 2011-10-10 14:48:00 +09:00\``;

            let [date, time, zone] = date.split(' ');

            let milliseconds2 = Date.now(`${date}${time ? `T${time}${zone ?? ''}` : ''}`);
            let seconds2 = Math.floor(milliseconds / 1000);

            response = `## Created Timestamp\n<t:${seconds2}:F>\n- **In Seconds:** ${seconds2}\n- **In Milliseconds:** ${milliseconds2}\n\n## Discord Timestamp Styles\n- **<t:${seconds2}:t>:** \`<t:${seconds2}:t>\`\n- **<t:${seconds2}:T>:** \`<t:${seconds2}:T>\`\n- **<t:${seconds2}:d>:** \`<t:${seconds2}:d>\`\n- **<t:${seconds2}:D>:** \`<t:${seconds2}:D>\`\n- **<t:${seconds2}:f> (Default):** \`<t:${seconds2}:f>\` or \`<t:${seconds2}>\`\n- **<t:${seconds2}:F>:** \`<t:${seconds2}:F>\`\n- **<t:${seconds2}:R>:** \`<t:${seconds2}:R>\``;
            break;
        default:
            response = `❌ Unknown command! Please use \`-t ${tag}\` to see all available commands.`;
    };

    return response;
};