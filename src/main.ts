import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: [
      'error',
      'warn',
      'log',
      ...(process.env.NODE_ENV !== 'production' ? (['debug'] as const) : []),
    ],
  })
  await app.listen(3000)
}
bootstrap()
