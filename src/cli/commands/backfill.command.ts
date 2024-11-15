import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Command, CommandRunner, Option } from 'nest-commander'
import { Configuration } from 'src/config/configuration'
import { XRPLBackfillProducer } from 'src/producers/xrpl-backfill/xrpl-backfill.producers'

type CommandOptions = {
  from: number
  to: number
}

@Command({
  name: 'backfill',
  options: { isDefault: false },
  subCommands: [],
})
export class BackfillCommand extends CommandRunner {
  public readonly logger: Logger = new Logger()
  constructor(
    private readonly xrplBackfillProducer: XRPLBackfillProducer,
    private readonly config: ConfigService<Configuration>,
  ) {
    super()
  }

  async run(inputs: string[], options: CommandOptions): Promise<void> {
    this.logger.log('Running BackfillCommand')
    this.logger.log(`from: ${options.from}, to: ${options.to}`)
    this.xrplBackfillProducer.setOptions({ from: options.from, to: options.to })
    await this.xrplBackfillProducer.backfill()
  }

  @Option({
    flags: '-f, --from <from>',
    description: '',
    required: true,
  })
  parseFrom(val: string) {
    const v = parseInt(val)
    if (isNaN(v)) throw new Error('`-f / --from` should be a number')
    return parseInt(val)
  }

  @Option({
    flags: '-t, --to <to>',
    description: '',
    required: true,
  })
  parseTo(val: string) {
    const v = parseInt(val)
    if (isNaN(v)) throw new Error('`-t / --to` should be a number')
    return parseInt(val)
  }

  @Option({
    flags: '-t, --backfill-type <backfill-type>',
    description: '',
    choices: ['transaction', 'ledger'],
  })
  parseBackfillType(val: string) {}
}
