import type {
  LedgerStream,
  RequestResponseMap,
  TransactionStream as _TransactionStream,
} from 'xrpl'
import type { LedgerRequestExpandedTransactionsOnly } from 'xrpl/dist/npm/models/methods/ledger'
type _LedgerResponse = RequestResponseMap<LedgerRequestExpandedTransactionsOnly>['result']

//Response of `ledger` command missing `close_time_iso` field
// https://github.com/XRPLF/xrpl.js/issues/2715
type LedgerResponse = _LedgerResponse & {
  ledger: {
    close_time_iso: string
    transactions: (_LedgerResponse['ledger']['transactions'][number] & { hash: string })[]
  }
}
// TransactionStream missing `close_time_iso` field
// https://github.com/XRPLF/xrpl.js/issues/2714
type TransactionStream = _TransactionStream & { close_time_iso: string }

export type { LedgerStream, TransactionStream, LedgerResponse }
