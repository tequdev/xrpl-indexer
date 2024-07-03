# XRP Ledger Indexer

## Pre-requisites

- Node.js
- pnpm

- Docker
or
- Kafka
- Zookeeper
- Elasticsearch

## Installation

```bash
$ pnpm i
```

## Custom Handlers

See
- handler/transactionHandler.ts
- handler/ledgerHandler.ts

## Custom Configuration

See
- indexer.config.yaml

## Running the app

```bash
# development
docker compose up -d
```

```bash
# development
$ pnpm start

# production
$ pnpm build
$ pnpm start:prod

# backfill
$ pnpm cli backfill -f <ledger_index> -t <ledger_index>

# reset
$ pnpm cli reset -f <ledger_index> -t <ledger_index>

# stats
$ pnpm cli stats
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
