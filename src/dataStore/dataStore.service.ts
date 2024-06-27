import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'

@Injectable()
export class DataStoreService {
  constructor(private readonly elasticsearchService: ElasticsearchService) { }

  async statsIndexes() {
    return await this.elasticsearchService.cat.indices({
      v: true,
      s: ['store.size:asc', 'index:asc']
    })
  }

  async add(indexName: string, key: string, value: any) {
    await this.elasticsearchService.index(
      {
        index: indexName,
        id: key,
        document: value
      },
      {
        headers: { "Content-Type": "application/json", "Accept": "application/vnd.elasticsearch+json" },
        compression: true
      }
    )
  }

  private async deleteFromRange(indexName: string, ledger_index_from: number, ledger_index_to: number) {
    await this.elasticsearchService.deleteByQuery(
      {
        index: indexName,
        query: {
          range: {
            ledger_index: {
              lte: ledger_index_from,
              gte: ledger_index_to
            }
          }
        }
      }
    )
  }
  async deleteTransactions(ledger_index_from: number, ledger_index_to: number) {
    await this.deleteFromRange('transaction', ledger_index_from, ledger_index_to)
  }
  async deleteLedgers(ledger_index_from: number, ledger_index_to: number) {
    await this.deleteFromRange('ledger', ledger_index_from, ledger_index_to)
  }
}
