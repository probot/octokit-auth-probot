# 🚧 This is work-in-progress, see [#1](https://github.com/probot/octokit-auth-probot/pull/1)

# octokit-auth-probot

> Octokit authentication strategy that supports token, app (JWT), and event-based installation authentication

## Usage

```js
const { Octokit } = require("@octokit/core");
const { createProbotAuth } = require("@probot/octokit-auth-probt");

const ProbotOctokit = Octokit.defaults({
  authStrategy: createProbotAuth,
});
```

### Token authentication

```js
const octokit = new ProbotOctokit({
  auth: {
    token: "secret 123",
  },
});
```

### App authentication

```js
const octokit = new ProbotOctokit({
  auth: {
    appId: 123,
    privateKey: `----BEGIN RSA PRIVATE KEY----- ...`,
  },
});
```

### Get authenticated octokit instance based on event

```js
const eventOctokit = await octokit.auth({
  type: "event-octokit",
  event: { name: "push", payload: { installation: { id: 123 } } }, // event payload
});
```

`eventOctokit` can be authenticate in one of three ways

1. If `octokit` was authenticated using a token, `eventOctokit` is authenticated with the same token
2. If `event` name is `installation` and `payload.action` is either `suspend` or `deleted`, then `eventOctokit` is unauthenticated
3. Otherwise `eventOctokit` is authenticate as installation based on `payload.installation.id`

## LICENSE

[ISC](LICENSE)
