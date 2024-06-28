import { Module } from '@nestjs/common'
import { DataStoreModule } from 'src/dataStore/dataStore.module'
import { LedgerConsumer } from './ledger.comsumer'

@Module({
  imports: [DataStoreModule],
  providers: [LedgerConsumer],
})
export class LedgerConsumerModule {}
