import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Configuration } from 'src/config/configuration'
import { TransactionConsumerValue } from 'src/types/consumers/transaction'
import { BaseIndexer, HandlerResultBase } from '../base.indexer'

@Injectable()
export class TransactionIndexer extends BaseIndexer {
  constructor(config: ConfigService<Configuration>) {
    const transactionHandlerPath = config.get<string>('TRANSACTION_HANDLER_PATH')
    if (!transactionHandlerPath) throw new Error('config: TRANSACTION_HANDLER_PATH is not set')
    super(transactionHandlerPath)
  }

  handler(tx_hash: string, transaction: TransactionConsumerValue) {
    // this.logger.debug(`${transaction.ledger_index}: ${tx_hash}`)
    return this.loadedHandler<HandlerResultBase[]>(tx_hash, transaction, this.logger)
  }
}
