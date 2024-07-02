import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import configuration from './config/configuration'
import { ConsumersModule } from './consumers/consumers.module'
import { XRPLSubscribeModule } from './producers/xrpl-subscribe/xrpl-subscribe.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ConsumersModule,
    XRPLSubscribeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
