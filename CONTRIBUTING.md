# Contributing Guidelines

## `experiment-rollout.js`

### Feature Structure

> **Note:** [Rollout Type](#rollout-types) `2` only requires `rolloutType` (`2`) and `timestamp` fields.

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| `experimentType` | number | [Experiment Type](#experiment-types) of the Feature. | ✅ |
| `rolloutType` | number | [Rollout Type](#rollout-types) of the Feature. | ✅ |
| `rate` | number | Total rate of the Feature | ✅ |
| `ranges` | Array\<Array\<number\>\> | Ranges of the Feature. Can only be optional when rate is `0` or `100`. | ❌ |
| `requirements` | Array\<[Requirement](#requirement-structure)\> | [Requirements](#requirement-structure) of the Feature. | ❌ |
| `priority` | Array<[Priority](#priority-structure)> | [Priority](#priority-structure) data of the rollout of the Feature. | ❌ |
| `timestamp` | number | Timestamp of the rollout of the Feature. Only for [Rollout Type](#rollout-types) `2`. | ❌ |

#### Example Feature

```js
clyde_ai: {
    rate: 12,
    ranges: [[0, 1200]],
    experimentType: 0,
    rolloutType: 0,
    requirements: [
        {
            type: 0,
            value: ['COMMUNITY'],
            rate: 100,
            ranges: [[0, 10000]]
        },
        {
            type: 2,
            value: 100,
            rate: 11,
            ranges: [
                [0, 100],
                [200, 1200]
            ]
        },
        {
            type: 3,
            value: [101, 200],
            rate: 1,
            ranges: [[100, 200]]
        }
    ]
}
```

### Requirement Structure

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| `type` | number | [Type](#requirement-types) of the Requirement. | ✅ |
| `value` | Array\<string\> \| number \| Array\<number\> | Value of the Requirement. | ✅ |
| `rate` | number | Rate of the Requirement. | ✅ |
| `ranges` | Array\<Array\<number \| null\>\> | Ranges of the Requirement. Values of sub-arrays can only be `null` when range is unknown. | ✅ |

#### Example Requirement

```js
{
    type: 1,
    value: ['COMMUNITY'],
    rate: 30,
    ranges: [[3000, 6000]]
}
```

### Priority Structure

| Field | Type | Description | Required |
| --- | --- | --- | --- |
| `status` | number | [Status](#priority-statuses) of the Priority. | ✅ |
| `name` | string | Name of the Priority. | ✅ |

#### Example Priority

```js
{
    status: 2,
    name: 'Discord staff'
}
```

### Experiment Types

| Value | Description |
| --- | --- |
| `0` | Server |
| `1` | User |
| `2` | Server and User |

### Rollout Types

| Value | Description |
| --- | --- |
| `-1` | Rollout has reverted due to security issues |
| `0` | Regular rollout |
| `1` | Very slow rollout from old to new |
| `2` | Birthday activities feature |
| `3` | In beta/alpha testing |

### Requirement Types

| Value | Description |
| --- | --- |
| `0` | Server must NOT have features |
| `1` | Server must have features |
| `2` | Maximum member count |
| `3` | Member count range |

### Priority Statuses

| Value | Description |
| --- | --- |
| `0` | Not started |
| `1` | Rolling out |
| `2` | Rolled out |
