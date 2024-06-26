import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TransactionConsumerModule } from './consumers/transaction.module';
import { XRPLModule } from './xrpl/xrpl.module';
import { LedgerConsumerModule } from './consumers/ledger.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AppModule, LedgerConsumerModule, TransactionConsumerModule, XRPLModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
