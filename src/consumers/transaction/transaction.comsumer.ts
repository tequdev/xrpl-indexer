import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DataStoreService } from 'src/dataStore/dataStore.service'
import { TransactionIndexer } from 'src/indexer/transaction/transaction.indexer'
import { KafkaConsumer } from 'src/kafka/kafka.consumer'
import { TransactionConsumerValue } from 'src/types/consumers/transaction'

@Injectable()
export class TransactionConsumer extends KafkaConsumer {
  readonly consumerGroupName = 'TransactionConsumer'
  readonly consumerTopicName = 'transaction'

  constructor(
    private readonly dataStoreService: DataStoreService,
    private readonly transactionIdexer: TransactionIndexer,
    private readonly configService: ConfigService,
  ) {
    super(configService)
  }

  handler(key: string, value: TransactionConsumerValue): void {
    const handlerResult = this.transactionIdexer.handler(key, value)
    if (handlerResult === null) return
    const { indexName, key: indexKey, value: indexValue } = handlerResult
    this.dataStoreService.add(indexName, indexKey, indexValue)
  }
}
