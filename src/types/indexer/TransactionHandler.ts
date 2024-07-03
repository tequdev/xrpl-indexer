import { TransactionConsumerValue } from 'src/types/consumers/transaction'

export type TransactionHandler = (
  tx_hash: string,
  ledger: TransactionConsumerValue,
) => {
  indexName: string
  key: string
  value: unknown
}
