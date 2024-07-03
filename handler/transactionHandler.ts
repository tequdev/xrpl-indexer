import { TransactionHandler } from 'src/types/indexer'

const handler: TransactionHandler = (tx_hash, transaction) => {
  return {
    indexName: `transaction-${Math.trunc(transaction.ledger_index / 1_000_000)}m`,
    key: tx_hash,
    value: transaction,
  }
}

export default handler
