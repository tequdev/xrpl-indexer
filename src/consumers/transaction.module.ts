import { Module } from '@nestjs/common';
import { TransactionConsumer } from './transaction.comsumer';
import { DataStoreModule } from 'src/dataStore/dataStore.module';

@Module({
  imports: [DataStoreModule],
  providers: [TransactionConsumer],
})
export class TransactionConsumerModule { }
