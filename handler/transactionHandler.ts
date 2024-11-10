import { TransactionHandler } from 'src/types/indexer'

const handler: TransactionHandler = (tx_hash, transaction, logger) => {
  if (transaction.meta.TransactionResult !== 'tesSUCCESS') return null
  return [
    {
      indexName: `transaction-${Math.trunc(transaction.ledger_index / 1_000_000)}m`,
      key: tx_hash,
      value: transaction,
    },
  ]
}

export default handler
