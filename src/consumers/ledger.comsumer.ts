import { Injectable } from '@nestjs/common';
import { DataStoreService } from 'src/dataStore/dataStore.service';
import { KafkaConsumer } from 'src/kafka/kafka.consumer';

@Injectable()
export class LedgerConsumer extends KafkaConsumer {
  readonly consumerGroupName: string;
  readonly consumerTopicName: string;
  constructor(private readonly dataStoreService: DataStoreService) {
    super();
    this.consumerGroupName = 'LedgerConsumer';
    this.consumerTopicName = 'ledger';
  }
  handler(key: string, value: any): void {
    this.logger.warn(value)

    this.dataStoreService.add('ledger', key, value)
    /**
     * Write Consumer-specific logic
     */
  }
}

