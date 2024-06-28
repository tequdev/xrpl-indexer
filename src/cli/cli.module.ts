import { Module } from '@nestjs/common';
import { BackfillCommand } from './commands/backfill.command';
import { ConfigModule } from '@nestjs/config';
import { XRPLBackfillModule } from 'src/producers/xrpl-backfill/xrpl-backfill.module';
import { ResetCommand } from './commands/reset.command';
import { StatsCommand } from './commands/stats.command';
import { DataStoreModule } from 'src/dataStore/dataStore.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    XRPLBackfillModule,
    DataStoreModule,
  ],
  providers: [BackfillCommand, StatsCommand, ResetCommand],
})
export class CliModule {
}
