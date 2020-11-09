# slack-app-for-github

## Features

- Search GitHub issues from Slash Command (like [Tettra](https://tettra.com/))

## How to develop

- Create Slack app & get secrets

- Create Personal access tokens in github
  - Grants access to repo
  
- TODO

- Call slash command `/find-issue hoge`

## envs

```
firebase functions:config:set slack.signing_secret=hogehoge
firebase functions:config:set slack.bot_token=xoxb-hogehoge

firebase functions:config:set github.org=hogehoge
firebase functions:config:set github.access_token=hogehoge
```
