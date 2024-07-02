import { TransactionConsumerValue } from 'src/types/consumers/transaction'

export default (tx_hash: string, transaction: TransactionConsumerValue) => {
  return {
    indexName: `transaction-${Math.trunc(transaction.ledger_index / 1_000_000)}m`,
    key: tx_hash,
    value: transaction,
  }
}
