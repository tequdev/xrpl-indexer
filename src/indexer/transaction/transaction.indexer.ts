import { Injectable } from '@nestjs/common'
import { TransactionConsumerValue } from 'src/types/consumers/transaction'
import { BaseIndexer } from '../base.indexer'

@Injectable()
export class TransactionIndexer extends BaseIndexer {
  handler(tx_hash: string, transaction: TransactionConsumerValue) {
    this.logger.log(`${transaction.ledger_index}: ${tx_hash}`)
    return {
      indexName: `transaction-${Math.trunc(transaction.ledger_index / 1_000_000)}m`,
      key: tx_hash,
      value: transaction,
    }
  }
}
