import { Module } from '@nestjs/common';
import { LedgerConsumer } from './ledger.comsumer';

@Module({
  providers: [LedgerConsumer],
})
export class LedgerConsumerModule { }
