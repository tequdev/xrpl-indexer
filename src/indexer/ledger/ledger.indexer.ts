import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Configuration } from 'src/config/configuration'
import { LedgerConsumerValue } from 'src/types/consumers/ledger'
import { BaseIndexer } from '../base.indexer'

@Injectable()
export class LedgerIndexer extends BaseIndexer {
  constructor(config: ConfigService<Configuration>) {
    super(config.get('LEDGER_HANDLER_PATH'))
  }

  handler(ledger_hash: string, ledger: LedgerConsumerValue) {
    // this.logger.debug(`${ledger.ledger_index}: ${ledger.ledger_time_iso}`)
    return this.loadedHandler(ledger_hash, ledger, this.logger)
  }
}
