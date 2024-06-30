import { Module } from '@nestjs/common'
import { XRPLService } from '../../xrpl/xrpl.service'
import { XRPLBackfillProducer } from './xrpl-backfill.producers'

@Module({
  providers: [XRPLBackfillProducer, XRPLService],
  exports: [XRPLBackfillProducer],
})
export class XRPLBackfillModule {}
