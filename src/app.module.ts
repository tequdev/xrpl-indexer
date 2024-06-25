import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TransactionConsumerModule } from './consumers/transaction.module';
import { XRPLProducerModule } from './producers/xrpl.module';
import { LedgerConsumerModule } from './consumers/ledger.module';

@Module({
  imports: [LedgerConsumerModule, TransactionConsumerModule, XRPLProducerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
