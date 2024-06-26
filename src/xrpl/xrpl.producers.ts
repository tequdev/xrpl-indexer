import { Injectable } from '@nestjs/common';
import { KafkaProducer } from 'src/kafka/kafka.producer';
import { XRPLService } from './xrpl.service';
import { ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';

type Stream = 'consensus' | 'ledger' | 'manifests' | 'peer_status' | 'transactions' | 'transactions_proposed' | 'server' | 'validations'

@Injectable()
export class XRPLProducer extends KafkaProducer {
  producerGroupName = 'XRPLProducer';
  private readonly streams: Stream[] = ['transactions', 'ledger'];

  /**
   * Constructor
   */
  constructor(private readonly xrplService: XRPLService, private readonly ConfigService: ConfigService<typeof configuration>) {
    super()
  }

  listen() {
    this.xrplService.client.send({
      command: 'subscribe',
      streams: this.streams
    })
    this.xrplService.client.on('transaction', (transaction) => {
      const result = this.transactionStreamHandler(transaction)
      this.send('transaction', result.key, result.value)
    })
    this.xrplService.client.on('ledger', (ledger) => {
      const result = this.ledgerStreamHandler(ledger)
      this.send('ledger', result.key, result.value)
    })
  }

  get amountTypeFields() {
    return this.ConfigService.get('amount_type_fields').split(',')
  }
  get nativeCurrencyCode() {
    return this.ConfigService.get('native_currency_code')
  }

  replaceNativeAmountFields(target: any) {
    if (typeof target === 'object') {
      for (let key in target) {
        if (typeof target[key] === 'object') {
          this.replaceNativeAmountFields(target[key]);
        } else if (this.amountTypeFields.includes(key)) {
          target[key] = {
            currency: this.nativeCurrencyCode,
            value: target[key],
          }
        }
      }
    }
    return target
  }

  transactionStreamHandler(data: any): Record<string, any> {
    return {
      key: data.transaction.hash,
      value: {
        ...this.replaceNativeAmountFields(data.transaction),
        ledger_index: data.ledger_index,
        close_time_iso: data.close_time_iso,
        meta: this.replaceNativeAmountFields(data.meta),
      }
    }
  }
  ledgerStreamHandler(ledger: any): Record<string, any> {
    return {
      key: ledger.ledger_index,
      value: {
        ...ledger
      }
    }
  }
}
