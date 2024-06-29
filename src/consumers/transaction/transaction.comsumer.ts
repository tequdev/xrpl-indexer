import { Injectable } from '@nestjs/common'
import { DataStoreService } from 'src/dataStore/dataStore.service'
import { KafkaConsumer } from 'src/kafka/kafka.consumer'
import { TransactionConsumerValue } from 'src/types/consumers/transaction'

@Injectable()
export class TransactionConsumer extends KafkaConsumer {
  readonly consumerGroupName = 'TransactionConsumer'
  readonly consumerTopicName = 'transaction'

  constructor(private readonly dataStoreService: DataStoreService) {
    super()
  }

  handler(key: string, value: TransactionConsumerValue): void {
    this.logger.log(`${value.ledger_index}: ${key}`)
    const indexName = `transaction-${Math.trunc(value.ledger_index / 1_000_000)}m`
    this.dataStoreService.add(indexName, key, value)
  }
}
