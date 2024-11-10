import { TransactionConsumerValue } from 'src/types/consumers/transaction'

export type TransactionHandler = (
  tx_hash: string,
  transaction: TransactionConsumerValue,
) => {
  indexName: string
  key: string
  value: unknown
}
