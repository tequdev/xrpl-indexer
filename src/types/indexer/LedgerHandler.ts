import { LedgerConsumerValue } from 'src/types/consumers/ledger'

export type LedgerHandler = (
  ledger_hash: string,
  ledger: LedgerConsumerValue,
) => {
  indexName: string
  key: string
  value: unknown
}
