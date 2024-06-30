import { Module } from '@nestjs/common'
import { XRPLService } from './xrpl.service'

@Module({
  providers: [XRPLService],
  exports: [XRPLService],
})
export class XRPLModule {}
