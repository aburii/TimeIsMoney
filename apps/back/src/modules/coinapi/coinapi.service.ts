import { Injectable } from '@nestjs/common';
import { CoinAPI } from '@timeismoney/coinapi';

@Injectable()
export class CoinApiService {
  readonly client: CoinAPI = new CoinAPI(process.env.API_KEY);

  constructor() {}
}
