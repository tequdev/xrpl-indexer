import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'

@Injectable()
export class DataStoreService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async statsIndexes() {
    await this.elasticsearchService.indices.refresh({ index: '*' })
    return await this.elasticsearchService.cat.indices({
      v: true,
      s: ['index:asc', 'store.size:asc'],
    })
  }

  async add(indexName: string, key: string, value: any) {
    await this.elasticsearchService.index(
      {
        index: indexName,
        id: key,
        document: value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/vnd.elasticsearch+json',
        },
        compression: true,
      },
    )
  }

  public async deleteAllIndicesFromRange(ledger_index_from: number, ledger_index_to: number) {
    const result = await this.elasticsearchService.deleteByQuery(
      {
        index: '*',
        query: {
          range: {
            ledger_index: {
              gte: ledger_index_from,
              lte: ledger_index_to,
            },
          },
        },
      },
      {
        requestTimeout: 60 * 1000, // 60s
      },
    )
  }
}
