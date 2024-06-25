import { Injectable } from '@nestjs/common';
import { KafkaProducer } from 'src/kafka/kafka.producer';
import { XrplClient } from 'xrpl-client';

type Stream = 'consensus' | 'ledger' | 'manifests' | 'peer_status' | 'transactions' | 'transactions_proposed' | 'server' | 'validations'

@Injectable()
export class XRPLProducer extends KafkaProducer {
  producerGroupName = 'XRPLProducer';
  private readonly client: XrplClient;
  private readonly streams: Stream[] = ['transactions', 'ledger'];

  /**
   * Constructor
   */
  constructor() {
    super()
    this.client = new XrplClient('wss://xrpl.ws')
  }

  listen() {
    this.client.send({
      command: 'subscribe',
      streams: this.streams
    })
    this.client.on('transaction', (transaction) => {
      const value = this.transactionStreamHandler(transaction)
      this.send('transaction', value)
    })
    this.client.on('ledger', (ledger) => {
      const value = this.ledgerStreamHandler(ledger)
      this.send('ledger', value)
    })
  }

  transactionStreamHandler(transaction: any): Record<string, any> {
    return transaction
  }
  ledgerStreamHandler(ledger: any): Record<string, any> {
    return ledger
  }
}
