import { Logger } from '@nestjs/common'
import { TransactionConsumerValue } from 'src/types/consumers/transaction'

export type TransactionHandler<T = unknown> = (
  tx_hash: string,
  transaction: TransactionConsumerValue,
  logger: Logger,
) =>
  | {
      indexName: string
      key: string
      value: T
    }[]
  | null
