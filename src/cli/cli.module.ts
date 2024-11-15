import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from 'src/config/configuration'
import { DataStoreModule } from 'src/dataStore/dataStore.module'
import { XRPLBackfillModule } from 'src/producers/xrpl-backfill/xrpl-backfill.module'
import { BackfillCommand } from './commands/backfill.command'
import { ResetCommand } from './commands/reset.command'
import { StatsCommand } from './commands/stats.command'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    XRPLBackfillModule,
    DataStoreModule,
  ],
  providers: [BackfillCommand, StatsCommand, ResetCommand],
})
export class CliModule {}
