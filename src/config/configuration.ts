import { readFileSync } from 'node:fs'
import * as yaml from 'js-yaml'
// use require instead on import
const appRoot = require('app-root-path')

const YAML_CONFIG_FILENAME = 'indexer.config.yaml'

type Config = {
  KAFKA_BROKER_ENDPOINTS: string[]
  ELASTICSEARCH_NODE: string[]
  TRANSACTION_HANDLER_PATH: string
  LEDGER_HANDLER_PATH: string
}

type GlobalValues = {
  amount_type_fields: string[]
  native_currency_code: string
}

export type Configuration = Config & GlobalValues

export default () => {
  return yaml.load(readFileSync(appRoot.resolve(YAML_CONFIG_FILENAME), 'utf8')) as Configuration
}
