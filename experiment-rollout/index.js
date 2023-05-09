const lastUpdate = ''; //Unix timestamp as seconds

async function experimentsAPI(command, id) {
    id = id.toLowerCase();

    const data = await fetch('https://raw.githubusercontent.com/Wumpus-Central/assyst-tags/main/experiment-rollout/data.js').then(response => response.json());
    return data
    if (!id) return `:x: This feature does not exist, type **\`-t ${command}\`** to see all available features.`;
};