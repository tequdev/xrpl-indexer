import { LedgerConsumerValue } from 'src/types/consumers/ledger'

export default (ledger_hash: string, ledger: LedgerConsumerValue) => {
  return {
    indexName: `ledger-${Math.trunc(ledger.ledger_index / 1_000_000)}m`,
    key: ledger_hash,
    value: ledger,
  }
}
