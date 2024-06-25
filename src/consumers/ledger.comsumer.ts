import { Injectable } from '@nestjs/common';
import { KafkaMessage } from 'kafkajs';
import { KafkaConsumer } from 'src/kafka/kafka.consumer';

@Injectable()
export class LedgerConsumer extends KafkaConsumer {
  readonly consumerGroupName: string;
  readonly consumerTopicName: string;
  constructor() {
    super();
    this.consumerGroupName = 'LedgerConsumer';
    this.consumerTopicName = 'ledger';
  }
  handler(message: KafkaMessage): void {
    this.logger.warn(message.value)
    /**
     * Write Consumer-specific logic
     */
  }
}

