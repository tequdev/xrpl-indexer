import { Injectable } from '@nestjs/common'
import { LedgerConsumerValue } from 'src/types/consumers/ledger'
import { BaseIndexer } from '../base.indexer'

@Injectable()
export class LedgerIndexer extends BaseIndexer {
  handler(ledger_hash: string, ledger: LedgerConsumerValue) {
    this.logger.log(`${ledger.ledger_index}: ${ledger.ledger_time_iso}`)
    return {
      indexName: `ledger-${Math.trunc(ledger.ledger_index / 1_000_000)}m`,
      key: ledger_hash,
      value: ledger,
    }
  }
}
