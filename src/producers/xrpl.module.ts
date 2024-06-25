import { Module } from '@nestjs/common';
import { XRPLProducer } from './xrpl.producers'

@Module({
  providers: [XRPLProducer],
})
export class XRPLProducerModule { }
