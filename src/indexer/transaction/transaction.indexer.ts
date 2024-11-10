import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Configuration } from 'src/config/configuration'
import { TransactionConsumerValue } from 'src/types/consumers/transaction'
import { BaseIndexer, HandlerResultBase } from '../base.indexer'

@Injectable()
export class TransactionIndexer extends BaseIndexer {
  constructor(config: ConfigService<Configuration>) {
    super(config.get('TRANSACTION_HANDLER_PATH'))
  }

  handler(tx_hash: string, transaction: TransactionConsumerValue) {
    // this.logger.debug(`${transaction.ledger_index}: ${tx_hash}`)
    return this.loadedHandler<HandlerResultBase[]>(tx_hash, transaction, this.logger)
  }
}
