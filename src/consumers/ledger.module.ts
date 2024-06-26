import { Module } from '@nestjs/common';
import { LedgerConsumer } from './ledger.comsumer';
import { DataStoreModule } from 'src/dataStore/dataStore.module';

@Module({
  imports: [DataStoreModule],
  providers: [LedgerConsumer],
})
export class LedgerConsumerModule { }
