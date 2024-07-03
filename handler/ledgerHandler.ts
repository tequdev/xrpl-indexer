import type { LedgerHandler } from 'src/types/indexer'

const handler: LedgerHandler = (ledger_hash, ledger) => {
  return {
    indexName: `ledger-${Math.trunc(ledger.ledger_index / 1_000_000)}m`,
    key: ledger_hash,
    value: ledger,
  }
}

export default handler
