import { Injectable, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch'
import configuration, { Configuration } from 'src/config/configuration'
import { DataStoreService } from './dataStore.service'

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<Configuration>) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DataStoreService],
  exports: [DataStoreService],
})
export class DataStoreModule {}
