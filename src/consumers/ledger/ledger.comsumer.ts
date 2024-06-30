import { Injectable } from '@nestjs/common'
import { DataStoreService } from 'src/dataStore/dataStore.service'
import { LedgerIndexer } from 'src/indexer/ledger/ledger.indexer'
import { KafkaConsumer } from 'src/kafka/kafka.consumer'
import { LedgerConsumerValue } from 'src/types/consumers/ledger'

@Injectable()
export class LedgerConsumer extends KafkaConsumer {
  readonly consumerGroupName = 'LedgerConsumer'
  readonly consumerTopicName = 'ledger'

  constructor(
    private readonly dataStoreService: DataStoreService,
    private readonly ledgerIndexer: LedgerIndexer,
  ) {
    super()
  }

  handler(key: string, value: LedgerConsumerValue): void {
    const { indexName, key: indexKey, value: indexValue } = this.ledgerIndexer.handler(key, value)
    this.dataStoreService.add(indexName, indexKey, indexValue)
  }
}
