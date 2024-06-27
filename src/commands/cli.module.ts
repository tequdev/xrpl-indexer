import { Module } from '@nestjs/common';
import { BackfillCommand } from './backfill.command';
import { ConfigModule } from '@nestjs/config';
import { XRPLBackfillModule } from 'src/xrpl/xrpl-backfill.module';
import { ResetCommand } from './reset.command';
import { StatsCommand } from './stats.command';
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
