import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Configuration } from 'src/config/configuration'
import { KafkaProducer } from 'src/kafka/kafka.producer'
import { LedgerConsumerValue } from 'src/types/consumers/ledger'
import { TransactionConsumerValue } from 'src/types/consumers/transaction'
import { LedgerStream, TransactionStream } from 'src/types/xrpl'
import { rippleEpochToISO } from 'src/utils/xrpl'
import { Transaction, TransactionMetadata } from 'xrpl'
import { XRPLService } from '../../xrpl/xrpl.service'

type Stream =
  | 'consensus'
  | 'ledger'
  | 'manifests'
  | 'peer_status'
  | 'transactions'
  | 'transactions_proposed'
  | 'server'
  | 'validations'

@Injectable()
export class XRPLSubscribeProducer extends KafkaProducer {
  producerGroupName = 'XRPLProducer'
  streams: Stream[] = ['transactions', 'ledger']

  /**
   * Constructor
   */
  constructor(
    protected xrplService: XRPLService,
    protected configService: ConfigService<Configuration>,
  ) {
    super(configService)
  }

  async listen() {
    this.xrplService.client.send({
      command: 'subscribe',
      streams: this.streams,
    })
    this.xrplService.client.on('transaction', (transaction: TransactionStream) => {
      const result = this.transactionStreamHandler(transaction)
      this.send('transaction', result.key, result.value satisfies TransactionConsumerValue)
    })
    this.xrplService.client.on('ledger', (ledger: LedgerStream) => {
      const result = this.ledgerStreamHandler(ledger)
      this.send('ledger', result.key, result.value satisfies LedgerConsumerValue)
    })
  }

  get amountTypeFields() {
    const amountTypeFields = this.configService.get<string>('amount_type_fields')
    if (!amountTypeFields) throw new Error('Amount type fields are not set')
    return amountTypeFields.split(',')
  }
  get nativeCurrencyCode() {
    const nativeCurrencyCode = this.configService.get<string>('native_currency_code')
    if (!nativeCurrencyCode) throw new Error('Native currency code is not set')
    return nativeCurrencyCode
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  replaceNativeAmountFields(target: Record<string, any>) {
    if (typeof target === 'object') {
      for (const key in target) {
        if (typeof target[key] === 'object') {
          this.replaceNativeAmountFields(target[key])
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

  transactionStreamHandler(data: TransactionStream) {
    return {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      key: data.transaction.hash!,
      value: {
        transaction: this.replaceNativeAmountFields(data.transaction) as unknown as Transaction,
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        ledger_index: data.ledger_index!,
        close_time_iso: data.close_time_iso,
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        meta: this.replaceNativeAmountFields(data.meta!) as unknown as TransactionMetadata,
      } satisfies TransactionConsumerValue,
    }
  }
  ledgerStreamHandler(ledger: LedgerStream) {
    return {
      key: ledger.ledger_hash,
      value: {
        ledger_index: ledger.ledger_index,
        ledger_hash: ledger.ledger_hash,
        txn_count: ledger.txn_count,
        ledger_time: ledger.ledger_time,
        ledger_time_iso: rippleEpochToISO(ledger.ledger_time),
      } satisfies LedgerConsumerValue,
    }
  }
}
