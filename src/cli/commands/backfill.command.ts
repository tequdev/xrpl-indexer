import { XRPLBackfillProducer } from 'src/producers/xrpl-backfill/xrpl-backfill.producers';
import { ConfigService } from '@nestjs/config';
import { CommandRunner, Command, Option } from 'nest-commander';
import configuration from 'src/config/configuration';

type CommandOptions = {
  from?: number;
  to?: number
};

@Command({
  name: 'backfill',
  options: { isDefault: false },
  subCommands: [],
})
export class BackfillCommand extends CommandRunner {
  constructor(private readonly xrplBackfillProducer: XRPLBackfillProducer, private readonly config: ConfigService<typeof configuration>) {
    super()
  }

  async run(inputs: string[], options: CommandOptions): Promise<void> {
    console.log('Running BackfillCommand')
    console.log('Options:', options)
    this.xrplBackfillProducer.setOptions({ from: options.from, to: options.to })
    await this.xrplBackfillProducer.backfill()
  }

  @Option({
    flags: '-f, --from <from>',
    description: '',
    required: true,
  })
  parseFrom(val: string) {
    const v = parseInt(val);
    if (isNaN(v)) throw new Error('`-f / --from` should be a number');
    return parseInt(val);
  }

  @Option({
    flags: '-t, --to <to>',
    description: '',
    required: true,
  })
  parseTo(val: string) {
    const v = parseInt(val);
    if (isNaN(v)) throw new Error('`-t / --to` should be a number');
    return parseInt(val);
  }

  @Option({
    flags: '-t, --backfill-type <backfill-type>',
    description: '',
    choices: ['transaction', 'ledger'],
  })
  parseBackfillType(val: string) { }
}
