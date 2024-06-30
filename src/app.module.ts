import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConsumersModule } from './consumers/consumers.module'
import { XRPLSubscribeModule } from './producers/xrpl-subscribe/xrpl-subscribe.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConsumersModule,
    XRPLSubscribeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
