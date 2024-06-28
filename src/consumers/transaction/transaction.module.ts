import { Module } from '@nestjs/common'
import { DataStoreModule } from 'src/dataStore/dataStore.module'
import { TransactionConsumer } from './transaction.comsumer'

@Module({
  imports: [DataStoreModule],
  providers: [TransactionConsumer],
})
export class TransactionConsumerModule {}
