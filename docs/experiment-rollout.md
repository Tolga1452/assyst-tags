# [`experiment-rollout.js`](https://github.com/discordexperimenthub/assyst-tags#experiment-rollout)

## Last Update Timestamp

The `lastUpdate` value of the `experiment-rollout/index.js` file have to be updated **EVERY TIME** at least one feature data is updated. The value should be UNIX timestamp in milliseconds.

## Feature Structure

> **Note:**
>
> - [Rollout Type](#rollout-types) `-2` only requires `rolloutType` (`-2`) and `replacedBy` fields.
> - [Rollout Type](#rollout-types) `2` only requires `rolloutType` (`2`) and `timestamp` fields.

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| `experimentType` | number | [Experiment Type](#experiment-types) of the Feature. | ✅ |
| `rolloutType` | number | [Rollout Type](#rollout-types) of the Feature. | ✅ |
| `rate` | number | Total rate of the Feature | ✅ |
| `ranges` | Array\<Array\<number\>\> | Ranges of the Feature. Can only be optional when rate is `0` or `100`. | ❌ |
| `requirements` | Array\<[Requirement](#requirement-structure)\> | [Requirements](#requirement-structure) of the Feature. | ❌ |
| `priority` | Array<[Priority](#priority-structure)> | [Priority](#priority-structure) data of the rollout of the Feature. | ❌ |
| `timestamp` | number | Timestamp of the rollout of the Feature. Only for [Rollout Type](#rollout-types) `2`. | ❌ |
| `replacedBy` | string | Id of the Feature that replaced this Feature. Only for [Rollout Type](#rollout-types) `-2`. | ❌ |
| `details` | Array<[Detail](#detail-structure)> | [Detailed](#detail-structure) rollout status of the Feature. | ❌ |

### Example Feature

```json
"channel_summaries": {
    "experimentType": 0,
    "rolloutType": 3
}
```

## Requirement Structure

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| `type` | number | [Type](#requirement-types) of the Requirement. | ✅ |
| `value` | Array\<string\> \| number \| Array\<number\> | Value of the Requirement. | ✅ |
| `rate` | number | Rate of the Requirement. | ✅ |
| `ranges` | Array\<Array\<number \| null\>\> | Ranges of the Requirement. Values of sub-arrays can only be `null` when range is unknown. | ✅ |

### Example Requirement

```js
{
    "type": 1,
    "value": ["COMMUNITY"],
    "rate": 30,
    "ranges": [[3000, 6000]]
}
```

## Priority Structure

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| `status` | number | [Status](#priority-statuses) of the Priority. | ✅ |
| `name` | string | Name of the Priority. | ✅ |

### Example Priority

```json
{
    "status": 2,
    "name": "Discord staff"
}
```

## Detail Structure

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| `title` | string | Title of the Detail. | ✅ |
| `description` | string | Description (the full text) of the Detail. | ✅ |
| `source` | [Source](#source-structure) | [Source](#source-structure) of the Detail. | ✅ |

### Example Detail

```json
{
    "title": "Status",
    "description": "**Nitro Users:** September 2017\n**Non-Nitro Users:** February 2016",
    "source": {
        "title": "Discord Experiment Hub (Community)",
        "link": "https://discord.gg/experiments"
    }
}
```

## Source Structure

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| `title` | string | Title of the Source. | ✅ |
| `link` | string | Link of the Source. | ✅ |

### Example Source

```json
{
    "title": "Discord Experiment Hub (Community)",
    "link": "https://discord.gg/experiments"
}
```

## Experiment Types

| Value | Description |
| --- | --- |
| `0` | Server |
| `1` | User |
| `2` | Server and User |

## Rollout Types

| Value | Description |
| --- | --- |
| `-2` | Replaced by another feature |
| `-1` | Rollout has reverted due to security issues |
| `0` | Regular rollout |
| `1` | Very slow rollout from old to new |
| `2` | Birthday activities feature |
| `3` | In beta/alpha testing |

## Requirement Types

| Value | Description |
| --- | --- |
| `0` | Server must NOT have features |
| `1` | Server must have features |
| `2` | Maximum member count |
| `3` | Member count range |

## Priority Statuses

| Value | Description |
| --- | --- |
| `0` | Not started |
| `1` | Rolling out |
| `2` | Rolled out |
