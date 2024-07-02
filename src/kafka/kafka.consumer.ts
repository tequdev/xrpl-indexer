import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Consumer, Kafka, KafkaMessage } from 'kafkajs'
import { Configuration } from 'src/config/configuration'

/**
 * Base class for KafkaConsumer
 */
export abstract class KafkaConsumer implements OnModuleInit, OnModuleDestroy {
  /**
   * Class member
   */
  private readonly kafka: Kafka
  public readonly logger: Logger = new Logger()
  private consumer: Consumer // Store the value when onModuleInit is called

  /**
   * Abstract member
   */
  abstract readonly consumerGroupName: string
  abstract readonly consumerTopicName: string

  /**
   * Constructor
   */
  constructor(private readonly config: ConfigService<Configuration>) {
    this.kafka = new Kafka({
      brokers: this.config.get('KAFKA_BROKER_ENDPOINTS'),
    })
  }

  async onModuleInit() {
    this.logger.log(`starting ${this.consumerGroupName} ...`)
    this.consumer = this.kafka.consumer({
      groupId: this.consumerGroupName,
      heartbeatInterval: 20000,
      sessionTimeout: 60000,
    })

    await this.consumer.connect()
    await this.consumer.subscribe({
      topics: [this.consumerTopicName],
      fromBeginning: true,
    })
    await this.consumer.run({
      eachMessage: async ({ partition, message }) => {
        this.execute(partition, message)
      },
    })
    this.logger.log(`${this.consumerGroupName} has started`)
  }

  async onModuleDestroy() {
    this.logger.log(`Disconnecting ${this.consumerGroupName} from kafka`)
    await this.consumer.disconnect()
  }

  /**
   * Handler processing
   */
  abstract handler(key: string, value: any): void

  /**
   * Handler pre-processing
   */
  private actionBeforeHandler(): void {
    this.logger.debug(`Start processing ${this.consumerGroupName}`)
    this.logger.debug(`Get messages from ${this.consumerTopicName}`)
  }

  /**
   * Handler post-processing
   */
  private actionAfterHandler(): void {
    this.logger.debug(`End processing ${this.consumerGroupName}`)
  }

  /**
   * Idempotent processing
   */
  private isUniqueProcess(): boolean {
    // TODO: Write application-specific idempotent checks
    return true
  }

  /**
   * Execution process
   */
  private execute(partition: number, message: KafkaMessage): void {
    this.actionBeforeHandler()
    if (this.isUniqueProcess()) {
      this.handler(message.key.toString(), JSON.parse(message.value.toString()))
    } else {
      this.logger.warn(`Duplicate processing of ${this.consumerGroupName}`)
    }
    this.actionAfterHandler()
  }
}
