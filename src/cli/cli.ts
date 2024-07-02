import { CommandFactory } from 'nest-commander'
import { CliModule } from 'src/cli/cli.module'

async function bootstrap() {
  await CommandFactory.runWithoutClosing(CliModule, ['error', 'warn', 'debug', 'verbose'])
}
bootstrap()
