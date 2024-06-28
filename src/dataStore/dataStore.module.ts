import { Injectable, Module } from '@nestjs/common'
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch'
import { DataStoreService } from './dataStore.service'

@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
  ],
  providers: [DataStoreService],
  exports: [DataStoreService],
})
export class DataStoreModule {}
