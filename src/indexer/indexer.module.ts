import { Module } from '@nestjs/common'
import { LedgerIndexer } from './ledger/ledger.indexer'
import { TransactionIndexer } from './transaction/transaction.indexer'

@Module({
  imports: [],
  providers: [TransactionIndexer, LedgerIndexer],
  exports: [TransactionIndexer, LedgerIndexer],
})
export class IndexerModule {}
