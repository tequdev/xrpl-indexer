import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LedgerConsumerModule } from './consumers/ledger/ledger.module'
import { TransactionConsumerModule } from './consumers/transaction/transaction.module'
import { XRPLModule } from './xrpl/xrpl.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LedgerConsumerModule,
    TransactionConsumerModule,
    XRPLModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
