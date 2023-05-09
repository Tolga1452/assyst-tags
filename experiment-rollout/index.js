const lastUpdate = ''; //Unix timestamp as seconds

async function experimentRollout(command, id) {
    id = id.toLowerCase();

    if (!id) return `## Usage\n\`-t ${command} <feature_id>\`\n\n## Available Feature Ids\n${Object.keys(data).map(feature => `\`${feature}\``).join(', ')}\n### Last Update\n<t:${lastUpdate}:R>`;
    if (!data[id]) return `:x: This feature does not exist, type **\`-t ${command}\`** to see all available features.`;
};