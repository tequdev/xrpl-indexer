import { Module } from '@nestjs/common';
import { XRPLProducer } from 'src/producers/xrpl-subscribe/xrpl-subscribe.producers'
import { XRPLService } from './xrpl.service';

@Module({
  providers: [XRPLProducer, XRPLService],
})
export class XRPLModule { }
