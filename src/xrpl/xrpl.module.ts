import { Module } from '@nestjs/common';
import { XRPLProducer } from './xrpl.producers'
import { XRPLService } from './xrpl.service';

@Module({
  providers: [XRPLProducer, XRPLService],
})
export class XRPLModule { }
