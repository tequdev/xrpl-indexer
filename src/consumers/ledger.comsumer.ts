import { Injectable } from '@nestjs/common';
import { DataStoreService } from 'src/dataStore/dataStore.service';
import { KafkaConsumer } from 'src/kafka/kafka.consumer';
import { LedgerConsumerValue } from 'src/types/consumers/ledger';

@Injectable()
export class LedgerConsumer extends KafkaConsumer {
  readonly consumerGroupName: string;
  readonly consumerTopicName: string;
  constructor(private readonly dataStoreService: DataStoreService) {
    super();
    this.consumerGroupName = 'LedgerConsumer';
    this.consumerTopicName = 'ledger';
  }
  handler(key: string, value: LedgerConsumerValue): void {
    this.logger.log(`${value.ledger_index}: ${value.ledger_time_iso}`)

    this.dataStoreService.add('ledger', key, value)
    /**
     * Write Consumer-specific logic
     */
  }
}

