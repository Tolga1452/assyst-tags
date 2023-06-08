# Assyst Tags

Advanced tag scripts for [Assyst](https://jacher.io/assyst) bot.

# Tags

- [Experiments API](#experiments-api)
- [Experiment Rollout](#experiment-rollout)
- [Timestamp](#timestamp)

## Experiments API

By @Tolga1452

### Setup

Replace the `tag_name` with the name of the tag you want to create here and send the message:

```
-t create tag_name {js:
{download:https://raw.githubusercontent.com/discordexperimenthub/assyst-tags/main/experiments-api.js}
experimentsAPI('tag_name');
}
```

### Credits

- **[API](https://experiments.dscrd.workers.dev) Creator:** @sndctd
- **External Contributor:** @WilsontheWolf

## Experiment Rollout

By @Tolga1452

- [**Documentation**](https://github.com/discordexperimenthub/assyst-tags/docs/experiment-rollout.md)

### Setup

Replace the `tag_name` with the name of the tag you want to create here and send the message:

```
-t create tag_name {js: 
{download:https://raw.githubusercontent.com/discordexperimenthub/assyst-tags/main/experiment-rollout/index.js} 
experimentRollout('tag_name');
}
```

## Timestamp

By @Tolga1452

### Setup

Replace the `tag_name` with the name of the tag you want to create here and send the message:

```
-t create tag_name {js: 
{download:https://raw.githubusercontent.com/discordexperimenthub/assyst-tags/main/timestamp.js} 
timestamp('tag_name');
}
```
