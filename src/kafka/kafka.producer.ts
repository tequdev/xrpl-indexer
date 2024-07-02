import { Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Kafka, Partitioners, Producer } from 'kafkajs'
import { Configuration } from 'src/config/configuration'

/**
 * Base class for KafkaProducer
 */
export abstract class KafkaProducer implements OnModuleInit, OnModuleDestroy {
  /**
   * Class member
   */
  private readonly kafka: Kafka
  public readonly logger: Logger = new Logger()
  private producer: Producer // Store the value when onModuleInit is called

  /**
   * Abstract member
   */
  abstract readonly producerGroupName: string

  /**
   * Constructor
   */
  constructor(private readonly config: ConfigService<Configuration>) {
    this.kafka = new Kafka({
      brokers: this.config.get('KAFKA_BROKER_ENDPOINTS'),
    })
  }

  async onModuleInit() {
    this.logger.log(`starting ${this.producerGroupName} ...`)

    this.producer = this.kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner })

    await this.producer.connect()
    this.listen()

    this.logger.log(`${this.producerGroupName} has started`)
  }

  async onModuleDestroy() {
    this.logger.log(`Disconnecting ${this.producerGroupName} from kafka`)
    await this.producer.disconnect()
  }

  public send(producerTopicName: string, key: string, value: Record<string, any>) {
    this.producer.send({
      topic: producerTopicName,
      messages: [{ key: key, value: JSON.stringify(value) }],
    })
  }

  abstract listen(): void
}
