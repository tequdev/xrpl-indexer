import { TransactionMetadata } from 'xrpl'

export interface TransactionConsumerValue {
  ledger_index: number
  close_time_iso: string
  meta: TransactionMetadata
}
