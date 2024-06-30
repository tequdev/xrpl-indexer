import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { XRPLModule } from 'src/xrpl/xrpl.module'
import { XRPLSubscribeProducer } from './xrpl-subscribe.producers'

@Module({
  imports: [XRPLModule, ConfigModule],
  providers: [XRPLSubscribeProducer],
  exports: [XRPLSubscribeProducer],
})
export class XRPLSubscribeModule {}
