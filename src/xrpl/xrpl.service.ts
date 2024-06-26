import { XrplClient } from 'xrpl-client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import configuration from 'src/config/configuration';

@Injectable()
export class XRPLService implements OnModuleInit, OnModuleDestroy {
  client: XrplClient
  constructor(private configService: ConfigService<typeof configuration>) {
    this.client = new XrplClient('wss://xrpl.ws')
  }
  async onModuleInit() {
    const definitions = await this.client.definitions()
    const amountFields = [...definitions['FIELDS'].filter((f) => f[1].type === 'Amount').map((f) => f[0]), 'DeliverMax', 'DeliveredAmount', 'delivered_amount']
    this.configService.set('amount_type_fields', amountFields)

    const native_currency_code = definitions['native_currency_code']
    this.configService.set('native_currency_code', native_currency_code)
  }

  onModuleDestroy() {
    this.client.close()
  }
}