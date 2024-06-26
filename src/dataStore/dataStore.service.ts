import { Injectable } from '@nestjs/common'
import { ElasticsearchService } from '@nestjs/elasticsearch'

@Injectable()
export class DataStoreService {
  constructor(private readonly elasticsearchService: ElasticsearchService) { }

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
}
