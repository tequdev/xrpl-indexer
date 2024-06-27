import { Module } from '@nestjs/common';
import { XRPLBackfillProducer } from './xrpl-backfill.producers';
import { XRPLService } from './xrpl.service';

@Module({
  imports: [],
  providers: [XRPLBackfillProducer, XRPLService],
  exports: [XRPLBackfillProducer]
})
export class XRPLBackfillModule { }
