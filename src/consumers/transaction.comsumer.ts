import { Injectable } from '@nestjs/common';
import { DataStoreService } from 'src/dataStore/dataStore.service';
import { KafkaConsumer } from 'src/kafka/kafka.consumer';

@Injectable()
export class TransactionConsumer extends KafkaConsumer {
  readonly consumerGroupName: string;
  readonly consumerTopicName: string;
  constructor(private readonly dataStoreService: DataStoreService) {
    super();
    this.consumerGroupName = 'TransactionConsumer';
    this.consumerTopicName = 'transaction';
  }
  handler(key: string, value: any): void {
    this.logger.log(key)

    this.dataStoreService.add('transaction', key, value)
    /**
     * Write Consumer-specific logic
     */
  }
}

