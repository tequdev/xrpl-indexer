import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export abstract class BaseIndexer {
  public readonly logger: Logger = new Logger()
  abstract handler(
    key: string,
    value: unknown,
  ): {
    indexName: string
    key: string
    value: unknown
  }
}
