import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Configuration } from 'src/config/configuration'
import { LedgerConsumerValue } from 'src/types/consumers/ledger'
import { BaseIndexer, HandlerResultBase } from '../base.indexer'

@Injectable()
export class LedgerIndexer extends BaseIndexer {
  constructor(config: ConfigService<Configuration>) {
    const ledgerHandlerPath = config.get<string>('LEDGER_HANDLER_PATH')
    if (!ledgerHandlerPath) throw new Error('config: LEDGER_HANDLER_PATH is not set')
    super(ledgerHandlerPath)
  }

  handler(ledger_hash: string, ledger: LedgerConsumerValue) {
    // this.logger.debug(`${ledger.ledger_index}: ${ledger.ledger_time_iso}`)
    return this.loadedHandler<HandlerResultBase>(ledger_hash, ledger, this.logger)
  }
}
