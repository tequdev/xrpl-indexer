import { Injectable } from '@nestjs/common';
import { KafkaMessage } from 'kafkajs';
import { KafkaConsumer } from 'src/kafka/kafka.consumer';

@Injectable()
export class TransactionConsumer extends KafkaConsumer {
  readonly consumerGroupName: string;
  readonly consumerTopicName: string;
  constructor() {
    super();
    this.consumerGroupName = 'TransactionConsumer';
    this.consumerTopicName = 'transaction';
  }
  handler(message: KafkaMessage): void {
    this.logger.warn(message.value)
    /**
     * Write Consumer-specific logic
     */
  }
}

