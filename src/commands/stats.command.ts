import { XRPLBackfillProducer } from 'src/xrpl/xrpl-backfill.producers';
import { ConfigService } from '@nestjs/config';
import { CommandRunner, Command, Option } from 'nest-commander';
import configuration from 'src/config/configuration';
import { Injectable } from '@nestjs/common';
import { DataStoreService } from 'src/dataStore/dataStore.service';

type CommandOptions = {
  from?: number;
  to?: number
};

@Command({
  name: 'stats',
  options: { isDefault: false },
  subCommands: [],
})
export class StatsCommand extends CommandRunner {
  constructor(private readonly dataStoreService: DataStoreService, private readonly config: ConfigService<typeof configuration>) {
    super()
  }

  async run(inputs: string[], options: CommandOptions): Promise<void> {
    console.log('Running Stats command')
    console.log(await this.dataStoreService.statsIndexes())
    process.exit(0)
  }

  // @Option({
  //   flags: '-f, --from <from>',
  //   description: '',
  //   required: true,
  // })
  // parseFrom(val: string) {
  //   const v = parseInt(val);
  //   if (isNaN(v)) throw new Error('`-f / --from` should be a number');
  //   return parseInt(val);
  // }

  // @Option({
  //   flags: '-t, --to <to>',
  //   description: '',
  //   required: true,
  // })
  // parseTo(val: string) {
  //   const v = parseInt(val);
  //   if (isNaN(v)) throw new Error('`-t / --to` should be a number');
  //   return parseInt(val);
  // }
}
