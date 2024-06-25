import { Module } from '@nestjs/common';
import { TransactionConsumer } from './transaction.comsumer';

@Module({
  providers: [TransactionConsumer],
})
export class TransactionConsumerModule { }
