# GitLab Time Tracker

![icon](./icon.png)

## Overview

- GitLab issueと連携した、シンプルなタイムトラッカー
- Google Chromeの拡張機能として提供、ブラウザから即座にアクセス
- タイムトラッキングした実績は GitLab issue にspentできます

## Requirement

- chrome

## Usage

### Install
- [chrome ウェブストア](https://chrome.google.com/webstore/detail/gitlab-time-tracker/gfddnmmplfepiepicoekafghliaojbeb)からインストール
- 拡張機能へアクセスすると、初期設定を求められるので以下を入力してください
  - GitLab Domain
    - 通常は「gitlab.com」。カスタムドメインを利用している場合は、ここを変更ください
  - access token
    - GitLabのアクセストークン
  - project id
    - タイムトラッキング対象のタスクを管理しているプロジェクトのID

### TimeTracking
- 「Tracker」タブでタイムトラッキングを行います
- 計測した実績は「Working　Time」タブに記録されます
- 実績をリセット、またはGitLabに送信する場合は「Spend」ボタンを押下してください

## Features

## Reference

[GitLab TimeTracking](https://docs.gitlab.com/ee/user/project/time_tracking.html)

## Licence

[MIT](https://......)
