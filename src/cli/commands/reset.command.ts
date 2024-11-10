import { ConfigService } from '@nestjs/config'
import { Command, CommandRunner, Option } from 'nest-commander'
import { Configuration } from 'src/config/configuration'
import { DataStoreService } from 'src/dataStore/dataStore.service'

type CommandOptions = {
  from: number
  to: number
}

@Command({
  name: 'reset',
  options: { isDefault: false },
  subCommands: [],
})
export class ResetCommand extends CommandRunner {
  constructor(
    private readonly dataStoreService: DataStoreService,
    private readonly config: ConfigService<Configuration>,
  ) {
    super()
  }

  async run(inputs: string[], options: CommandOptions): Promise<void> {
    console.log('Running Reset command')
    await this.dataStoreService.deleteAllIndicesFromRange(options.from, options.to)
    process.exit(0)
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
}
