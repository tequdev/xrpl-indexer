import { Module } from '@nestjs/common'
import { DataStoreModule } from 'src/dataStore/dataStore.module'
import { IndexerModule } from 'src/indexer/indexer.module'
import { LedgerConsumer } from './ledger/ledger.comsumer'
import { TransactionConsumer } from './transaction/transaction.comsumer'

@Module({
  imports: [DataStoreModule, IndexerModule],
  providers: [TransactionConsumer, LedgerConsumer],
})
export class ConsumersModule {}
