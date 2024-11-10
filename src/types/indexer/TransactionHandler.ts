import { Logger } from '@nestjs/common'
import { TransactionConsumerValue } from 'src/types/consumers/transaction'

export type TransactionHandler = (
  tx_hash: string,
  transaction: TransactionConsumerValue,
  logger: Logger,
) => {
  indexName: string
  key: string
  value: unknown
} | null
