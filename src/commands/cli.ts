import { CommandFactory } from 'nest-commander';
import { CliModule } from "src/commands/cli.module";

async function bootstrap() {
  await CommandFactory.runWithoutClosing(CliModule, [
    "log", "error", "warn", "debug", "verbose"
  ])
}
bootstrap();
