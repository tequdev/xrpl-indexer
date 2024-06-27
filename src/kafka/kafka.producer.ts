import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

/**
 * Base class for KafkaProducer
 */
export abstract class KafkaProducer implements OnModuleInit, OnModuleDestroy {
  /**
   * Class member
   */
  private readonly kafka: Kafka;
  public readonly logger: Logger = new Logger();
  private producer: Producer; // Store the value when onModuleInit is called

  /**
   * Abstract member
   */
  abstract readonly producerGroupName: string;

  /**
   * Constructor
   */
  constructor() {
    this.kafka = new Kafka({
      brokers: process.env.BROKER_ENDPOINTS?.split(',') ?? [
        'localhost:9093',
      ],
    });
  }

  async onModuleInit() {
    this.logger.log(`starting ${this.producerGroupName} ...`);

    this.producer = this.kafka.producer();

    await this.producer.connect();
    this.listen();

    this.logger.log(`${this.producerGroupName} has started`);

  }

  async onModuleDestroy() {
    this.logger.log(`Disconnecting ${this.producerGroupName} from kafka`);
    await this.producer.disconnect();
  }

  public send(producerTopicName: string, key: string, value: Record<string, any>) {
    this.producer.send({
      topic: producerTopicName,
      messages: [{ key: key, value: JSON.stringify(value) }],
    });
  }

  abstract listen(): void;
}
