import { Injectable, Logger } from '@nestjs/common'
// use require instead on import
const appRoot = require('app-root-path')

export type HandlerResultBase = {
  indexName: string
  key: string
  value: unknown
}

@Injectable()
export abstract class BaseIndexer {
  public readonly logger: Logger = new Logger()
  public loadedHandler: <Result>(key: string, value: unknown, logger: Logger) => Result | null

  constructor(indexerPath: string) {
    const path = appRoot.resolve(indexerPath)
    this.logger.log(`Loading handler from ${path}`)
    this.loadedHandler = require(path).default
    if (this.loadedHandler === undefined) {
      throw new Error(`Handler not found in ${path} as default export`)
    }
    this.logger.log(`Handler loaded from ${path}`)
  }

  abstract handler(key: string, value: unknown): unknown
}
