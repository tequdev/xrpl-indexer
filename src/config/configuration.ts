const configuration = () => ({
  amount_type_fields: [] as string[],
  native_currency_code: 'XRP' as string,
  KAFKA_BROKER_ENDPOINTS: ['localhost:9093'] as string[],
  ELASTICSEARCH_NODE: ['http://localhost:9200'] as string[],
})

export default configuration

export type Configuration = ReturnType<typeof configuration>
