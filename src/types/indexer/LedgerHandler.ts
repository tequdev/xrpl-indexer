import { Logger } from '@nestjs/common'
import { LedgerConsumerValue } from 'src/types/consumers/ledger'

export type LedgerHandler = (
  ledger_hash: string,
  ledger: LedgerConsumerValue,
  logger: Logger,
) => {
  indexName: string
  key: string
  value: unknown
} | null
