import { Injectable } from '@nestjs/common'
import { LedgerConsumerValue } from 'src/types/consumers/ledger'
import { TransactionConsumerValue } from 'src/types/consumers/transaction'
import { LedgerResponse } from 'src/types/xrpl'
import { Transaction, TransactionMetadata } from 'xrpl'
import { XRPLSubscribeProducer } from '../xrpl-subscribe/xrpl-subscribe.producers'

type Stream =
  | 'consensus'
  | 'ledger'
  | 'manifests'
  | 'peer_status'
  | 'transactions'
  | 'transactions_proposed'
  | 'server'
  | 'validations'

type BackfillOptions = {
  from: number
  to: number
}

@Injectable()
export class XRPLBackfillProducer extends XRPLSubscribeProducer {
  producerGroupName = 'XRPLBackFillProducer'
  streams: Stream[] = ['transactions', 'ledger']

  backfillOptions: BackfillOptions = { from: 0, to: 0 }

  setOptions(options: BackfillOptions) {
    this.backfillOptions = options
  }
  async listen() {}

  async backfill() {
    while (this.backfillOptions.from <= this.backfillOptions.to) {
      this.logger.log(`Backfilling ledger ${this.backfillOptions.from}`)
      const response = (await this.xrplService.client.send({
        command: 'ledger',
        transactions: true,
        expand: true,
        ledger_index: this.backfillOptions.from,
      })) as LedgerResponse
      const transactions = [...response.ledger.transactions]
      const result = this.ledgerHandler(response)

      this.send('ledger', result.key, result.value satisfies LedgerConsumerValue)
      for (const transaction of transactions) {
        const result = this.transactionHandler({
          ...transaction,
          ledger_index: response.ledger_index,
          close_time_iso: response.ledger.close_time_iso,
        })
        // console.log(JSON.stringify(result, null, 2))
        this.send('transaction', result.key, result.value)
      }
      this.backfillOptions.from += 1
    }
    this.logger.log('Backfilling complete')
    process.exit(0)
  }

  transactionHandler(
    data: LedgerResponse['ledger']['transactions'][number] & {
      ledger_index: number
      close_time_iso: string
    },
  ) {
    const meta = { ...data.metaData }
    delete data.metaData
    return {
      key: data.hash,
      value: {
        transaction: this.replaceNativeAmountFields(data) as unknown as Transaction,
        ledger_index: data.ledger_index,
        close_time_iso: data.close_time_iso,
        meta: this.replaceNativeAmountFields(meta) as unknown as TransactionMetadata,
      } satisfies TransactionConsumerValue,
    }
  }

  ledgerHandler(ledger: LedgerResponse) {
    return {
      key: ledger.ledger_hash,
      value: {
        ledger_index: ledger.ledger_index,
        ledger_hash: ledger.ledger_hash,
        txn_count: ledger.ledger.transactions.length,
        ledger_time: ledger.ledger.close_time,
        ledger_time_iso: ledger.ledger.close_time_iso,
      } satisfies LedgerConsumerValue,
    }
  }
}
