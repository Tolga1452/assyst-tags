const baseUrl = 'https://discord-experimetns.glitch.me'; //'https://experiments.dscrd.workers.dev';
const warning = 'User experiment rollouts (maybe other fields too) a bit bugged at the moment.'; // Warning message to show when the API is down e.g. "The API is down, please try again later"

function endpoint(path) {
  return `${baseUrl}/${path}`;
};

async function experimentsAPI(command, string) {
    string = string.toLowerCase();

    let argsSlit = string.split(" ");
    let [cmd, ...args] = argsSlit;
    let raw = false;

    function send(data) {
        let two = JSON.stringify(data, 0, 2);
        let one = JSON.stringify(data, 0, 1);
        let none = JSON.stringify(data);
        let limit = 1970;
        
        if (two.length <= limit) return two;
        else if (one.length <= limit) return one;
        else return none.slice(0, limit);
    };

    switch (cmd) {
        case "search":
            if (args[0] === "raw") {
                args.shift()
                raw = true;
            };

            let search = args.join(" ") || "search";
            let experiments = await fetch(endpoint('experiments')).then(res => res.json());

            return `\`\`\`json\n${send(raw ? search === "search" ? experiments : experiments.filter(e => e.id?.includes(search) || e.title?.toLowerCase()?.includes(search)) : (search === "search" ? experiments : experiments.filter(e => e.id.includes(search))).map(e => e.id))}\n\`\`\`(...)`;
        case "get":
            if (!args[0]) return ":x: Enter an experiment id";

            let experiment = await fetch(endpoint(`experiments/${args[0]}`)).then(res => res.json()).catch(() => ":x: This experiment does not exists");
            
            if (typeof experiment === "string") {
                let all = await fetch(endpoint('experiments')).then(res => res.json());
                let found = all.filter(e => e.id.includes(args[0].toLowerCase()))[0];
                
                if (found) return `Experiment id does not exists but found this${args[1] ? ` from **\`${found.id}\`**` : ""}:\n\`\`\`json\n${send(args[1] ? found[args[1]] : found)}\n\`\`\``;
                else return experiment;
            } else {
                if (args[1]) {
                    if (!experiment[args[1]]) return ":x: This field does not exists";
                    return `\`\`\`json\n${send(experiment[args[1]])}\n\`\`\``;
                } else {
                    return `\`\`\`json\n${send(experiment)}\n\`\`\`**Fields:** ${Object.keys(experiment).map(field => `\`${field}\``).join(", ")}`;
                };
            };
        case "check":
            if (!args[0]) return ":x: Enter an experiment id";

            const ids = args[1] === "raw" ? args.slice(2) : args.slice(1);

            if (args[1] === "raw") {
                args[1] = null;
                raw = true;
            };
            if (!args[1] && !args[2]) return ":x: Enter server or user id(s)";

            let results = [];

            for (var id of ids) {
                if (!results[0]?.includes("exists")) {
                    let result = await fetch(endpoint(`experiments/check/${args[0]}/${id}`)).then(res => res.json()).catch(() => `❌ This experiment does not exists`);
                    
                    if (typeof result === "string") results.push(result);
                    else {
                        if (raw) results.push(`**\`${id}:\`**\`\`\`json\n${send(result)}\n\`\`\``);
                        else results.push(`**\`${id}\`:** ${result.valid ? ":white_check_mark:" : ":x:"} ||debug: ${result.debug}||`);
                    };
                };
            };

            return results.map(r => r).join("\n");
        default:
            return `${warning ? `⚠️ **${warning}**\n\n` : ''}**\`<>\`** Required **|** **\`[]\`** Optional\n\n> **\`-t ${command} search [query]\`:** Searches all experiments and returns ids (put \`raw\` before the \`[query]\` for the raw response)\n> **\`-t ${command} get <experimentId> [field]\`:** Returns an experiment data or a single field of the data\n> **\`-t ${command} check <experimentId> <ids>\`:** Checks whether an experiment eligible for the server/user (put \`raw\` before \`<ids>\` for raw response)\n\n**API made by \`syndicated#6591\`:** https://experiments.dscrd.workers.dev\n**Script made by \`✨Tolgchu✨#1452\`:** https://github.com/Tolga1452/assyst-tags#experiments-api\n\nAnd don't forget to join our server: https://discord.gg/SKVAn3QXJF`;
    };
};