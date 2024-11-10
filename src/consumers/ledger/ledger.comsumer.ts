import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
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
    private readonly configService: ConfigService,
  ) {
    super(configService)
  }

  handler(key: string, value: LedgerConsumerValue): void {
    const handlerResult = this.ledgerIndexer.handler(key, value)
    if (handlerResult === null) return
    const { indexName, key: indexKey, value: indexValue } = handlerResult
    this.dataStoreService.add(indexName, indexKey, indexValue)
  }
}
